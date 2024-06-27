import apiClient from "./apiclient";



// @ userLogin 
const login = ({ mobile, password }) => apiClient.post('/auth/customer/login', {
    mobile,
    password
})


// @userRegister 
const register = (registerData) => apiClient.post('/auth/customer/register',
    registerData
)

// @getCustomer 
const fetchCustomer = (token) => apiClient.post('/get-customer', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})



export default {
    login,
    fetchCustomer,
    register
}