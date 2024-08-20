import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store';
import { Link, Box, Typography, TextField, Button, Alert, Grid } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { NavLink } from 'react-router-dom';

const ChangePasswordPage = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await dispatch(updateUser({
            userName,
            email,
            currentPassword,
            newPassword
        }));
        
        if (response.type === "user/update/fulfilled") {
            setMessage("Password changed successfully!");
            navigate('/');
        } else {
            setMessage("Error changing password. Please try again.");
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
                    Change Password
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ width: '100%' }}
                >
                    <TextField
                        fullWidth
                        label="UserName"
                        type="text"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                        margin="normal"
                        required
                    />
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
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="New Password"
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
                        disabled={!userName || !email || !currentPassword || !newPassword}
                    >
                        Change Password
                    </Button>
                    {message && (
                        <Alert severity={message.includes("Error") ? "error" : "success"} sx={{ marginTop: 2 }}>
                            {message}
                        </Alert>
                    )}
					<Grid container direction="column" alignItems="center" sx={{ marginTop: 2 }}>
						<Grid item>
							<Link component={NavLink} to="/" sx={{textAlign: "center"}}>
								Go back to Login Page!
							</Link>
						</Grid>
					</Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default ChangePasswordPage;