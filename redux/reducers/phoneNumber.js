import { INIT_STATE } from "../initialState/initialState";

const phoneNumberReducer = (state = INIT_STATE.phoneNumber, action) => {
    
    switch (action.type) {
       
        case "PHONE_NUMBER_REQUEST":
          
            return action.payload;

        default:
            return state;
    }
};

export default phoneNumberReducer;
