const famousname = process.argv;

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'development',
    password : 'development',
    database : 'test_db'
  }
});

const fname = famousname[2];
const lname = famousname[3];
const bdate = famousname[4];
const bdateObj = new Date(bdate);

knex('famous_people')
    .insert({'first_name': fname, 'last_name': lname, 'birthdate': bdateObj})
    .returning('*')
    .asCallback((err, result) => {
      if (err){
        console.log(err);
      } else {
        console.log(result);
      }
  }).then(function() {
    return knex.destroy();
  })