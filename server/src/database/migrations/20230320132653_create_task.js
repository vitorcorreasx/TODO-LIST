exports.up = function(knex) {
  return knex.schema.createTable('tasks', (table) =>{
    table.increments('id');
    table.text('content').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
