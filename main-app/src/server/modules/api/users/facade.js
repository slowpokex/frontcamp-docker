import Facade from '../../../common/facade';
import Repository from './repository';

class UserFacade extends Facade {}

export default new UserFacade(Repository);
