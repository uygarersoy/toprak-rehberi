import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {Box, Typography, TextField,	Alert, Grid, Link, Button} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { registerUser } from '../store';

const CreateProfilePage = () => {
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmationPassword, setConfirmationPassword] = useState("");
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("info");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmationPassword) {
			setMessageType('error');
			setMessage("Şifreler eşleşmiyor!");
			return;
		}
		
		if (!password || !confirmationPassword) {
			setMessageType("error");
			setMessage("Şifreler boş olamaz!");
			return;
		}

		const response = await dispatch(registerUser({ userName, email, password }));

		if (response.type === "user/register/fulfilled") {
			setMessageType('success');
			setMessage("Hesap oluşturuldu!");
			navigate('/');
		} else if(response.type === "user/register/rejected" && response.error.code === "ERR_BAD_REQUEST") {
			setMessageType("error");
			setMessage("Zayıf şifre. En az 8 karakter, birer tane küçük, büyük harf ve özel karakter olmalı. Boşluk olmamalı!");
		} else {
			setMessageType('error');
			setMessage("Bir hata oluştu. Tekrar deneyin.");
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
						onChange={(event) => setPassword(event.target.value)}
						margin="normal"
						required
					/>
					<TextField
						fullWidth
						label="Şifreyi Doğrula"
						type="password"
						value={confirmationPassword}
						onChange={(event) => setConfirmationPassword(event.target.value)}
						margin="normal"
						required
					/>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						sx={{ marginTop: 2 }}
						disabled={!userName || !email || !password || !confirmationPassword}
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
