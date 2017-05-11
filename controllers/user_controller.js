var sqlite3 = require('sqlite3').verbose();
var path = require('path');
var settings = require('../settings');
var dbPath = path.resolve(settings.ROOT, 'mydb.db');
var db = new sqlite3.Database(dbPath);
var models  = require('../models');

class UserController {

  static getUsers(req, res, next) {
    models.User.findAll().then(function(users) {
      res.json({ contacts: users });
    });
  }

  static getUser(req, res, next) {
    models.User.findById( req.params.contactId ).then(function(user) {
      if (user) {
        res.json({ contact: user });
      } else {
        res.status(404);
        res.json({ contact: {} });
      }
    });

  }

  static searchUser(req, res, next) {
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
          ), 500 );
        }
    });
  }

  static addUser(req, res) {
    const name = req.body.name;
    const contactNumber = req.body.contact_number;

    models.User.create({
      name: name,
      contact_number: contactNumber
    }).then(function(result) {
      if (result) {
        res.json({
          success: true,
          message: 'Added contact successfully',
          newId: result.cn_id
        });
      } else {
        res.status(500);
        res.send(err);
      }
    });
  }

  static editUser(req, res) {
    const id = req.params.contactId;
    const name = req.body.name;
    const contactNumber = req.body.contact_number;

    models.User.update(
      { name: name },
      { where: { cn_id: id } }
    ).then(function(updated) {
      if ( updated[0] === 1 ) {
        res.json({
          success: updated[0],
          message: 'Updated contact successfully'
        });
      } else {
        res.json({
          success: updated[0],
          message: 'Updated contact unsuccessfully'
        });
      }
    });
  }

  static deleteUser(req, res) {
    const id = req.params.contactId;

    models.User.destroy({
      where: {
        cn_id: id
      }
    }).then(function(deleted){ // rowDeleted will return number of rows deleted
      if(deleted === 1){
        res.json({
          success: deleted,
          message: 'Deleted contact successfully'
        });
      } else {
        res.json({
          success: deleted,
          message: 'Deleted contact unsuccessfully'
        });
      }
    });
  }
}

module.exports = UserController;
