import { Box, TextField, Button, Autocomplete} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function HarvestForm({ handleSubmit, formState, handleChange, productContent, land }) {
    const productTypes = ["MEYVE", "SEBZE", "SÜS BİTKİSİ", "TAHIL"];
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                        overflowY: "auto",
                        maxHeight: "75vh",
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
                            options={productContent}
                            openOnFocus
                            value={formState.product.productName || null}
                            onChange={(event, newValue) => handleChange({target: {name: "product", value: newValue}})}
                            renderInput={(params) => <TextField {...params} autoFocus label="Ürün" />}
                            isOptionEqualToValue={(option, value) => option === value || value === null}
                        />
                    </Box>
                    <Box>
                        <TextField
                            type="number"
                            name="area"
                            label={<span>Ekim Alanı: (m<sup>2</sup>)</span>}
                            disabled={!formState.product}
                            value={formState.area}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            InputProps={{ inputProps: { min: 1, max: land.availableArea} }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            type="number"
                            name="amount"
                            label={<span>Beklenen hasılat: (m<sup>2</sup> başına {formState.product.unitOfHarvest})</span>}
                            disabled={!formState.area}
                            value={formState.amount}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            InputProps={{ inputProps: { min: 1, max: 300000} }}
                        />
                    </Box>
                    <Box>
                        <DatePicker 
                            label="Ekim Tarihi"
                            value={formState.plantingDate}
                            disabled={!formState.amount}
                            sx={{width: "100%"}}
                            inputFormat="DD/MM/YYYY"
                            onChange={(newValue) => handleChange({ target: { value: newValue, name: "plantingDate" } })}
                            maxDate={dayjs()}
                            minDate={dayjs().subtract(1, "month")}
                            slots={{textField: (params) => <TextField {...params} fullWidth />}}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!(formState.type && formState.product && formState.area && formState.plantingDate && formState.amount)}
                    >
                        Gönder
                    </Button>
                </Box>
            </LocalizationProvider>
        </>
    );
}

export default HarvestForm;