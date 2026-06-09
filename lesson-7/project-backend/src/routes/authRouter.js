import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

import { registerUser, loginUser } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post(
  '/register',
  celebrate(registerUserSchema, { abortEarly: false }),
  registerUser,
);

authRouter.post(
  '/login',
  celebrate(loginUserSchema, { abortEarly: false }),
  loginUser,
);

export default authRouter;
