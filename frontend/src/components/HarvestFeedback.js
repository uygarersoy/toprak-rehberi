import { Box, Typography, Select, MenuItem, TextField, Button } from "@mui/material";

function HarvestFeedback({ handleSubmit, satisfaction, setSatisfaction, amount, setAmount }) {
    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: { xs: '90%', sm: '80%', md: 400 },
                    margin: '0 auto',
                }}
            >                
                <Box>
                    <Typography variant="body1">Satisfaction:</Typography>
                    <Select
                        value={satisfaction}
                        onChange={(event) => setSatisfaction(parseInt(event.target.value))}
                        displayEmpty
                        fullWidth
                        autoFocus
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
                        InputProps={{ inputProps: { min: 0 } }}
                    />
                </Box>
                
                <Button type="submit" variant="contained" color="primary" disabled={!(satisfaction && amount)}>
                    Submit
                </Button>
            </Box>
        </>
    );
}

export default HarvestFeedback;