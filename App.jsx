
import { createStore, applyMiddleware } from 'redux';
import mySaga from './redux/sagas';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import reducers from "./redux/reducers/index";
import { useDispatch, useSelector } from 'react-redux';
import Index from './Index';
import * as Notifications from 'expo-notifications';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mySaga)




export default function App() {

    return (
		<Provider store={store}>
			<Index/>
		</Provider>
    );
}
