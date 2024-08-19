import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store';
import { useDispatch } from 'react-redux';
import {Box, Typography, TextField,	Button,	Alert, Grid, Link} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { NavLink } from 'react-router-dom';

const CreateProfilePage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('info');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			setMessageType('error');
			setMessage("Passwords do not match!");
			return;
		}
		if (!password || !confirmPassword) {
			setMessageType('error');
			setMessage("Passwords cannot be empty");
			return;
		}

		const response = await dispatch(registerUser({ email, password }));

		if (response.type === "user/register/fulfilled") {
			setMessageType('success');
			setMessage("Account created successfully!");
			navigate('/');
		} else {
			setMessageType('error');
			setMessage("An error occurred. Please try again.");
		}
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100vh"
			paddingX={2}
		>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				sx={{
					width: { xs: '100%', sm: '400px' },
					padding: 3,
					boxShadow: 3,
					borderRadius: 2,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: 2,
						bgcolor: 'green',
						borderRadius: '50%',
						width: 60,
						height: 60,
					}}
				>
					<LockIcon sx={{ color: 'white' }} fontSize="large" />
				</Box>
				<Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
					Create Account
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ width: '100%' }}
				>
					<TextField
						fullWidth
						label="Email"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						margin="normal"
						required
					/>
					<TextField
						fullWidth
						label="Password"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						margin="normal"
						required
					/>
					<TextField
						fullWidth
						label="Confirm Password"
						type="password"
						value={confirmPassword}
						onChange={(event) => setConfirmPassword(event.target.value)}
						margin="normal"
						required
					/>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						sx={{ marginTop: 2 }}
						disabled={!email || !password || !confirmPassword}
					>
						Create Account
					</Button>
					{message && (
						<Alert severity={messageType} sx={{ marginTop: 2 }}>
							{message}
						</Alert>
					)}
					<Grid container direction="column" alignItems="center" sx={{ marginTop: 2 }}>
						<Grid item>
							<Link component={NavLink} to="/" sx={{textAlign: "center"}}>
								Already have an account?
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};

export default CreateProfilePage;
