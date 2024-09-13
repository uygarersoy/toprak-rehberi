import { Box, Typography, TextField, Button, Autocomplete} from "@mui/material";

function HarvestForm({ handleSubmit, formState, handleChange, pContent, message, field }) {
    const productTypes = ["MEYVE", "SEBZE", "SÜS BİTKİSİ", "TAHIL"];
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
                    options={productTypes}
                    openOnFocus
                    value={formState.type || null}
                    onChange={(event, newValue) => handleChange({target: {name: "type", value: newValue}})}
                    renderInput={(params) => <TextField {...params} autoFocus label="Ürün Tipi" />}
                    isOptionEqualToValue={(option, value) => option === value || value === null}
                />
            </Box>
            <Box>
                <Autocomplete
                    disableClearable
                    disabled={!formState.type}
                    options={pContent}
                    openOnFocus={formState.type && !formState.product}
                    value={formState.product || null}
                    onChange={(event, newValue) => handleChange({target: {name: "product", value: newValue}})}
                    renderInput={(params) => <TextField {...params} autoFocus label="Ürün" />}
                    isOptionEqualToValue={(option, value) => option === value || value === null}
                />
            </Box>
            <Box>
                <Typography variant="body1">Ekim alanı (m<sup>2</sup>):</Typography>
                <TextField
                    type="number"
                    name="area"
                    label="Alan"
                    disabled={!formState.product}
                    value={formState.area}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
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