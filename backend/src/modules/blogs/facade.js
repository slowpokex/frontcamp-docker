import Facade from "../../common/facade";
import Repository from "./repository";

class BlogsFacade extends Facade {
  static POPULATE_FIELD = "userId";

  /**
   * Find blog instances
   * @param {*} args
   * @returns {Promise}
   */
  find(...args) {
    return this.Schema.find(...args)
      .populate(BlogsFacade.POPULATE_FIELD)
      .exec();
  }

  /**
   * Find one blog instance
   * @param {*} args
   * @returns {Promise}
   */
  findOne(...args) {
    return this.Schema.findOne(...args)
      .populate(BlogsFacade.POPULATE_FIELD)
      .exec();
  }

  /**
   * Find blog by unique ID
   * @param {*} args
   * @returns {Promise}
   */
  findById(...args) {
    return this.Schema.findById(...args)
      .populate(BlogsFacade.POPULATE_FIELD)
      .exec();
  }
}

export default new BlogsFacade(Repository);
