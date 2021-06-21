import { SIDEBAR_TOGGLE } from "../Constants/sideBarConstants";

export const toggleSideBar = () => async (dispatch) => {
	dispatch({
		type: SIDEBAR_TOGGLE
	})
}