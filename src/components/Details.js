import React from 'react'
import '../styles/Signup.css'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Details() {
	const { user, logout } = UserAuth();
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await logout()
			navigate('/login')
			console.log('You are now logged out')
		} catch (e) {
			console.log(e.message)
		}
	}
	console.log(user)
	return (
		<>
			<div className='form-container'>
				<span><h2>Email: </h2><p>{user.email}</p></span>
				<p>user: {user && " "}</p>
				<p>username: {user.displayName}</p>
				<button onClick={handleLogout} className='logout-btn'>Logout</button>
			</div>
		</>
	)
}

export default Details
