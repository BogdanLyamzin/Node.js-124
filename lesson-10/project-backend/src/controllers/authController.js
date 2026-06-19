import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Handlebars from 'handlebars';
import path from "node:path";
import {readFile} from "node:fs/promises";

import User from '../db/models/User.js';
import Session from '../db/models/Session.js';

import { createSession, setSessionCookies } from '../services/auth.js';
import sendEmail from "../services/sendEmail.js";

const verifyEmailTemplatePath = path.resolve("src", "templates", "verify-email.html");

const {JWT_SECRET} = process.env;
export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(400, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  const verifyTemplateSource = await readFile(verifyEmailTemplatePath, "utf-8");
  const template = Handlebars.compile(verifyTemplateSource);

  const token = jwt.sign({email}, JWT_SECRET, {expiresIn: "24h"});

  const html = template({
    username: newUser.username,
    link: `http://localhost:5173/register?token=${token}`
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html,
  };

  await sendEmail(verifyEmail);

  res.status(201).json(newUser);
};

export const verifyUser = async(req, res)=> {
  const {token} = req.body;
  try {
    const {email} = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({email});
    if(!user) {
      throw createHttpError(401, "User not found");
    }
    await User.findOneAndUpdate({email}, {verify: true});
    res.json({
      message: "Email successfully verify"
    })
  }
  catch(error) {
    throw createHttpError(401, error.message);
  }

}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }
  if (!user.verify) {
    throw createHttpError(401, 'Email not verified');
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteOne({userId: user._id});

  const session = await createSession(user._id);
  setSessionCookies(res, session);

  res.json(user);
};

export const refreshUserSession = async(req, res)=> {
  const {refreshToken, sessionId} = req.cookies;
  const session = await Session.findOne({_id: sessionId, refreshToken});
  if(!session) {
    throw createHttpError(401, "Session not found");
  }

  if(session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, "Session token expired");
  }

  await Session.deleteOne({userId: session.userId});

  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.json({
    message: "Session refreshed"
  })
}

export const logoutUser = async(req, res)=> {
  const {sessionId} = req.cookies;
  if(sessionId) {
    await Session.deleteOne({_id: sessionId});
  }

  res.clearCookie("sessionId");
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(204).send();
}
