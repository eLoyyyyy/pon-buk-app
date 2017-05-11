'use strict';

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    cn_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: function() {
        return crypto.randomBytes(20).toString('hex');
      }
    },
    name: DataTypes.STRING,
    contact_number: DataTypes.STRING
  }, {
    tableName: 'contacts',
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
