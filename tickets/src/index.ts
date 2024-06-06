import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import { NotFoundError, errorHandler } from '@joshuaombasa/common10';
import { indexTicketRouter } from './routes';
import { showTicketRouter } from './routes/show';
import { newTicketRouter } from './routes/new';
import { updateTicketRouter } from './routes/update';



const PORT = 4001;

const app = express();

app.set('trust-proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(express.json());

app.use(indexTicketRouter)
app.use(showTicketRouter)
app.use(newTicketRouter)
app.use(updateTicketRouter)



app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb://127.0.0.1:27017/tickets-10?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1'
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
