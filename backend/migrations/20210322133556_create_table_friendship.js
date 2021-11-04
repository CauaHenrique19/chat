
exports.up = function(knex) {
  return knex.schema.createTable('friendship', table => {
    table.increments('id').primary().notNull()
    table.integer('requester_id').notNull().references('id').inTable('users').notNull()
    table.integer('receiver_id').notNull().references('id').inTable('users').notNull()
    table.string('status')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('friendship')
};
