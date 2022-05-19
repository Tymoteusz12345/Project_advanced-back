import {adRecord} from "../records/ad.record";
import {pool} from "../uttils/db";
import {AdEntity} from "../types";

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
    const ad = await adRecord.listAll('');

    expect((ad[0] as AdEntity ).id).toBeDefined();
    expect((ad[0] as AdEntity ).price).toBeUndefined();
    expect((ad[0] as AdEntity ).description).toBeUndefined();

})

/*test('listAll() method returns value', async () => {
    expect( await adRecord.listAll()).toBeDefined();
})

test('listAll() method returns value', async () => {
    expect( await adRecord.listAll()).toBeDefined();
})

test('choosenList() returns a value', async () => {
    expect( await adRecord.listChoosen('testowy')).toBeDefined();
})

test('choosenList() method returns null', async () => {
    expect(await adRecord.listChoosen('---')).toBeNull();
})

test('inserted id exist', async () => {
    const newone = new adRecord({
        id: '1234567',
        name: 'debeściak',
        description: 'blah',
        url: 'http://localhost',
        price: 0,
        lat: 9,
        lon: 9
    })
    await newone.insert();

    expect(await adRecord.getOne('123456')).toBeDefined();
})

afterAll(() => {
    pool.end();
})*/



