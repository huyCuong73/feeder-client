import * as SecureStore from 'expo-secure-store';





export const INIT_STATE = {

    socket: null,

    user:{
        isLoading:false,
        accessToken: null,
        type: "",
        user: {},
        err:null
    },
    
    address: "",
    phoneNumber: "",

    
}