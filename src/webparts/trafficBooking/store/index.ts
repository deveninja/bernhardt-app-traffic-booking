import { createStore, applyMiddleware, Store, compose } from  'redux';
import thunk from 'redux-thunk';
import rootRedcuer from '../reducers';

const middleWares = [thunk];
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {

	//do not use loggerMiddleware in production
	const listStateStore: Store = createStore(rootRedcuer, composeEnhancers(
      applyMiddleware(...middleWares)
   ));
	
	return listStateStore;
}
