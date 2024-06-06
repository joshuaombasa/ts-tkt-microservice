import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@joshuaombasateeketi/common9';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentuserRouter } from './routes/current-user';

const PORT = 4000;
const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentuserRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb://127.0.0.1:27017/tiketi9-auth?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1'
    );
    console.log(`connected to mongodb`);
  } catch (error) {
    console.log(error);
  }

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
};

start();
