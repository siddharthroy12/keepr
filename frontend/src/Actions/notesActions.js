import axios from 'axios'
import * as $ from '../Constants/notesContants'
import genConfig from '../Utils/genConfig'

export const fetchNotes = () => async (dispatch) => {
	try {
		dispatch({
			type: $.FETCH_NOTES_REQUEST
		})

		const { data } = await axios.get('/api/notes', genConfig())

		dispatch({
      type: $.FETCH_NOTES_SUCCESS,
      payload: data
    })
		
	} catch (error) {
		dispatch({
      type: $.FETCH_NOTES_FAILED,
      payload: error
    })
	}
}

export const createNote = (title, body, color, pinned) => async (dispatch) => {
	try {
		dispatch({
			type: $.CREATE_NOTE_REQUEST,
			payload: { title, body, color, pinned }
		})

		const { data } = await axios.post('/api/notes', { title, body, color, pinned }, genConfig())

		dispatch({
      type: $.CREATE_NOTE_SUCCESS,
      payload: data
    })

	} catch (error) {
		dispatch({
			type: $.CREATE_NOTE_FAILED,
			payload: error
		})
	}
}

export const updateNote = (id ,title, body, color, pinned) => async (dispatch) => {
	try {
		dispatch({
			type: $.UPDATE_NOTE_REQUEST,
			payload: { id, title, body, color, pinned }
		})

		const { data } = await axios.put(`/api/notes/${id}`, { title, body, color, pinned }, genConfig())

		dispatch({
      type: $.UPDATE_NOTE_SUCCESS,
      payload: data
    })

	} catch (error) {
		dispatch({
			type: $.UPDATE_NOTE_FAILED,
			payload: error
		})
	}
}

export const trashNote = (id) => async (dispatch) => {
	try {
		dispatch({
			type: $.TRASH_NOTE_REQUEST,
			payload: { id }
		})

		const { data } = await axios.get(`/api/notes/${id}/trash`, genConfig())

		dispatch({
      type: $.TRASH_NOTE_SUCCESS,
      payload: data
    })

	} catch(error) {
		dispatch({
			type: $.TRASH_NOTE_FAILED,
			payload: error
		})
	}
}

export const restoreNote = (id) => async (dispatch) => {
	try {
		dispatch({
			type: $.RESTORE_NOTE_REQUEST,
			payload: { id }
		})

		const { data } = await axios.get(`/api/notes/${id}/restore`, genConfig())

		dispatch({
      type: $.RESTORE_NOTE_SUCCESS,
      payload: data
    })

	} catch(error) {
		dispatch({
			type: $.RESTORE_NOTE_FAILED,
			payload: error
		})
	}
}

export const deleteNote = (id) => async (dispatch) => {
	try {
		dispatch({
			type: $.DELETE_NOTE_REQUEST,
			payload: { id }
		})

		const { data } = await axios.delete(`/api/notes/${id}`, genConfig())

		dispatch({
      type: $.DELETE_NOTE_SUCCESS,
      payload: data
    })

	} catch(error) {
		dispatch({
			type: $.DELETE_NOTE_FAILED,
			payload: error
		})
	}
}