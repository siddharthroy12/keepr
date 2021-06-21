import { SIDEBAR_TOGGLE } from "../Constants/sideBarConstants"

export default function sideBarReducer(state = {}, action) {
	switch (action.type) {
		case SIDEBAR_TOGGLE:
			return { ...state, expand: !state.expand }
		default:
			return state
	}
}