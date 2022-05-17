import express, {json} from "express";
import cors from "cors";
import 'express-async-errors';
import {handleError} from "./uttils/errors";
import {adRecord} from "./records/ad.record";

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(json())

app.use(handleError)
app.get('/test', async (req, res) => {
    console.log(await adRecord.getOne('123'))
})
app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})

