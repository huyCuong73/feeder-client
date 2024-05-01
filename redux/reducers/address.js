import { INIT_STATE } from "../initialState/initialState";

const addressReducer = (state = INIT_STATE.address, action) => {

    switch (action.type) {
        case "ADDRESS_REQUEST":

            return action.payload;

        default:
            return state;
    }
};

export default addressReducer;
