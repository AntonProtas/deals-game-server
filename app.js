import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import fileUpload from 'express-fileupload';

//routes
import router from './routes/index.js';

//env
import { MONGO_DB, PORT } from './env-dev.js';

//middlewares
import { errorsHandler } from './middlewares/errorsHandler.js';

const app = express();
const dbConnection = mongoose.connection;

mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

dbConnection.on('error', (err) => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('🚀 Connected to DB!'));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorsHandler);
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
