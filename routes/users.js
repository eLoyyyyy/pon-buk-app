var router = require('express').Router();
var sqlite3 = require('sqlite3').verbose();
var settings = require('../settings');
var crypto = require('crypto');

var path = require('path');
var dbPath = path.resolve(settings.ROOT, 'mydb.db');

const sampleData = require('../src/sampleData.json');

var db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS 'contacts' (
      'cn_id' TEXT UNIQUE,
      'name' TEXT,
      'contact_number' TEXT,
      PRIMARY KEY('cn_id')
    );
  `);
});

/* GET users listing. */
router.get('/', (req, res, next) => {
  db.all('SELECT cn_id, name, contact_number FROM contacts', (err, rows) => {
    if (err) {
      res.send(err);
    }
    res.json({ contacts: rows });
  });
});

router.get('/search/:name', (req, res, next) => {
  db.all('SELECT * FROM contacts WHERE name like "%"||$sq||"%"', { $sq: req.params.name },
  (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      setTimeout(() =>
        res.status(200).json(
          rows.filter(contact =>
            req.params.name.toLowerCase() === contact.name.substr(0, req.params.name.length).toLowerCase()
          )
        ),
        500
      );
    }
  });
});

router.get('/search/', (req, res, next) => {
  setTimeout(() => {
    res.status(200).json([]);
  }, 500);
});

router.get('/:contactId', (req, res, next) => {
  db.get('SELECT cn_id, name, contact_number FROM contacts WHERE cn_id = $cn_id',
  { $cn_id: req.params.contactId },
  (err, row) => {
    if (err) {
      res.send(err);
    }
    if (row) {
      res.json({ contact: row });
    } else {
      res.status(404);
      res.json({ contact: {} });
    }

  });
});

router.post('/', (req, res) => {
  const id = crypto.randomBytes(20).toString('hex');
  const name = req.body.name;
  const contactNumber = req.body.contact_number;

  let stmt =
    db.prepare('INSERT OR REPLACE INTO contacts VALUES ( $id, $name, $contact_number )')
    .run({ $id: id, $name: name, $contact_number: contactNumber }, (err) => {
      if (err) {
        res.status(500);
        res.send(err);
      }

      res.json({
        success: stmt.lastID >= 0 && stmt.lastID === parseInt(stmt.lastID, 10),
        message: 'Added contact successfully',
        newId: id
      });

      res.end();
    });
});

router.put('/:contactId', (req, res) => {
  const id = req.params.contactId;
  const name = req.body.name;
  const contactNumber = req.body.contact_number;

  let stmt =
    db.prepare('UPDATE contacts SET name = $name, contact_number = $contact_number WHERE cn_id = $id')
    .run({ $id: id, $name: name, $contact_number: contactNumber }, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          success: stmt.changes,
          message: 'Updated contact successfully'
        });
      }

      res.end();
    });
});

router.delete('/:contactId', (req, res) => {
  const id = req.params.contactId;

  let stmt =
    db.prepare('DELETE FROM contacts WHERE cn_id = $id').run({ $id: id }, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          success: stmt.changes,
          message: 'Deleted contact successfully'
        });
      }

      res.end();
    });
});

module.exports = router;
