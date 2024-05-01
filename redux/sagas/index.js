import {takeLatest, call, put, takeEvery} from 'redux-saga/effects'
import * as SecureStore from 'expo-secure-store';
import { loginStart } from '../../api/authAPI';
import * as userAction from '../actions/user'
import { getExpoPushTokenAsync } from 'expo-notifications';
import { getNotificationToken, registerForPushNotificationsAsync } from '../../getPushToken';
import { updatePushToken } from '../../api/userAPI';
import { phoneNumberRequest } from '../actions/phoneNumber';


const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}

const updateUser = (userUpdated) => {
    const user = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem("user", JSON.stringify({accessToken: user.accessToken, ...userUpdated}));
}

function* loginRequestSaga(action){
    try {    
       
        const user = yield call(loginStart, action.payload)
        yield put(userAction.loginSuccess(user.data))

    
        if(user.data.type === "user"){
            
            yield put(phoneNumberRequest(user.data.user.phoneNumber))
        }
        // const pushToken = yield call(getNotificationToken)
        // yield call(updatePushToken, {userId: user.data.user._id, pushToken})
        
    } catch (err){
        yield put(userAction.loginFailure(err))
    }
}
     


function* mySaga(){

    yield takeLatest("LOGIN_REQUEST",loginRequestSaga)

}

export default mySaga