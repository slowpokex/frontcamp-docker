import Facade from '../../common/facade';
import Repository from './repository';

class RestaurantFacade extends Facade {}

export default new RestaurantFacade(Repository);
