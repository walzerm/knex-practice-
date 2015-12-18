//run knex migrate:make create_students in terminal
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(table) {
        table.increments(); //create id SERIAL PRIMARY KEY
        table.string('name');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('students');

};

//run knex migrate:latest in terminal
