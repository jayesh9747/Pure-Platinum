import apiClient from "./apiclient";



// @ userLogin 
const login = ({ mobile, password }) => apiClient.post('/auth/customer/login-customer', {
    mobile,
    password
})


// @userRegister 
const register = (registerData) => apiClient.post('/auth/customer/customer-sign-up',
    registerData
)

// @forgotPassword

const forgotPassword = (email) => apiClient.post('/auth/customer/forgot-password',{email});


// @logout 
const logout = () => apiClient.post('/auth/customer/logout');



// @getCustomer 
const fetchCustomer = () => apiClient.post('/get-customer')


// @updateCustomer 
const updateCustomer = (Data) => apiClient.post("/update-customer",Data);


export default {
    login,
    fetchCustomer,
    register,
    logout,
    forgotPassword,
    updateCustomer
}