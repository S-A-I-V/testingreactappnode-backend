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
  const { skuId, stationId } = req.query;
  const query = 'SELECT COUNT(*) AS count FROM entries WHERE skuId = ? AND stationId = ?';

  db.query(query, [skuId, stationId], (err, results) => {
    if (err) {
      console.error('Error checking for duplicates:', err.stack);
      res.status(500).send('Error checking for duplicates');
      return;
    }
    const isDuplicate = results[0].count > 0;
    res.json({ isDuplicate });
  });
}
