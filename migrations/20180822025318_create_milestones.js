
exports.up = function(knex, Promise) {
  return knex.schema.createTable('milestones', function(table) {
    table.increments();
    table.string('description');
    table.date('date_achieved');
    table.integer('famous_person_id')
    table.foreign('famous_person_id').references('famous_people.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestones');
};
