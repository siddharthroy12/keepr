import { useHistory } from "react-router"
import axios from "axios"
import genConfig from "../Utils/genConfig"
import { Link } from 'react-router-dom'
import { useState } from "react"

export default function RegisterScreen() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const history = useHistory()

	const onSubmit = async (e) => {
		e.preventDefault()

		if (loading) {
			return
		}

		setLoading(true)

		if (username < 1 || username > 20) {
			setError('Username must be 1-20 characters')
			setLoading(false)
			return
		} else if (/\W/.test(username)) {
			setError("Username can only have numbers and letters")
			setLoading(false)
			return
		}

		if (password < 4) {
			setError('Password is too short')
			setLoading(false)
			return
		} else if (/\W/.test(username)) {
			setError('Password can only have numbers and letters')
			setLoading(false)
			return
		}

		if (confirmPassword !== password) {
			setError('Confirm password do not match')
			setLoading(false)
			return
		}

		try {
			const { data } = await axios.post('/api/user/register', {
				username, password
			}, genConfig())
			setLoading(false)

			localStorage.setItem('loginInfo', JSON.stringify(data))
			history.push('/')

		} catch (error) {
			setLoading(false)
			if (error.response) {
				setError(error.response.data.message)
			} else if (error.request) {
				setError('Slow Network, Failed to login')
			} else {
				setError('Unknown Error, Failed to login')
			}
		}
	}

	return (
		<div id="login-screen">
			<div className="container" style={{marginTop: '5rem'}}>
			<div className="login-form-box">
				<div className="login-form-top">
					<h1 className="login-form-header">Register</h1>
					<p className="login-form-hint">Create your keepr account</p>
					</div>
					{error && (
						<div className="message error">{error}</div>
					)}
					<form onSubmit={onSubmit}>
						<label htmlFor="username">Username</label>
						<input 
							type="text" 
							name="username" 
							placeholder="Username" 
							required
							value={username}
							onChange={(e) => setUsername(e.target.value.trim())}
						/>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							placeholder="Password"
							autoComplete="on"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value.trim())}
						/>
						<label htmlFor="confirm-password">Password</label>
						<input
							type="password"
							name="confirm-password"
							placeholder="Confirm Password"
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value.trim())}
						/>
						<div className="login-form-buttons">
							<Link className="btn-secondary" to='/login'>Log In Instead</Link>
							<button className="btn-primary" type="submit" disabled={loading}>Next</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
