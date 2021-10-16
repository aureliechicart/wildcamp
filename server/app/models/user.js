const db = require('../database');

/**
 * An entity representing a user
 * @typedef User
 * @property {number} id
 * @property {string} email
 * @property {string} password
 * @property {string} username
 */

/**
 * A model representing a user
 * @class
 */
class User {
  /**
     * The User constructor
     * @param {Object} data - a litteral object with properties that will be copied into the instance
     */
  constructor(data = {}) {
    for (const prop in data) {
      this[prop] = data[prop];
    };
  }

  /**
     * Returns all users in the database
     * 
     * @static
     * @async
     * @function findAll
     * @returns {Array<User>} - An array of User instances.
     */
  static async findAll() {
    try {
      const { rows } = await db.query('SELECT * FROM "user";');
      if (rows) {
        return rows.map(row => new User(row));
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err.detail);
    }
  }

  /**
      * Returns a specific user.
      * @async
      * @static
      * @function findOne
      * @param {number} id - A user ID.
      * @returns {<User>} - Instance of the User class.
      */
  static async findOne(id) {
    try {
      const { rows } = await db.query('SELECT * FROM "user" WHERE id = $1;', [id]);

      if (rows[0]) {
        return new User(rows[0]);
      } else {
        return null;
      };
    } catch (err) {
      throw new Error(err.detail);
    }
  }

    /**
      * Returns a specific user.
      * @async
      * @static
      * @function findOneByEmail
      * @param {string} email - A user email.
      * @returns {<User>} - Instance of the User class.
      */
     static async findOneByEmail(email) {
      try {
        const { rows } = await db.query('SELECT * FROM "user" WHERE email = $1;', [email]);
  
        if (rows[0]) {
          return new User(rows[0]);
        } else {
          return null;
        };
      } catch (err) {
        throw new Error(err.detail);
      }
    }

  /**
      * Creates a new user or updates the database if the record already exists
      * 
      * @async
      * @function save
      * @returns {<User>} - Instance of the User class.
      */
  async save() {
    if (this.id) {
      try {
        const { rows } = await db.query(`UPDATE "user"
        SET email=$1, password=$2, username=$3
        WHERE id=$4 RETURNING id;`, [
          this.email,
          this.password,
          this.username,
          this.id
        ]);

        this.id = rows[0].id;
        return this.id;

      } catch (err) {
        throw new Error(err.detail);
      }

    } else {
      try {
        const { rows } = await db.query(`INSERT INTO "user"
        (email, password, username)
        VALUES ($1, $2, $3)
        RETURNING id;`, [
          this.email,
          this.password,
          this.username
        ]);

        this.id = rows[0].id;
        return this.id;

      } catch (err) {
        throw new Error(err.detail);
      }
    }
  }

  /**
      * Deletes a user
      * 
      * @async
      * @function delete
      * @returns {<User>} - Instance of the User class.
      */
  async delete() {
    try {
      const { rows } = await db.query(`DELETE FROM "user"
      WHERE id = $1 RETURNING id;`, [this.id]);

      this.id = rows[0].id;
      return this.id;

    } catch (err) {
      throw new Error(err.detail);
    }


  };
};

module.exports = User;