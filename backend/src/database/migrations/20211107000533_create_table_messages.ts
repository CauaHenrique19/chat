import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('messages', (table: Knex.TableBuilder) => {
        table.string('id').primary().notNullable()
        table.string('from').references('id').inTable('users').notNullable()
        table.string('to').references('id').inTable('users').notNullable()
        table.text('content').notNullable()
        table.timestamp('created_at').notNullable()
        table.string('status').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('messages')
}