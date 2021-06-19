import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import loginReducer from './Reducers/loginReducer'
import { notesReducer, createNoteReducer, updateNoteReducer } from './Reducers/notesReducers'

const reducers = combineReducers({
	login: loginReducer,
	notes: notesReducer,
	createNote: createNoteReducer,
	updateNote: updateNoteReducer
})

const initialState = {
	login: { loggedIn: false }
}

const middlewre = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewre)))

export default store