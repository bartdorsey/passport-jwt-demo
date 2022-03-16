const { Model, DataTypes } = require("sequelize");
const db = require("../db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const SALT_ROUNDS = 5
 
class User extends Model {
  correctPassword(candidatePwd) {
    //we need to compare the plain version to an encrypted version of the password
    return bcrypt.compare(candidatePwd, this.password)
  }

  generateToken() {
    return jwt.sign(this.safeUser(), process.env.JWT)
  }

  safeUser() {
    return {
      id: this.id,
      username: this.username
    }
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  }
}, {
  sequelize: db
});


/**
 * hooks
 * @param {User} user
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)))

module.exports = User