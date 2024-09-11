import { Box, Typography, Select, MenuItem, TextField, Button} from "@mui/material";

function HarvestForm({ handleSubmit, formState, handleChange, pContent, message, field }) {
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
                <Typography variant="body1">Ürün Tipi:</Typography>
                <Select
                    name="type"
                    value={formState.type}
                    onChange={handleChange}
                    fullWidth
                    displayEmpty
                    label="Ürün tipi"
                >
                    <MenuItem value=""><em>Ürün Tipini Seçiniz</em></MenuItem>
                    <MenuItem value="MEYVE">Meyve</MenuItem>
                    <MenuItem value="SEBZE">Sebze</MenuItem>
                    <MenuItem value="SÜS BİTKİSİ">Süs Bitkileri</MenuItem>
                    <MenuItem value="TAHIL">Tahıl</MenuItem>
                </Select>
            </Box>
            <Box>
                <Typography variant="body1">Ürün:</Typography>
                <Select
                    name="product"
                    value={formState.product}
                    onChange={handleChange}
                    fullWidth
                    disabled={!formState.type}
                    displayEmpty
                >
                    <MenuItem value=""><em>Ürün Seçiniz</em></MenuItem>
                    {pContent}
                </Select>
            </Box>
            <Box>
                <Typography variant="body1">Ekim alanı (m<sup>2</sup>):</Typography>
                <TextField
                    type="number"
                    name="area"
                    label="Alan"
                    value={formState.area}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    disabled={!formState.product}
                    InputProps={{ inputProps: { min: 1, max: field.availableArea} }}
                />
            </Box>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!(formState.type && formState.product && formState.area)}
            >
                Gönder
            </Button>
            {message}
        </Box>
        </>
    );
}

export default HarvestForm;