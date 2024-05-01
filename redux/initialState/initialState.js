import * as SecureStore from 'expo-secure-store';





export const INIT_STATE = {
    courses:{
        isLoading:false,
        courses: [],
        error:false
    },
    searchItems:{
        isFetching: false,
        items:[]
    },
    socket: null,
    exercises:{
        isFetching: false,
        exercises:[],
    }, 
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