import {adRecord} from "../records/ad.record";
import {pool} from "../uttils/db";
import {AdEntity} from "../types";

const defaultObj = {
    id: '021912',
    name: 'sss',
    description: 'blah',
    url: 'http://localhost',
    price: 0,
    lat: 9,
    lon: 9
}

afterAll(async () => {
    await pool.end();
})

/*jest
    .spyOn(adRecord.prototype,'insert')
    .mockImplementation((async() => {
        return 'test'
    }))*/

test('AdRecord returns data from database for one entry', async () => {

    const ad = await adRecord.getOne('123');

    expect(ad).toBeDefined();
    expect(ad.id).toBe('123');
    expect(ad.name).toBe('testowy')

})

test('AdRecord returns null from database for unexisting entry.', async () => {
    const ad = await adRecord.getOne('---');

    expect(ad).toBeNull();
})

test('AdRecotd.findAll returns array of found entries.', async () => {
    const ad = await adRecord.listAll('');

    expect(ad).not.toEqual([]);
    expect(ad[0].id).toBeDefined()
})

test('AdRecotd.findAll returns array of found entries when searching for a.', async () => {
    const ad = await adRecord.listAll('a');

    expect(ad).not.toEqual([]);
    expect(ad[0].id).toBeDefined()
})


test('AdRecotd.findAll returns array of found entries when searching for someting does not exist.', async () => {
    const ad = await adRecord.listAll('-----');

    expect(ad).toEqual([]);
})

test('AdRecotd.findAll returns smaller ammount of data.', async () => {
    const ad = await adRecord.listAll('Karol');
    console.log(ad)
    expect((ad[0] as AdEntity ).id).toBeDefined();
    expect((ad[0] as AdEntity ).price).toBeUndefined();
    expect((ad[0] as AdEntity ).description).toBeUndefined();

})

test('adRecord.insert returns new UUID', async () => {
    const ad = new adRecord(defaultObj);

    await ad.insert();

    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');

    const foundAd = await adRecord.getOne(ad.id);
    console.log()
    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id)

})



