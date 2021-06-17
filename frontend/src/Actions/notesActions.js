import axios from 'axios'

import * as $ from '../Constants/notesContants'

export const fetchNotes = () => async (dispatch) => {
	try {
		dispatch({
			type: $.FETCH_NOTES_REQUEST
		})

		const userInfoFromStorage = localStorage.getItem('loginInfo') ? JSON.parse(localStorage.getItem('loginInfo')) : null

		const config = {
        headers: {
        'Content-Type': 'application/json',
				'Authorization': `Bearer ${userInfoFromStorage.token}`
      }
    }

		const { data } = await axios.get('/api/notes', config)

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