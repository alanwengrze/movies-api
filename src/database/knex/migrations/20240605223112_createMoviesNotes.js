//create table
exports.up = knex => knex.schema.createTable("movies_notes", table => {
  table.increments("id").primary();
  table.text("title").notNullable();
  table.text("description").notNullable();
  table.integer("rating")
  table.integer("user_id").references("id").inTable("users");
  table.timestamp("created_at").default(knex.fn.now()).notNullable();
  table.timestamp("updated_at").default(knex.fn.now()).notNullable();
});

//delete table
exports.down = knex => knex.schema.dropTable("movies_notes");