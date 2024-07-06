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


// @logout 
const logout = () => apiClient.post('/auth/customer/logout');



// @getCustomer 
const fetchCustomer = (token) => apiClient.post('/get-customer', {})


export default {
    login,
    fetchCustomer,
    register,
    logout

}