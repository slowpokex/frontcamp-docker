import Facade from '../../../common/facade';
import Repository from './repository';

const POPULATE_FIELD = 'userId';

class BlogsFacade extends Facade {
  /**
   * Find blog instances
   * @param {*} args
   * @returns {Promise}
   */
  find(...args) {
    return this.Schema.find(...args)
      .populate(POPULATE_FIELD)
      .exec();
  }

  /**
   * Find one blog instance
   * @param {*} args
   * @returns {Promise}
   */
  findOne(...args) {
    return this.Schema.findOne(...args)
      .populate(POPULATE_FIELD)
      .exec();
  }

  /**
   * Find blog by unique ID
   * @param {*} args
   * @returns {Promise}
   */
  findById(...args) {
    return this.Schema.findById(...args)
      .populate(POPULATE_FIELD)
      .exec();
  }
}

export default new BlogsFacade(Repository);
