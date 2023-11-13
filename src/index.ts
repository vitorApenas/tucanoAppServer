const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
import apiRouter from './routes';
import { resetDiario } from '../db/resetDiario';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);
app.use('/images', express.static('assets'));
app.use(express.urlencoded({ extended: true }));

app.listen(port, ()=>{
    console.log(`Listening at http://127.0.0.1:${port}`);

    cron.schedule('0 0 0 * * *', ()=>{
        resetDiario();
    });
});