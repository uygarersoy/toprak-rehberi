import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, TextField, Typography, Button, Link, Alert, Grid } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { fetchUser } from '../store';

const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("error");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handlePopState = () => {
            window.history.pushState(null, "", "/");
        };
        window.addEventListener("popstate", handlePopState);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await dispatch(fetchUser({ userName, password }));
        if (response.type === "user/fetch/fulfilled") {
            localStorage.setItem("token", response.payload.token);
            setMessage("Başarılı!");
            setMessageType("success");
            setIsLoggedIn(!isLoggedIn);
            navigate("/dashboard");
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
                    Giriş Yap
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
                        disabled={!userName || !password}
                    >
                        Giriş Yap
                    </Button>
                    {message && (
                        <Alert severity={messageType} sx={{ marginTop: 2 }}>
                            {message}
                        </Alert>
                    )}
                    <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
                        <Grid item>
                            <Link component={NavLink} to="/create-account" >
                                Hesap Oluştur
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={NavLink} to="/change-password" >
                                Şifreni Değiştir
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;