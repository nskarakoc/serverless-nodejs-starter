import express from 'express';
import 'express-async-errors';
import { HttpStatusCode } from 'axios';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { sampleRouter } from './routers/sample-router';
import { errorHandlerMiddleware } from './middlewares/error-handler-middleware';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/sample-path', sampleRouter);

app.use((req, res) => {
  return res.status(HttpStatusCode.NotFound).json({
    message: 'Requested path not found',
  });
});

app.use(errorHandlerMiddleware);

export { app };
