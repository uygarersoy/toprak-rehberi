import { Box, Autocomplete, TextField, Button } from "@mui/material";

function HarvestFeedback({ handleSubmit, satisfaction, setSatisfaction, amount, setAmount, harvest }) {
    const feedbackOptions = ["Çok iyi", "Ne iyi, Ne kötü", "Çok kötü"];
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
                    <Autocomplete
                        disableClearable
                        options={feedbackOptions}
                        openOnFocus
                        value={satisfaction ? feedbackOptions[3-satisfaction] : null}
                        onChange={(event, newValue) => setSatisfaction(3 - feedbackOptions.indexOf(newValue))}
                        renderInput={(params) => <TextField {...params} autoFocus label="Memnuniyet" />}
                        isOptionEqualToValue={(option, value) => option === value || value === null}
                    />
                </Box>
                
                <Box>
                    <TextField
                        type="number"
                        value={amount || ""}
                        onChange={(event) => setAmount(parseInt(event.target.value))}
                        fullWidth
                        InputProps={{ inputProps: { min: 1, max: harvest.area * harvest.expectedAmountPerMeterSquare } }}
                        disabled={!satisfaction}
                        label={`Hasat miktarı (${harvest.product.unitOfHarvest})`}
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