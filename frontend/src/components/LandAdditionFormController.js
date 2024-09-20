import { Autocomplete, TextField } from "@mui/material";
function LandAdditionFormController({ disabled, label, value, handleChange, content }) {
    return (
        <>
            <Autocomplete
                disableClearable
                disabled={!disabled}
                options={content}
                openOnFocus
                value={value || null}
                onChange={(event, newValue) => handleChange({ target: { name: label.toLowerCase(), value: newValue } })}
                renderInput={(params) => <TextField {...params} autoFocus label={label} />}
                isOptionEqualToValue={(option, value) => option === value || value === null}
            />
        </>
    );
}

export default LandAdditionFormController;