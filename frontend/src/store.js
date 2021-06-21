import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import loginReducer from './Reducers/loginReducer'
import {
	notesReducer,
	createNoteReducer,
	updateNoteReducer,
	trashNoteReducer,
	restoreNoteReducer,
	deleteNoteReducer
} from './Reducers/notesReducers'
import sideBarReducer from './Reducers/sideBarReducer'

const reducers = combineReducers({
	login: loginReducer,
	notes: notesReducer,
	createNote: createNoteReducer,
	updateNote: updateNoteReducer,
	trashNote: trashNoteReducer,
	restoreNote: restoreNoteReducer,
	deleteNote: deleteNoteReducer,
	sideBar: sideBarReducer
})

const initialState = {
	login: { loggedIn: false },
	sideBar: { expand: false }
}

const middlewre = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewre)))

export default store