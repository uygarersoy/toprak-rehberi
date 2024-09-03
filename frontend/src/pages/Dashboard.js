import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldForm from "../components/FieldForm";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, useFetchFieldsQuery } from "../store";
import FieldItem from "../components/FieldItem";
import CloseIcon from "@mui/icons-material/Close";
import YardIcon from '@mui/icons-material/Yard';
import { useFetchGuidenessQuery } from "../store";
import { 
        Skeleton,
        Alert,
        Box,
        Button,
        IconButton,
        Grid,
        TextField,
        TableRow,
        TableCell,
        Modal,
        Typography,
        TableContainer,
        Table,
        TableHead,
        TableBody,
        Paper, 
        FormControl,
        FormGroup} from '@mui/material';

function DashBoard({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [visibleForm, setVisibleForm] = useState(false);
    const [ guidanceModal, setGuidanceModal ] = useState(false);
    const [ input, setInput ] = useState("");
    const [ neighborhoodId, setNeighborhoodId ] = useState("");
    const [ open, setOpen ] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { data, isFetching, isLoading, error } = useFetchFieldsQuery(user.data);
    const { data: guideData } = useFetchGuidenessQuery(neighborhoodId, {skip: !neighborhoodId});

    let guideContent = [];
    if (guideData) {
        guideContent = guideData.map((guide) => {
            return (                
                <TableRow key={guide.id}>
                    <TableCell>{guide.productName}</TableCell>
                    <TableCell>{guide.percentage}</TableCell>
                </TableRow>
            );
        });
    }

    const handleLogOut = () => {
        setIsLoggedIn(!isLoggedIn);
        dispatch(removeUser());
        localStorage.removeItem("token");
        navigate("/");
    };  
    
    const handleFieldCreation = () => {
        setVisibleForm(true);
    }

    const handleGuidanceSubmit = (event) => {
        event.preventDefault();
        setNeighborhoodId(input);
        setInput("");
        setGuidanceModal(false);
        setOpen(true);
    }
    let content;
    if (isFetching || isLoading) {
        content = <Skeleton variant="rounded" width="100vw" height={30}/>;
    }
    else if (error) {
        content = <Alert severity="error">An error occurred while loading data.</Alert>;
        if (error.status === 403 || error.status === 401 ){
            setIsLoggedIn(false);
            navigate("/");
        }
    }
    else {
        content = data.map((field) => {
            return <FieldItem key={field.id} field={field}/>;
        });
    }
    return (
        <Box sx={{ padding: 2, minHeight: '100vh', position: 'relative' }}>
            <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Grid item xs="auto">
                    <YardIcon sx={{ height: "40px", width: "auto", color: "#077437" }} />
                </Grid>
                <Grid item xs>
                    <Typography variant="h4" component="h1" align="center" sx={{ color: "#077437" }}>
                        FIELDS
                    </Typography>
                </Grid>
                <Grid item xs="auto">
                    <YardIcon sx={{ height: "40px", width: "auto", color: "#077437" }} />
                </Grid>
            </Grid>
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
            <Modal
                open={guidanceModal}
                onClose={() => setGuidanceModal(false)}
                aria-labelledby="product-recommendation-form"
                disableEscapeKeyDown
                hideBackdrop
                aria-describedby="form-to-enter-neighborhood-id"
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
                        Enter Neighborhood ID
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={() => setGuidanceModal(false)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <FormControl fullWidth component="form" onSubmit={handleGuidanceSubmit}>
                        <FormGroup>
                            <TextField 
                            label="Neighborhood ID"
                            variant="outlined"
                            value={input}
                            type="number"
                            onChange={(event) => setInput(parseInt(event.target.value))}
                            fullWidth
                            sx={{ mb: 2 }}
                            />
                            <Button variant="contained" color="primary" type="submit" fullWidth disabled={!input}>
                                Submit
                            </Button>
                        </FormGroup>
                    </FormControl>
                </Box>
            </Modal>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="product-recommendation"
                aria-describedby="product-recommendation-details"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '80%', md: 600 },
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 24,
                    overflowY: 'auto',
                    maxHeight: '80vh'
                }}>
                    <Typography variant="h6" component="h2" 
                        sx={{
                        textAlign: 'center',
                        p: 2,
                        borderBottom: '1px solid #ddd',
                        width: '100%',
                    }}>
                        Product Recommendations
                    </Typography>
                    <TableContainer component={Paper} sx={{maxHeight: "70vh"}}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Percentage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {guideContent}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
            {content}
            <Box 
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    gap: 2,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    bgcolor: '#077437',
                    boxShadow: "0 -2px 10px rgba(0,0,0,0.2)"
                }}
            >
                 <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="primary" onClick={handleFieldCreation}>
                        Add New Field
                    </Button>
                </Box>

                <Box sx={{ flex: '0 1 auto', mx: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleLogOut}>
                        Log out
                    </Button>
                </Box>

                <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-start' }}>
                    <Button variant="contained" color="primary" onClick={() => setGuidanceModal(true)}>
                        Product Recommendation
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default DashBoard;