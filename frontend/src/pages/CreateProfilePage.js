import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store';
import { useDispatch } from 'react-redux';
import {Box, Typography, TextField,	Alert, Grid, Link, Button} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { NavLink } from 'react-router-dom';


const CreateProfilePage = () => {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('info');
	const [passwordError, setPasswordError] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const checkPassword = (typedPassword) => {
		const minLength = /.{8,16}/;
		const hasLowerCase = /[a-z]/;
		const hasUpperCse = /[A-Z]/;
		const hasADigit = /\d/;
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>/]/;
		
		if(!hasLowerCase.test(typedPassword)) {
			return "Password has to have at least 1 lowercase letter!";
		}
		if(!hasUpperCse.test(typedPassword)) {
			return "Password has to have at least 1 uppercase letter!";
		}
		if(!hasADigit.test(typedPassword)) {
			return "Password has to be have at least 1 digit!";
		}
		if(!hasSpecialChar.test(typedPassword)) {
			return "Password has to have at least 1 special character!";
		}
		if(!minLength.test(typedPassword)) {
			return "Password length has to be between 8 - 16 chars!";
		}
		return "";
	};

	const handleChange = (event, where) => {
		if (where === "first") {
			setPassword(event.target.value);
		}
		else {
			setConfirmPassword(event.target.value);
		}
		setMessage("");
		setPasswordError(checkPassword(event.target.value));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			setMessageType('error');
			setMessage("Passwords do not match!");
			return;
		}
		if (passwordError) {
			setMessageType("error");
			setMessage("Password does not meet the security creteria!");
			return;
		}

		const response = await dispatch(registerUser({ userName, email, password }));

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
					Hesap Oluştur
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ width: '100%' }}
				>
					<TextField
						fullWidth
						label="Kullanıcı Adı"
						type="text"
						value={userName}
						onChange={(event) => setUserName(event.target.value)}
						margin="normal"
						required
						autoFocus
					/>
					<TextField
						fullWidth
						label="E-mail"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						margin="normal"
						required
					/>
					<TextField
						fullWidth
						label="Şifre"
						type="password"
						value={password}
						onChange={(event) => handleChange(event, "first")}
						margin="normal"
						required
					/>
					<TextField
						fullWidth
						label="Şifreyi Doğrula"
						type="password"
						value={confirmPassword}
						onChange={(event) => handleChange(event, "second")}
						margin="normal"
						required
					/>
					{passwordError && <Alert severity='warning'>{passwordError}</Alert>}
					<Button
						type="submit"
						variant="contained"
						fullWidth
						sx={{ marginTop: 2 }}
						disabled={!userName || !email || !password || !confirmPassword}
					>
						Hesap Oluştur
					</Button>
					{ message && (
						<Alert severity={messageType} sx={{ marginTop: 2 }}>
							{message}
						</Alert>
					)}
					<Grid container direction="column" alignItems="center" sx={{ marginTop: 2 }}>
						<Grid item>
							<Link component={NavLink} to="/" sx={{textAlign: "center", color: "#077437"}}>
								Zaten Hesabım Var?
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};

export default CreateProfilePage;
