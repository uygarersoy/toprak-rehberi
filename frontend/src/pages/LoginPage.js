import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../store';

const LoginPage = ({ isLoggedIn, setIsLoggedIn}) => {
	const [email, setEmail] = useState('');
  	const [password, setPassword] = useState('');
  	const [message, setMessage] = useState("");
  	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleSubmit = async (event) => {
        event.preventDefault();
		if (!email || !password) {
			setMessage("Please enter both fields");
			return;
		}        
		const response = await dispatch(fetchUser({ email, password }));
		if (response.type === "user/fetch/fulfilled") {
			setMessage("Success!");
			setIsLoggedIn(!isLoggedIn);
            navigate("/dashboard");
		}
		else {
            setMessage("Invalid email or password!");
		}
    };
	return (
		<div className="login-page">
		<form onSubmit={handleSubmit}>
			<h1>Login</h1>
			<label htmlFor="email">Email</label>
			<input
				type="text"
				name="email"
				value={email}
				onChange={(event) => setEmail(event.target.value)}
			></input>

			<label htmlFor="password">Password</label>
			<input
				type="password"
				name="password"
				value={password}
				onChange={(event) => setPassword(event.target.value)}
			></input>
			<button type="submit">Login</button>
		</form>
		{message && <p>{message}</p>}
		<p>Don't have an account? <NavLink to="/create-account">Create one here</NavLink></p>
		<p>Forgot your password? <NavLink to="/change-password">Change it here</NavLink></p>
		</div>
	);
};

export default LoginPage;