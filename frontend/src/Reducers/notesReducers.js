import * as $ from '../Constants/notesContants'
import { v4 as uuidv4 } from 'uuid';

export const notesReducer = (state = {}, action) => {
	let notesCopy = []
	switch(action.type) {
		case $.FETCH_NOTES_REQUEST:
			return { loading: true, notes: state.notes ? state.notes : [] }

		case $.FETCH_NOTES_SUCCESS:
			return { loading: false, notes: action.payload }

		case $.FETCH_NOTES_FAILED:
			return { loading: false, notes: state.notes ? state.notes : [], error: action.payload }

		case $.CREATE_NOTE_REQUEST:
			return { ...state, notes: [...state.notes, { 
				_id: uuidv4(),
				color: action.payload.color,
				title: action.payload.title,
				body: action.payload.body,
				pinned: false,
				trashed: false,
				pending: true
			}]}

		case $.UPDATE_NOTE_REQUEST:
			notesCopy = [...state.notes]
			
			for (let i = 0; i < notesCopy.length; i++) {
				if (notesCopy[i]._id === action.payload.id) {
					notesCopy[i].title = action.payload.title
					notesCopy[i].body = action.payload.body
					notesCopy[i].color = action.payload.color
					notesCopy[i].pinned = action.payload.pinned
					notesCopy[i].pending = true
				}
			}

			return {
				...state, notes: [...notesCopy]
			}
		
		case $.UPDATE_NOTE_SUCCESS:
			notesCopy = [...state.notes]
			
			for (let i = 0; i < notesCopy.length; i++) {
				if (notesCopy[i]._id === action.payload._id) {
					notesCopy[i].pending = false
				}
			}

			return {
				...state, notes: [...notesCopy]
			}

		case $.TRASH_NOTE_REQUEST:
			notesCopy = [...state.notes]
			
			for (let i = 0; i < notesCopy.length; i++) {
				if (notesCopy[i]._id === action.payload.id) {
					notesCopy[i].trashed = true
					notesCopy[i].pending = true
				}
			}

			return {
				...state, notes: [...notesCopy]
			}
		
		case $.TRASH_NOTE_SUCCESS:
			notesCopy = [...state.notes]
			
			for (let i = 0; i < notesCopy.length; i++) {
				if (notesCopy[i]._id === action.payload._id) {
					notesCopy[i].pending = false
				}
			}

			return {
				...state, notes: [...notesCopy]
			}
		
		case $.RESTORE_NOTE_REQUEST:
			notesCopy = [...state.notes]
			
			for (let i = 0; i < notesCopy.length; i++) {
				if (notesCopy[i]._id === action.payload.id) {
					notesCopy[i].trashed = false
					notesCopy[i].pending = true
				}
			}

			return {
				...state, notes: [...notesCopy]
			}
		
		case $.RESTORE_NOTE_SUCCESS:
			notesCopy = [...state.notes]
			
			for (let i = 0; i < notesCopy.length; i++) {
				if (notesCopy[i]._id === action.payload._id) {
					notesCopy[i].pending = false
				}
			}

			return {
				...state, notes: [...notesCopy]
			}

		case $.DELETE_NOTE_REQUEST:
			notesCopy = state.notes.filter(note => note._id !== action.payload.id)
			return { ...state, notes: [...notesCopy] }

		default:
			return state
	}
}

export const createNoteReducer = (state = {}, action) => {
	switch(action.type) {
		case $.CREATE_NOTE_REQUEST:
			return { params: action.payload }
		case $.CREATE_NOTE_SUCCESS:
			return { message: action.payload }
		case $.CREATE_NOTE_FAILED:
			return { error: action.payload }
		default:
			return state
	}
}

export const updateNoteReducer = (state = {}, action) => {
	switch(action.type) {
		case $.UPDATE_NOTE_REQUEST:
			return { params: action.payload }
		case $.UPDATE_NOTE_SUCCESS:
			return { message: action.payload }
		case $.UPDATE_NOTE_FAILED:
			return { error: action.payload }
		default:
			return state
	}
}

export const trashNoteReducer = (state = {}, action) => {
	switch(action.type) {
		case $.TRASH_NOTE_REQUEST:
			return { params: action.payload }
		case $.TRASH_NOTE_SUCCESS:
			return { message: action.payload }
		case $.TRASH_NOTE_FAILED:
			return { error: action.payload }
		default:
			return state
	}
}

export const restoreNoteReducer = (state = {}, action) => {
	switch(action.type) {
		case $.RESTORE_NOTE_REQUEST:
			return { params: action.payload }
		case $.RESTORE_NOTE_SUCCESS:
			return { message: action.payload }
		case $.RESTORE_NOTE_FAILED:
			return { error: action.payload }
		default:
			return state
	}
}

export const deleteNoteReducer = (state = {}, action) => {
	switch(action.type) {
		case $.DELETE_NOTE_REQUEST:
			return { params: action.payload }
		case $.DELETE_NOTE_SUCCESS:
			return { message: action.payload }
		case $.DELETE_NOTE_FAILED:
			return { error: action.payload }
		default:
			return state
	}
}
