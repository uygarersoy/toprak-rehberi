import { useState } from "react";
import { Button, Box, Typography, Grid, CircularProgress, Alert, MenuItem } from '@mui/material';
import { useAddHarvestMutation, useFetchHarvestsQuery, useFetchProductsQuery } from "../store";
import HarvestListItem from "./HarvestListItem";
import HarvestForm from "./HarvestForm";
import CustomModal from "./CustomModal";

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

    const handleHarvestModal = () => {
        setVisible(false);
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
            <CustomModal text="Add New Harvest" open={visible} close={handleHarvestModal}>
                <HarvestForm handleSubmit={handleSubmit} formState={formState} handleChange={handleChange} pContent={pContent}/>
            </CustomModal>
            {content}
        </Box>
    )
}


export default HarvestList;