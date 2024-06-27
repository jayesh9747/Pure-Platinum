import apiClient from "./apiclient";


// @getCountries
const getCountries = () => apiClient.post('/get-countries', {})

// @States
const getStates = (country_id) => apiClient.post('/get-states', { country_id })

// @getCity 
const getCity = (state_id) => apiClient.post('/get-cities', { state_id })


export default {
    getCountries,
    getStates,
    getCity
}