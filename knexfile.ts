import type { Knex } from 'knex'
import { config } from 'dotenv'

config({ path: '.env' })

const postgres = {
    host: process.env.postgres_hostname,
    port: Number(process.env.postgres_port),
    user: process.env.postgres_username,
    password: process.env.postgres_password,
    database: process.env.postgres_database,
}

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: 'postgresql',
        connection: postgres,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migration',
            directory: './src/migration',
            extension: 'ts',
        },
    },
    staging: {
        client: 'postgresql',
        connection: postgres,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migration',
            directory: './src/migration',
            extension: 'ts',
        },
    },
    production: {
        client: 'postgresql',
        connection: postgres,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migration',
            directory: './src/migration',
            extension: 'ts',
        },
    },
}

module.exports = knexConfig
