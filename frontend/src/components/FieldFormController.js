import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';

function FieldFormController({ disabled, label, value, handleChange, content }) {

    return (
        <>
            <FormControl fullWidth disabled={!disabled}>
                <InputLabel>{label}</InputLabel>
                <Select
                    name={label.toLowerCase()}
                    value={value}
                    onChange={handleChange}
                    label={label}
                >
                    <MenuItem value="">
                        <em>{label} seçin</em>
                    </MenuItem>
                    {content}
                </Select>
            </FormControl>
        </>
    );
}

export default FieldFormController;