import { Box, Card, CardContent, Typography, IconButton, Button, TextField, Select, MenuItem, Modal, Snackbar, Slide } from "@mui/material";
import { useAddFeedBackMutation, useGetFractionQuery, useRemoveHarvestMutation, useUpdateFractionsMutation } from "../store";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as MuiLink} from "@mui/material";

function HarvestListItem({ harvest }) {
    const [ removeHarvest ] = useRemoveHarvestMutation();
    const [satisfaction, setSatisfaction] = useState("");
    const [amount, setAmount] = useState(0);
    const [ addFeedback ] = useAddFeedBackMutation();
    const [ updateFraction ] = useUpdateFractionsMutation();
    const [open, setOpen] = useState(false);
    /*const { data } = useGetFractionQuery(harvest.field.neighborhoodId, harvest.product.id);
    const [snackOpen, setSnackOpen] = useState(false);*/
    const images = {
        MEYVE: "fruits.png",
        SEBZE: "vegetable.png",
        TAHIL: "barley.png",
        "SÜS BİTKİSİ": "plant.png"
    };
    const imageSrc = images[harvest.product.type];

    const handleRemoveHarvest = () => {
        removeHarvest(harvest);
    };

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
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
        //setSnackOpen(true);
        setAmount(0);
        setSatisfaction("");
        removeHarvest(harvest);
    };

    /*const handleSnack = () => {
        setSnackOpen(false);
    };*/

    const feedback = (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <Typography variant="h6">Provide Feedback</Typography>
            
            <Box>
                <Typography variant="body1">Satisfaction:</Typography>
                <Select
                    value={satisfaction}
                    onChange={(event) => setSatisfaction(parseInt(event.target.value))}
                    displayEmpty
                    fullWidth
                >
                    <MenuItem value=""><em>Select Satisfaction</em></MenuItem>
                    <MenuItem value={3}>Very Good</MenuItem>
                    <MenuItem value={2}>Not Bad, Not Good</MenuItem>
                    <MenuItem value={1}>Very Bad</MenuItem>
                </Select>
            </Box>
            
            <Box>
                <Typography variant="body1">Amount of Harvest:</Typography>
                <TextField
                    type="number"
                    value={amount || ""}
                    onChange={(event) => setAmount(parseInt(event.target.value))}
                    fullWidth
                />
            </Box>
            
            <Button type="submit" variant="contained" color="primary" disabled={!(satisfaction && amount)}>
                Submit
            </Button>
        </Box>
    );
    /*const link = (
        <MuiLink
            href={'https://tr.wikipedia.org/w/index.php?search=${harvest.product.productName}&title=%C3%96zel%3AAra&ns0=1'}
            target="_blank"
            rel="noopener noreferrer"
        >
            Here
        </MuiLink>
    )*/

    /*let snackContent;
    if (data && data.percentage >= 70 && satisfaction && satisfaction === 1) {
        setSnackOpen(true);
        snackContent = (
            <Snackbar
                open={snackOpen}
                onClose={handleSnack}
                TransitionComponent={(props) => <Slide {...props} direction="down"/>}
                message={
                    <>
                        This product can be harvested in this region. Click {link} for more info!
                    </>
                }
                action={
                    <IconButton onClick={handleSnack} color="error">
                        <DeleteIcon />
                    </IconButton>
                }
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            />
        );
    }*/
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
                        <IconButton onClick={handleRemoveHarvest} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </CardContent>

                <Modal
                    open={open}
                    onClose={handleCloseModal}
                    aria-labelledby="feedback-modal-title"
                    aria-describedby="feedback-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
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
                        gap: 2
                    }}>
                        {feedback}
                    </Box>
                </Modal>
            </Card>
        </>
    );
}

export default HarvestListItem;