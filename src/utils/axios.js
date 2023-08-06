import axios from 'axios';
import constants from './constants'

axios.defaults.baseURL = constants.PATIENT_URL;
axios.defaults.validateStatus = () => true

export default axios;
