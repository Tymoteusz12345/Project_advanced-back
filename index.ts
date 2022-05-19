import express, {json} from "express";
import cors from "cors";
import 'express-async-errors';
import {handleError} from "./uttils/errors";
import {adRecord} from "./records/ad.record";
import rateLimit from "express-rate-limit";
const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(json())
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))
app.use(handleError)
app.get('/test', async (req, res) => {
    console.log(await adRecord.listChoosen('Karol'))
})
app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})

