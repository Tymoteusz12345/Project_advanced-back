import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'project_advanced',
    namedPlaceholders: true,
    decimalNumbers: true,
})
