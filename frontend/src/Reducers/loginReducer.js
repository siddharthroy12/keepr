import {
	LOGIN_REQUEST,
	AUTHENTICATION_REQUEST,
	AUTHENTICATION_SUCCESS,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT
} from '../Constants/loginConstants'

const loginReducer = (state = { }, action) => {
	switch(action.type) {
		case LOGIN_REQUEST:
			return { loading: true }
		case AUTHENTICATION_REQUEST:
			return { loading: true }
		case AUTHENTICATION_SUCCESS:
			return { loggedIn: true }
		case LOGIN_SUCCESS:
			localStorage.setItem('loginInfo', JSON.stringify(action.payload))
			return { loggedIn: true, info: action.payload }
		case LOGIN_FAIL:
			return { loading: false, loggedIn: false, error: action.payload }
		case LOGOUT:
			return { loggedin: false }
		default:
			return state
	}
}

export default loginReducer