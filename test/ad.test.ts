import {adRecord} from "../records/ad.record";

test('AdRecord returns data from database for one entry', async () => {

    const ad = await adRecord.getOne('123');

    console.log(ad)

    expect(ad).toBeDefined();
    expect(ad.id).toBe('123');
    expect(ad.name).toBe('testowy')

})

test('AdRecord returns null from database for unexisting entry.', async () => {
    const ad = await adRecord.getOne('---');

    expect(ad).toBeNull();
})
