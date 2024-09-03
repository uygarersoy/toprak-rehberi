import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldForm from "../components/FieldForm";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, useFetchFieldsQuery } from "../store";
import FieldItem from "../components/FieldItem";
import { useFetchGuidenessQuery } from "../store";
import { 
        Skeleton,
        Alert,
        Box,
        Button,
        TextField,
        TableRow,
        TableCell,
        TableContainer,
        Table,
        TableHead,
        TableBody,
        Paper, 
        FormControl,
        FormGroup} from '@mui/material';
import DashboardHeader from "../components/DashboardHeader";
import CustomModal from "../components/CustomModal";
import DashboardLogicButtons from "../components/DashboardLogicButtons";

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
            <DashboardHeader />
            <CustomModal text="Add a New Field" open={visibleForm} close={setVisibleForm}>
                <FieldForm setVisibleForm={setVisibleForm}/>
            </CustomModal>
            <CustomModal text="Enter Neighborhood ID" open={guidanceModal} close={setGuidanceModal}>
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
            </CustomModal>
            <CustomModal title="Product Recommendations" open={open} close={setOpen}>
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
            </CustomModal>
            {content}
            <DashboardLogicButtons
                handleFieldCreation={handleFieldCreation}
                handleLogOut={handleLogOut}
                setGuidanceModal={setGuidanceModal}
            />
        </Box>
    );
}

export default DashBoard;