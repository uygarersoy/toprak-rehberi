import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link, Box, Typography, TextField, Alert, Grid, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { updateUser } from '../store';

const ChangePasswordPage = () => {
    const [userName, setUserName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('error');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (currentPassword === newPassword) {
            setMessage("Yeni şifre eskisi ile aynı olamaz!");
            setMessageType("error");
            return;
        }

        const response = await dispatch(updateUser({
            userName,
            currentPassword,
            newPassword
        }));

        if (response.type === "user/update/fulfilled") {
            setMessage("Şifre başarılı bir şekilde değiştirildi!");
            setMessageType("success");
            navigate('/');
        } else if(response.type === "user/update/rejected" && response.error.message.includes("400")) {
            setMessageType("error");
            setMessage("Zayıf şifre. En az 8 karakter, birer tane küçük, büyük harf ve özel karakter olmalı. Boşluk olmamalı!");
        } else {
            setMessage("Yanlış şifre ya da kullanıcı adı!");
            setMessageType("error");
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
                    Şifre Değiştir
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
                        label="Şifre"
                        type="password"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Yeni Şifre"
                        type="password"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        disabled={!userName || !currentPassword || !newPassword}
                    >
                        Şifereni Değiştir
                    </Button>
                    {message && (
                        <Alert severity={messageType} sx={{ marginTop: 2 }}>
                            {message}
                        </Alert>
                    )}
					<Grid container direction="column" alignItems="center" sx={{ marginTop: 2 }}>
						<Grid item>
							<Link component={NavLink} to="/" sx={{textAlign: "center", color: "#077437"}}>
								Giriş Ekranına Dön!
							</Link>
						</Grid>
					</Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default ChangePasswordPage;