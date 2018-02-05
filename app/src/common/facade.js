import { Schema } from "mongoose";

export default class Facade {
  constructor(Schema) {
    this.Schema = Schema;
  }

  /**
   * Create new schema from body
   * @param {*} body - object
   * @returns {Promise}
   */
  create(body) {
    const schema = new this.Schema(body);
    return schema.save();
  }

  /**
   * Count schema instances
   * @param {*} args 
   */
  count(...args) {
    return this.Schema
      .find(...args)
      .count()
      .exec();
  }

  /**
   * Find instances
   * @param {*} args 
   * @returns {Promise}
   */
  find(...args) {
    return this.Schema
      .find(...args)
      .exec();
  }

  /**
   * Find one instance
   * @param {*} args 
   * @returns {Promise}
   */
  findOne(...args) {
    return this.Schema
      .findOne(...args)
      .exec();
  }

  /**
   * Find by unique ID
   * @param {*} args 
   * @returns {Promise}
   */
  findById(...args) {
    return this.Schema
      .findById(...args)
      .exec();
  }

  /**
   * Update instances
   * @param {*} args 
   * @returns {Promise}
   */
  update(...args) {
    return this.Schema
      .update(...args)
      .exec();
  }

  /**
   * Remove instances
   * @param {*} args 
   * @returns {Promise}
   */
  remove(...args) {
    return this.Schema
      .remove(...args)
      .exec();
  }
}
