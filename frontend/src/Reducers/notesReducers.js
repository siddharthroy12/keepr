import * as $ from '../Constants/notesContants'

export const notesReducer = (state = {}, action) => {
	switch(action.type) {
		case $.FETCH_NOTES_REQUEST:
			return { loading: true, notes: state.notes ? state.notes : [] }
		case $.FETCH_NOTES_SUCCESS:
			return { loading: false, notes: action.payload }
		case $.FETCH_NOTES_FAILED:
			return { loading: false, notes: state.notes ? state.notes : [], error: action.payload }
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