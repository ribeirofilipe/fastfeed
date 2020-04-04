import { combineReducers } from 'redux';

// Import reducers
import auth from './auth/reducer';
import user from './user/reducer';
import deliveryman from './deliveryman/reducer';

export default combineReducers({
	auth,
  user,
  deliveryman
});
