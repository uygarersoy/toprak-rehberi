import { Box, Card, CardContent, Typography, IconButton, Button, Link } from "@mui/material";
import { useAddFeedBackMutation, useGetFractionQuery, useRemoveHarvestMutation, useUpdateFractionsMutation } from "../store";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import HarvestFeedback from "./HarvestFeedback";
import CustomModal from "./CustomModal";

function HarvestListItem({ harvest }) {
    const [removeHarvest] = useRemoveHarvestMutation();
    const [satisfaction, setSatisfaction] = useState("");
    const [amount, setAmount] = useState(0);
    const [addFeedback] = useAddFeedBackMutation();
    const [updateFraction] = useUpdateFractionsMutation();
    const [open, setOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [harvestToRemove, setHarvestToRemove] = useState(null);

    const { data } = useGetFractionQuery({
        neighborhoodId: harvest.field.neighborhoodId,
        productId: harvest.product.id
    });

    const baseURL = "https://tr.wikipedia.org/w/index.php?search=";
    const fullURL = `${baseURL}${encodeURIComponent(harvest.product.productName)}`;

    const images = {
        MEYVE: "fruits.png",
        SEBZE: "vegetable.png",
        TAHIL: "barley.png",
        "SÜS BİTKİSİ": "plant.png"
    };
    const imageSrc = images[harvest.product.type];

    const handleRemoveHarvest = () => {
        if (harvestToRemove) {
            removeHarvest(harvestToRemove);
            setHarvestToRemove(null);
        }
    };

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleCloseInformationModal = () => {
        setFormSubmitted(false);
        handleRemoveHarvest();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = {
            neighborhoodId: harvest.field.neighborhoodId,
            yield: amount,
            productId: harvest.product.id
        };
        const fraction = {
            neighborhoodId: harvest.field.neighborhoodId,
            productId: harvest.product.id,
            satisfaction: satisfaction,
            area: amount,
            productName: harvest.product.productName
        };
        addFeedback(result);
        updateFraction(fraction);

        if (data && data.percentage >= 70 && satisfaction === 1) {
            setHarvestToRemove(harvest);
            setFormSubmitted(true);
        } else {
            removeHarvest(harvest);
        }
        setAmount(0);
        setSatisfaction("");
        setOpen(false);
    };

    return (
        <>
            <Card sx={{ mb: 2, height: '100%', maxWidth: '300px', mx: "auto" }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <img 
                            src={imageSrc} 
                            alt={harvest.product.type} 
                            style={{ 
                                width: '30%',   
                                maxWidth: '80px',
                                height: 'auto'
                            }} 
                        />
                    </Box>
                    <Box sx={{ textAlign: 'center', width: '100%', minHeight: '40px' }}>
                        <Typography variant="body1" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Product: {harvest.product.productName} Area: {harvest.area}
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" onClick={handleOpenModal}>
                            Harvest the Product
                        </Button>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <IconButton onClick={() => removeHarvest(harvest)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </CardContent>
                <CustomModal text="Feedback" open={open} close={handleCloseModal}>
                    <HarvestFeedback
                        handleSubmit={handleSubmit}
                        satisfaction={satisfaction}
                        setSatisfaction={setSatisfaction}
                        amount={amount}
                        setAmount={setAmount}
                    />
                </CustomModal>
                <CustomModal text="Suggestion" open={formSubmitted} close={handleCloseInformationModal}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 2,
                            width: "%100"
                        }}
                    >
                        <HelpCenterRoundedIcon sx={{ color: "#077437", width: '30%', height: 'auto' }}/>
                    </Box>
                    <Typography variant="body1">
                        This product can be harvested here. If you need help, click{" "}
                        <Link href={fullURL} target="_blank" rel="noopener noreferrer" onClick={handleCloseInformationModal}>
                            here
                        </Link>
                        {" "}for more information.
                    </Typography>
                </CustomModal>
            </Card>
        </>
    );
}

export default HarvestListItem;