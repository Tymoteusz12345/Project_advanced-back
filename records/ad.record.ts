import {AdEntity, NewAdEntity} from "../types";
import {ValidationError} from "../uttils/errors";
import {pool} from "../uttils/db";
import {FieldPacket} from "mysql2";

type AdRecordResults = [AdEntity[], FieldPacket[]];

export class adRecord implements AdEntity{
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;

    constructor(obj: NewAdEntity) {
        if(!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta ani przekraczać 100 znaków.')
        }
        if(obj.description.length > 1024) {
            throw new ValidationError('Nazwa ogłoszenia nie może przekraczać 1024 znaków.')
        }
        if(obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 i większa niż 9999999.')
        }
        //@TODO Check if URL is valid
        if(!obj.url || obj.url.length > 100){
            throw new ValidationError('Link ogłoszenia nie może być pusty, ani przekraczać 100 znaków.')
        }
        if( typeof obj.lat !== 'number' || typeof obj.lon !== 'number'){
            throw new ValidationError('Nie można zlokalizować głoszenia.')
        }
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lon = obj.lon;
        this.lat = obj.lat;
    }

    static async getOne(id: string): Promise<adRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ad` WHERE `id` = :id", {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new adRecord(results[0]);
    }

    static async listAll(): Promise<adRecord[] | null>{
        const [result] = await pool.execute("SELECT * FROM `ad`") as AdRecordResults;
        return result.map(result => new adRecord(result))
    }
}
