const db = require('../database');

/**
 * An entity representing a comment
 * @typedef Comment
 * @property {number} id
 * @property {string} text
 * @property {number} campgroundId
 * @property {number} userId
 */

/**
 * A model representing a comment
 * @class
 */
class Comment {
  /**
     * The Comment constructor
     * @param {Object} data - a litteral object with properties that will be copied into the instance
     */
  constructor(data = {}) {
    for (const prop in data) {
      this[prop] = data[prop];
    };
  }

  /**
     * Returns all comments in the database
     * 
     * @static
     * @async
     * @function findAll
     * @returns {Array<Comment>} - An array of Comment instances.
     */
  static async findAll() {
    try {
      const { rows } = await db.query('SELECT * FROM comment;');
      if (rows) {
        return rows.map(row => new Comment(row));
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err.detail);
    }
  }

  /**
      * Returns a specific comment.
      * @async
      * @static
      * @function findOne
      * @param {Number} id - A comment ID.
      * @returns {<Comment>} - Instance of the Comment class.
      */
  static async findOne(id) {
    try {
      const { rows } = await db.query('SELECT * FROM comment WHERE id = $1;', [id]);

      if (rows[0]) {
        return new Comment(rows[0]);
      } else {
        return null;
      };
    } catch (err) {
      throw new Error(err.detail);
    }
  }

  /**
    * Returns all the comments, and the corresponding username, attached to a specific campground.
    * @async
    * @static
    * @function findOne
    * @param {Number} cid - A campground ID.
    * @returns {Array<Comment>} - Array of instances of the Comment class.
    */
  static async findByCampground(cid) {
    try {
      const { rows } = await db.query(`SELECT comment.*, "user".username author FROM comment
      JOIN "user" ON "user".id = comment.user_id
      WHERE campground_id = $1;`, [cid]);

      if (rows) {
        return rows.map(row => new Comment(row));
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err.detail);
    }
  }

  /**
      * Creates a new comment or updates the database if the record already exists
      * 
      * @async
      * @function save
      * @returns {<Comment>} - Instance of the Comment class.
      */
  async save() {
    if (this.id) {
      try {
        const { rows } = await db.query(`UPDATE comment
        SET text=$1, campground_id=$2, user_id=$3
        WHERE id=$4 RETURNING id;`, [
          this.text,
          this.campground_id,
          this.user_id,
          this.id
        ]);

        this.id = rows[0].id;
        return this.id;

      } catch (err) {
        throw new Error(err.detail);
      }

    } else {
      try {
        const { rows } = await db.query(`INSERT INTO comment
        (text, campground_id, user_id)
        VALUES ($1, $2, $3)
        RETURNING id;`, [
          this.text,
          this.campground_id,
          this.user_id
        ]);

        this.id = rows[0].id;
        return this.id;

      } catch (err) {
        throw new Error(err.detail);
      }
    }
  }

  /**
      * Deletes a comment
      * 
      * @async
      * @function delete
      * @returns {<Comment>} - Instance of the Comment class.
      */
  async delete() {
    try {
      const { rows } = await db.query(`DELETE FROM comment
      WHERE id = $1 RETURNING id;`, [this.id]);

      this.id = rows[0].id;
      return this.id;

    } catch (err) {
      throw new Error(err.detail);
    }


  };
};

module.exports = Comment;