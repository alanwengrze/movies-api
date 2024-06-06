//create table
exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id").primary();
  table.text("name").notNullable();
  table.text("email").notNullable();
  table.text("password").notNullable();
  table.text("avatar").default(null);
  table.timestamp("created_at").default(knex.fn.now()).notNullable();
  table.timestamp("updated_at").default(knex.fn.now()).notNullable();
});

//delete table
exports.down = knex => knex.schema.dropTable("users");