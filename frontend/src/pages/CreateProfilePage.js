import React, { useState } from 'react';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store';
import { useDispatch } from 'react-redux';

const CreateProfilePage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Passwords do not match!");
			return;
		}
		if (!password && !confirmPassword) {
			setMessage("Passwords cannot be empty");
			return;
		}

		const response = await dispatch(registerUser({email, password}));

		console.log(response);
		if (response.type === "user/register/fulfilled") {
			setMessage("Account created successfully!");
			navigate('/');
		}
		else {
			setMessage("An error occurred. Please try again.");
		}
	};

	return (
	<div className="profile-page">
		<form onSubmit={handleSubmit}>
		<h1>Create Account</h1>
		<label htmlFor="email">Email</label>
		<input
			type="text"
			name="email"
			value={email}
			onChange={(event) => setEmail(event.target.value)}
		/>

		<label htmlFor="password">Password</label>
		<input
			type="password"
			name="password"
			value={password}
			onChange={(event) => setPassword(event.target.value)}
		/>

		<label htmlFor="confirmPassword">Confirm Password</label>
		<input
			type="password"
			name="confirmPassword"
			value={confirmPassword}
			onChange={(event) => setConfirmPassword(event.target.value)}
		/>
		<button type="submit">Create Account</button>
		</form>
		{message && <p>{message}</p>}
	</div>
	);
};

export default CreateProfilePage;
