import { combineReducers } from 'redux'
import app from './app' 
import user from './user' 
import meet from './meet' 
import docs from './docs' 

export default combineReducers({ app, user, meet, docs })
