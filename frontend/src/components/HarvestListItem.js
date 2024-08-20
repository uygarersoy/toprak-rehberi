import { Box, Card, CardContent, Typography, IconButton, Button, TextField, Select, MenuItem, Modal } from "@mui/material";
import { useAddFeedBackMutation, useRemoveHarvestMutation, useUpdateFractionsMutation } from "../store";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

function HarvestListItem({ harvest }) {
    const [ removeHarvest ] = useRemoveHarvestMutation();
    //const navigate = useNavigate();
    const [satisfaction, setSatisfaction] = useState("");
    const [amount, setAmount] = useState(0);
    const [visible, setVisible] = useState(false);
    const [ addFeedback ] = useAddFeedBackMutation();
    const [ updateFraction ] = useUpdateFractionsMutation();
    //console.log("Satisfaction: ", satisfaction);
    const [open, setOpen] = useState(false);
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

    /*const handleHarvest = () => {
        setVisible(true);
        //navigate(`/harvest/${harvest.id}`, {state: {harvest}});
    }*/

    const handleSubmit = (event) => {
        event.preventDefault();
        /*console.log(satisfaction);
        console.log(amount);
        console.log(harvest.field);*/
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
        console.log(fraction);
        /*console.log(fraction);
        console.log(result);*/
        addFeedback(result);
        updateFraction(fraction);
        setAmount(0);
        setSatisfaction("");
        setVisible(false);
        removeHarvest(harvest);
    };

    /*const feedback = (
        <form onSubmit={handleSubmit}>
            <div>
				<label>Satisfaction:</label>
				<select id="res" onChange={(event) => setSatisfaction(parseInt(event.target.value))} value={satisfaction}>
                    <option value="">Select Satisfaction</option>
                    <option value={3}>Very Good</option>
                    <option value={2}>Not bad, Not good</option>
                    <option value={1}>Very Bad</option>
                </select>
			</div>
            <div>
                <label>Amoun of the harvest</label>
                <input type="number" onChange={(event) => setAmount(parseInt(event.target.value))} value={amount || ""}></input>
            </div>
            <button type="submit" disabled={!(satisfaction && amount)}>Submit</button>
        </form>
    );*/
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

    return (
        <Card sx={{ mb: 2, height: '100%', maxWidth: '300px', mx: "auto" }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                {/* Responsive Image */}
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img 
                        src={imageSrc} 
                        alt={harvest.product.type} 
                        style={{ 
                            width: '30%',   // Smaller width, adjusts based on the container size
                            maxWidth: '80px',  // Reduced maximum width
                            height: 'auto'     // Maintain aspect ratio
                        }} 
                    />
                </Box>

                {/* Typography */}
                <Box sx={{ textAlign: 'center', width: '100%', minHeight: '40px' }}>
                    <Typography variant="body1" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Product: {harvest.product.productName} Area: {harvest.area}
                    </Typography>
                </Box>

                {/* Centered Button */}
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={handleOpenModal}>
                        Harvest the Product
                    </Button>
                </Box>

                {/* Centered Delete Icon */}
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
    );
}

export default HarvestListItem;