import { useState } from "react";
import { Button, Box, Typography, Modal, Grid, CircularProgress, Alert, MenuItem } from '@mui/material';
import { useAddHarvestMutation, useFetchHarvestsQuery, useFetchProductsQuery } from "../store";
import HarvestListItem from "./HarvestListItem";
import HarvestForm from "./HarvestForm";

function HarvestList({ field }) {
    const { data: harvestData, isFetching, error } = useFetchHarvestsQuery(field);
    const [ addHarvest ] = useAddHarvestMutation();
    const [visible, setVisible] = useState(false);
    const [formState, setFormState] = useState({
        type: "",
        product: "",
        area: ""
    });

    const { data: productData} = useFetchProductsQuery(formState.type, {skip: !formState.type});
    let pContent;

    if (productData) {
        pContent = productData.map((product) => {
            return (
                <MenuItem key={product.id} value={product.productName}>
                    {product.productName}
                </MenuItem>
            );
        });
    }

    const handleChange = (event) => {
		setFormState({...formState, [event.target.name]: event.target.value})
	};

    const handleSubmit = (event) => {
        event.preventDefault();
        const harvest = {
            area: formState.area,
            product: productData?.find(p => p.productName === formState.product), 
            field: field
        };
        addHarvest(harvest);
        setFormState({type: "", product: "", area: ""});
        setVisible(false);
    };

    const handleAddHarvest = () => {
        setVisible(true);
    };

    let content = "";
    if (isFetching) {
        content = <CircularProgress />;
    }
    else if (error) {
        content = <Alert severity="error" >Error fetching harvest data...</Alert>;
    }
    else if (!harvestData) {
        content = <Typography>no data at the moment</Typography>;
    }
    else {
        content = (
            <Grid container spacing={2}>
                {harvestData.map((harvest) => (
                <Grid item key={harvest.id} xs={12} sm={6} md={4}>
                    <HarvestListItem harvest={harvest} />
                </Grid>
                ))}
            </Grid>
        );    
    }

    return (
        <Box>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleAddHarvest}>
                    Add a Harvest
                </Button>
            </Box>
            <Modal
                open={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="add-harvest-form"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '80%', md: 400 },
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <HarvestForm handleSubmit={handleSubmit} formState={formState} handleChange={handleChange} pContent={pContent}/>
                </Box>
            </Modal>
            {content}
        </Box>
    )
}


export default HarvestList;