import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../store';
import { Box, Button, TextField, Typography, Link, Alert, Grid } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("error");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await dispatch(fetchUser({ email, password }));
        if (response.type === "user/fetch/fulfilled") {
            setMessage("Success!");
            setMessageType("success");
            setIsLoggedIn(!isLoggedIn);
            navigate("/dashboard")
        } else {
            setMessage("Invalid email or password!");
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
                    Login
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
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        disabled={!email || !password}
                    >
                        Login
                    </Button>
                    {message && (
                        <Alert severity={messageType} sx={{ marginTop: 2 }}>
                            {message}
                        </Alert>
                    )}
                    <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
                        <Grid item>
                            <Link component={NavLink} to="/create-account">
                                Don't have an account?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={NavLink} to="/change-password">
                                Forgot Password?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;