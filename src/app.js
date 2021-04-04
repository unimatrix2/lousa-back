import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoConnect from './configs/db.config';
import apiRoutes from './routes/api.routes';
import handle404 from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: process.env.FRONT_END_URL, credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(mongoSanitize());

app.use('/api', apiRoutes);

app.use(handle404);

mongoConnect(process.env.MONGODB_URI);

// eslint-disable-next-line no-console
app.listen(process.env.PORT, () => console.log(`App running on PORT ${process.env.PORT}`));
