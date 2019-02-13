import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressValidation from 'express-validation';
import 'babel-polyfill';
import router from './routes/routes';

dotenv.config();
const app = express();
app.use(morgan('dev'));

const port = process.env.PORT || 3000;

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', (req, res, next) => {
  res.status(404).json({
    status: res.statusCode,
    message: 'Welcome to Politico!',
  });

app.use('/api/v1', router);

app.use((req, res, next) => {
  res.status(404).json({
    status: res.statusCode,
    message: 'Wrong route, not found',
  });
  next();
});

app.use((error, req, res, next) => {
  if (error instanceof expressValidation.ValidationError) {
    res.status(error.status).json({
      status: res.statusCode,
      message: error.message,
      details: error.errors,
    });
    console.log(error);
  } else {
    res.status(error.status || 500).json({
      status: res.statusCode,
      message: error,
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
