import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import fileUplode from 'express-fileupload';
import { connectDatabase } from './config/db.js';
import studentRoute from './routes/route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUplode());
//app.use(express.static('uploads'));
app.use(cors());

//Connection
connectDatabase();

//Routes
app.use('/api/v1', studentRoute);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Server is running....' });
});

if (process.env.NODE_ENV != 'production') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running at port: ${PORT}`)
);
