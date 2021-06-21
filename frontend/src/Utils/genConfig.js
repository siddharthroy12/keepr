export default function genConfig() {
	const userInfoFromStorage = localStorage.getItem('loginInfo') ? JSON.parse(localStorage.getItem('loginInfo')) : null

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${userInfoFromStorage.token}`
		}
	}

	return config
}