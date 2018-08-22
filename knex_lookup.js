const famousname = process.argv[2];

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'development',
    password : 'development',
    database : 'test_db'
  }
});


function printName (records) {
  var output = ""
  records.forEach(function(r) {
    var date  = `'${r.birthdate.getFullYear()}-${r.birthdate.getMonth()}-${r.birthdate.getDate()}'`;
    output += (`- ${r.id}: ${r.first_name} ${r.last_name}, born: ${date}\n`);
  });
  return output;
}

function getByFirstName (name, cb){
  knex('famous_people').select('*').where('first_name', name).asCallback((err, result) => {
  if (err){
    console.log(err);
  } else {
    console.log(printName(result));
  }
}).then(function() {
  return knex.destroy();
});
}

getByFirstName(famousname, printName);