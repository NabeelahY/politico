import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import router from './routes/routes';

dotenv.config();
const app = express();
app.use(morgan('dev'));

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', router);

app.use((re, res, next) => {
  const error = new Error('Not found');
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});
app.listen(port, () => {
  console.log('Listening on port %d in %s mode', this.address().port, app.settings.env);
});

export default app;
