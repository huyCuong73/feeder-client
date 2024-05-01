import { INIT_STATE } from "../initialState/initialState";

const authReducer = (state = INIT_STATE.user, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            console.log("logging...");
            return {
                ...state,
                isFetching: true,
            };
        case "LOGIN_SUCCESS":
            console.log("paylaod", action.payload);
            return {
                ...state,
               
                accessToken: action.payload.accessToken,
                type: action.payload.type,
                user: {
                    ...action.payload.user
                },
                isFetching: false,
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                user: null,
                isFetching: false,
                error: action.payload,
            };

        case "UPDATE_ADDRESS":
            return {
                ...state,
                user: action.payload
            }

        case "UPDATE_PAYMENT_METHOD":
            return {
                ...state,
                user: action.payload
            }
    
        default:
            return { ...state };
    }
};

export default authReducer;
