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
                <Typography variant="body1">Product Type:</Typography>
                <Select
                    name="type"
                    value={formState.type}
                    onChange={handleChange}
                    fullWidth
                    displayEmpty
                    label="Type"
                    autoFocus
                >
                    <MenuItem value=""><em>Select Type</em></MenuItem>
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
                    displayEmpty
                    autoFocus={formState.type}
                >
                    <MenuItem value=""><em>Select Product</em></MenuItem>
                    {pContent}
                </Select>
            </Box>
            <Box>
                <Typography variant="body1">Area:</Typography>
                <TextField
                    type="number"
                    name="area"
                    label="Enter Area"
                    value={formState.area}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    disabled={!formState.product}
                    InputProps={{ inputProps: { min: 1 } }}
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