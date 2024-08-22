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
  if (req.method === 'POST') {
    const { skuId, dateOfScan, timestamp, stationId, nexsId } = req.body;
    const query = 'INSERT INTO entries (skuId, dateOfScan, timestamp, stationId, nexsId) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [skuId, dateOfScan, timestamp, stationId, nexsId], (err) => {
      if (err) {
        console.error('Error inserting data:', err.stack);
        res.status(500).send('Error inserting data');
        return;
      }
      res.status(200).send('Data inserted successfully');
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
