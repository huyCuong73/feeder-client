import { combineReducers } from "redux";

import user from './user'
import address from './address'
import socket from './socket'
import phoneNumber from './phoneNumber'

export default combineReducers({
     user, address, socket, phoneNumber
})