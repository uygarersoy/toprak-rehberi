import { Box, Typography, Select, MenuItem, TextField, Button } from "@mui/material";

function HarvestFeedback({ handleSubmit, satisfaction, setSatisfaction, amount, setAmount, harvest, type }) {
    const amountInfo = (type === "SÜS BİTKİSİ") ? "(adet)" : "(kg)";
    const maxVal = (type === "SÜS BİTKİSİ") ? (50 * harvest.area) : harvest.area;
    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
					flexDirection: 'column',
					gap: 2,
					width: '100%',
					maxWidth: 500,
					margin: '0 auto',
					overflow: 'auto',
					padding: 2,
					boxSizing: 'border-box',
                }}
            >                
                <Box>
                    <Typography variant="body1">Memnuniyet:</Typography>
                    <Select
                        value={satisfaction}
                        onChange={(event) => setSatisfaction(parseInt(event.target.value))}
                        displayEmpty
                        fullWidth
                        autoFocus
                    >
                        <MenuItem value=""><em>Hasat memnuniyetini seçiniz</em></MenuItem>
                        <MenuItem value={3}>Çok iyi</MenuItem>
                        <MenuItem value={2}>Ne iyi, Ne kötü</MenuItem>
                        <MenuItem value={1}>Çok kötü</MenuItem>
                    </Select>
                </Box>
                
                <Box>
                    <Typography variant="body1">Hasat miktarı {amountInfo}</Typography>
                    <TextField
                        type="number"
                        value={amount || ""}
                        onChange={(event) => setAmount(parseInt(event.target.value))}
                        fullWidth
                        InputProps={{ inputProps: { min: 1, max: maxVal } }}
                        disabled={!satisfaction}
                    />
                </Box>
                
                <Button type="submit" variant="contained" color="primary" disabled={!(satisfaction && amount)}>
                    Gönder
                </Button>
            </Box>
        </>
    );
}

export default HarvestFeedback;