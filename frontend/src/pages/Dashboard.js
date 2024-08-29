import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldForm from "../components/FieldForm";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, useFetchFieldsQuery } from "../store";
import FieldItem from "../components/FieldItem";
import { Skeleton, Alert, Box, Button, Typography, Modal, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import YardIcon from '@mui/icons-material/Yard';

function DashBoard({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [visibleForm, setVisibleForm] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { data, isFetching, isLoading, error } = useFetchFieldsQuery(user.data);
    const handleLogOut = () => {
        setIsLoggedIn(!isLoggedIn);
        dispatch(removeUser());
        localStorage.removeItem("token");
        navigate("/");
    };  
    
    const handleFieldCreation = () => {
        setVisibleForm(true);
    }
    let content;
    if (isFetching || isLoading) {
        content = <Skeleton variant="rounded" width="100vw" height={30}/>;
    }
    else if (error) {
        content = <Alert severity="error">An error occurred while loading data.</Alert>;
    }
    else if (!data) {
        content = <div>Empty data.</div>;
    }
    else {
        content = data.map((field) => {
            return <FieldItem key={field.id} field={field}/>;
        });
    }
    return (
        <Box sx={{ padding: 2, minHeight: '100vh', position: 'relative' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <YardIcon sx={{height: "40px", width: "auto", color: "green"}}/>                
                <Typography variant="h4" component="h1" sx={{color: "green"}}>
                    FIELDS
                </Typography>
                <Button variant="contained" color="primary" onClick={handleFieldCreation}>
                    Add New Field
                </Button>
            </Box>
            <Modal
                open={visibleForm}
                onClose={() => setVisibleForm(false)}
                aria-labelledby="add-field-form"
                disableEscapeKeyDown
                hideBackdrop
                aria-describedby="form-to-add-new-field"
            >
                <Box 
                    sx={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '80%', md: 400 },
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                    }}
                >
                    <Typography variant="h6" component="h1" sx={{ mb: 2 }}>
                        Add a new field
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={() => setVisibleForm(false)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <FieldForm setVisibleForm={setVisibleForm} />
                </Box>
            </Modal>
            {content}
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    py: 2,
                    backgroundColor: 'background.paper',
                }}
            >
                <Button variant="outlined" color="secondary" onClick={handleLogOut}>
                    Log out
                </Button>
            </Box>
        </Box>
    );
}

export default DashBoard;