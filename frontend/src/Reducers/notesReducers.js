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