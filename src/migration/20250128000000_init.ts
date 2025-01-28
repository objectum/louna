import { Knex } from 'knex'

export const up = async (knex: Knex): Promise<void> => {
    await knex.schema.createTable('users', table => {
        table.bigIncrements('id').primary()
        table.string('login', 255).unique().notNullable()
        table.string('password', 255).notNullable()
        table.decimal('balance', 14, 2)
    })
    await knex.schema.alterTable('users', t => {
        t.check('balance >= 0', [], 'check_users_balance')
    })
    await knex.schema.createTable('products', table => {
        table.bigIncrements('id').primary()
        table.text('name').notNullable()
        table.float('price').notNullable()
    })
    await knex.schema.createTable('purchases', table => {
        table.bigIncrements('id').primary()
        table.date('date').notNullable()
        table.bigint('userId').notNullable()
        table.foreign('userId').references('users.id')
        table.bigint('productId').notNullable()
        table.foreign('productId').references('products.id')
        table.float('price').notNullable()
    })
    await knex('products').insert({ name: 'Sticker 1', price: 11 })
    await knex('products').insert({ name: 'Sticker 2', price: 12 })
    await knex('products').insert({ name: 'Sticker 3', price: 13 })
}

export const down = async (knex: Knex): Promise<void> => {
    await knex.schema.dropTableIfExists('purchases')
    await knex.schema.dropTableIfExists('products')
    await knex.schema.dropTableIfExists('users')
}
