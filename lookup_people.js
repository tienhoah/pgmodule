const pg = require("pg");
const settings = require("./settings"); // settings.json
const famousname = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


function getFName (name, cb) {
    let query = "SELECT * FROM famous_people WHERE first_name = $1";

    client.query(query,[name], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      cb(result.rows);

      client.end();
    });
  }

function printName(records) {
  records.forEach(function(r) {
    var date  = `'${r.birthdate.getFullYear()}-${r.birthdate.getMonth()}-${r.birthdate.getDate()}'`;
    console.log(`- ${r.id}: ${r.first_name} ${r.last_name}, born: ${date}`);
  });
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  getFName(famousname, printName);
});