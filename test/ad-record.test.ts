import {adRecord} from "../records/ad.record";

const defaultObj = {
    name: 'Test Name',
    description: 'blah',
    url: 'http://localhost',
    price: 0,
    lat: 9,
    lon: 9
}

test('Can build AdRecord', () => {
    const ad = new adRecord(defaultObj)

    expect(ad.name).toBe('Test Name');
    expect(ad.description).toBe('blah')
})

test('Validates invalid price', () => {
    const ad = new adRecord({
        ...defaultObj,
        price: -3,
    });

    expect(() => new adRecord({
        ...defaultObj,
        price: -3,
    })).toThrow('Cena nie może być mniejsza niż 0 i większa niż 9999999.')
})

// @TODO check all the validations
