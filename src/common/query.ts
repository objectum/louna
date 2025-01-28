import * as pg from 'pg'

let pool

const pgTypes = pg.types

if (pgTypes) {
    // numeric
    pgTypes.setTypeParser(1700, function (val) {
        return val === null ? null : parseFloat(val)
    })
    // float4
    pgTypes.setTypeParser(700, function (val) {
        return val === null ? null : parseFloat(val)
    })
    // float8
    pgTypes.setTypeParser(701, function (val) {
        return val === null ? null : parseFloat(val)
    })
    // int8
    pgTypes.setTypeParser(20, function (val) {
        return val === null ? null : parseInt(val)
    })
    // int2
    pgTypes.setTypeParser(21, function (val) {
        return val === null ? null : parseInt(val)
    })
    // int4
    pgTypes.setTypeParser(23, function (val) {
        return val === null ? null : parseInt(val)
    })
}

function init() {
    if (!pool) {
        pool = new pg.Pool({
            host: process.env.postgres_hostname,
            user: process.env.postgres_username,
            password: process.env.postgres_password,
            database: process.env.postgres_database,
            port: process.env.postgres_port,
            idleTimeoutMillis: 30000,
        })
    }
}

export async function query(sql, params) {
    init()

    const result = await pool.query(sql, params)

    return result.rows
}

export async function getClient() {
    init()

    return pool.connect()
}
