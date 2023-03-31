exports.up = function(knex) {
  return knex.schema.createTable('tasks', (table) =>{
    table.increments('id');
    table.text('content').notNullable()
    table.integer('user_id').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
