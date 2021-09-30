const db = require('../database');

/**
 * An entity representing a campground
 * @typedef Campground
 * @property {number} id
 * @property {string} title
 * @property {string} image
 * @property {string} description
 * @property {string} country
 * @property {number} userId
 */

/**
 * A model representing a campground
 * @class
 */
class Campground {
  /**
     * The Campground constructor
     * @param {Object} data - a litteral object with properties that will be copied into the instance
     */
  constructor(data = {}) {
    for (const prop in data) {
      this[prop] = data[prop];
    };
  }

  /**
     * Returns all campgrounds in the database
     * 
     * @static
     * @async
     * @function findAll
     * @returns {Array<Campground>} - An array of Campground instances.
     */
  static async findAll() {
    try {
      const { rows } = await db.query('SELECT * FROM campground;');
      if (rows) {
        return rows.map(row => new Campground(row));
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err.detail);
    }
  }

  /**
      * Returns a specific campground.
      * @async
      * @static
      * @function findOne
      * @param {number} id - A campground ID.
      * @returns {<Campground>} - Instance of the Campground class.
      */
  static async findOne(id) {
    try {
      const { rows } = await db.query('SELECT * FROM campground WHERE id = $1;', [id]);

      if (rows[0]) {
        return new Campground(rows[0]);
      } else {
        return null;
      };
    } catch (err) {
      throw new Error(err.detail);
    }
  }

  /**
      * Creates a new campground or updates the database if the record already exists
      * 
      * @async
      * @function save
      * @returns {<Campground>} - Instance of the Campground class.
      */
  async save() {
    if (this.id) {
      try {
        const { rows } = await db.query(`UPDATE campground
        SET title=$1, image=$2, description=$3, country=$4, user_id=$5
        WHERE id=$6 RETURNING id;`, [
          this.title,
          this.image,
          this.description,
          this.country,
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
        const { rows } = await db.query(`INSERT INTO campground
        (title, image, description, country, user_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;`, [
          this.title,
          this.image,
          this.description,
          this.country,
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
      * Deletes a campground
      * 
      * @async
      * @function delete
      * @returns {<Campground>} - Instance of the Campground class.
      */
  async delete() {
    try {
      const { rows } = await db.query(`DELETE FROM campground
      WHERE id = $1 RETURNING id;`, [this.id]);

      this.id = rows[0].id;
      return this.id;

    } catch (err) {
      throw new Error(err.detail);
    }


  };
};

module.exports = Campground;