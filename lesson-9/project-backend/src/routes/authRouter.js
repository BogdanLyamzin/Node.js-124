import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUserSchema,
  verifyUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

import {
  registerUser,
  verifyUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from '../controllers/authController.js';

const authRouter = Router();

authRouter.post(
  '/register',
  celebrate(registerUserSchema, { abortEarly: false }),
  registerUser,
);

authRouter.post("/verify", celebrate(verifyUserSchema), verifyUser);

authRouter.post(
  '/login',
  celebrate(loginUserSchema, { abortEarly: false }),
  loginUser,
);

authRouter.post('/refresh', refreshUserSession);

authRouter.post("/logout", logoutUser);

export default authRouter;
