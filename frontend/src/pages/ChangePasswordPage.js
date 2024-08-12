import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store';

const ChangePasswordPage = () => {
	const [email, setEmail] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const response = await dispatch(updateUser({
				email,
				currentPassword,
				newPassword
			}
		));
		
		if (response.type === "user/update/fulfilled") {
			setMessage("Password changed successfully!");
			navigate('/');
			}
		else {
			setMessage("Error changing password. Please try again.");
		}
	};

	return (
	<div className="change-password-page">
		<form onSubmit={handleSubmit}>
		<h1>Change Password</h1>
		<label htmlFor="email">Email</label>
		<input
			type="email"
			name="email"
			value={email}
			onChange={(event) => setEmail(event.target.value)}
		/>

		<label htmlFor="currentPassword">Current Password</label>
		<input
			type="password"
			name="currentPassword"
			value={currentPassword}
			onChange={(event) => setCurrentPassword(event.target.value)}
		/>

		<label htmlFor="newPassword">New Password</label>
		<input
			type="password"
			name="newPassword"
			value={newPassword}
			onChange={(event) => setNewPassword(event.target.value)}
		/>
		<button type="submit">Change Password</button>
		</form>
		{message && <p>{message}</p>}
	</div>
	);
};

export default ChangePasswordPage;