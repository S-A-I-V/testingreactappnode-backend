const mysql = require('mysql');

const db = mysql.createConnection({
  host: '192.168.27.185',
  user: 'saideep',
  password: 'Lenskart@123#',
  database: 'packing_db',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database.');
});

export default function handler(req, res) {
  const query = 'SELECT * FROM entries';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
}
