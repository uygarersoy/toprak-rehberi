import { Box, Typography, Select, MenuItem, TextField, Button} from "@mui/material";
function HarvestForm({ handleSubmit, formState, handleChange, pContent }) {
    return (
        <>
            <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2
            }}
        >
            <Typography variant="h6" mb={2}>Add New Harvest</Typography>
            <Box>
                <Typography variant="body1">Product Type:</Typography>
                <Select
                    name="type"
                    value={formState.type}
                    onChange={handleChange}
                    fullWidth
                    label="Type"
                >
                    <MenuItem value="">Select a Type</MenuItem>
                    <MenuItem value="MEYVE">Meyve</MenuItem>
                    <MenuItem value="SEBZE">Sebze</MenuItem>
                    <MenuItem value="SÜS BİTKİSİ">Süs Bitkileri</MenuItem>
                    <MenuItem value="TAHIL">Tahıl</MenuItem>
                </Select>
            </Box>
            <Box>
                <Typography variant="body1">Product:</Typography>
                <Select
                    name="product"
                    value={formState.product}
                    onChange={handleChange}
                    fullWidth
                    disabled={!formState.type}
                >
                    <MenuItem value="">Select a Product</MenuItem>
                    {pContent}
                </Select>
            </Box>
            <Box>
                <Typography variant="body1">Area:</Typography>
                <TextField
                    type="number"
                    name="area"
                    value={formState.area}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    disabled={!formState.product}
                    InputProps={{ inputProps: { min: 0 } }}
                />
            </Box>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!(formState.type && formState.product && formState.area)}
            >
                Submit
            </Button>
        </Box>
        </>
    );
}

export default HarvestForm;