export const loginRequest = (userCre) => ({
    type: "LOGIN_REQUEST",
    payload: userCre,
});
export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});
export const loginFailure = (err) => ({
    type: "LOGIN_FAILURE",
    payload:err,
});


export const updateAddress = (user) => ({
    type: "UPDATE_ADDRESS",
    payload:user,
});

export const updateUserPoint = (user) => ({
    type: "UPDATE_USER_POINT",
    payload:user,
});

export const updatePaymentMethod = (user) => ({
    type: "UPDATE_PAYMENT_METHOD",
    payload:user,
});
