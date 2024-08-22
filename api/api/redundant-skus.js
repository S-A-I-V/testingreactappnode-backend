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
  const query = `
    SELECT skuId, stationId, COUNT(*) as scanCount, MAX(dateOfScan) as mostRecentDate, MAX(timestamp) as mostRecentTimestamp
    FROM entries
    GROUP BY skuId, stationId
    HAVING scanCount > 1;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching redundant SKUs:', err.stack);
      res.status(500).send('Error fetching redundant SKUs');
      return;
    }
    res.json(results);
  });
}
