import express, { Request, Response, NextFunction } from 'express';

import { userRouter } from './users/users.js';

const port: number = 8000;
const app = express();

app.use((req, res, next) => {
  console.log('время ' + Date.now());
  next();
});

app.get('/hello', (req, res) => {
  // res.download('/test.pdf', 'fileName.pdf');
  throw new Error('ERROR!-------')
});

app.use('/users', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});