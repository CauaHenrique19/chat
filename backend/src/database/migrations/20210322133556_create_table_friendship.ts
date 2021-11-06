import { Knex } from "knex"

export async function up(knex: Knex) : Promise<void> {
  await knex.schema.createTable('friendship', (table: Knex.TableBuilder) => {
    table.string('id').primary().notNullable()
    table.string('requester_id').references('id').inTable('users').notNullable()
    table.string('receiver_id').references('id').inTable('users').notNullable()
    table.string('status')
  })
};

export async function down(knex) : Promise<void> {
  await knex.schema.dropTable('friendship')
};