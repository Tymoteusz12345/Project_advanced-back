import {Router} from "express";
import {adRecord} from "../records/ad.record";

export const adRouter = Router();

adRouter
    .get('/search/:name?', async (req,res) => {
        const ads = await adRecord.listAll(req.params.name ?? '');

        res.json(ads)
})

    .get('/:id', async (req,res) => {
        const ad = await adRecord.getOne(req.params.id);

        res.json(ad)
    })

    .post('/', async (req,res) => {
        const ad = new adRecord(req.body);
        await ad.insert();
        res.json(ad);
    })
