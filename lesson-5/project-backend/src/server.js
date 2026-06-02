import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import 'dotenv/config';

import logger from './middlewares/logger.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHanlder from './middlewares/errorHandler.js';

import contactsRouter from './routes/contactsRouter.js';

import connectDatabase from './db/connectDatabase.js';

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());

app.use("/contacts", contactsRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHanlder);

await connectDatabase();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server running successfully ${port} port`));
