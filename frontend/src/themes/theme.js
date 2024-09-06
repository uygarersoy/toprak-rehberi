import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ffffff",
                    color: "#077437",
                    "&:hover": {
                        backgroundColor: "#077437",
                        color: "#ffffff"
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#077437',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#077437',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#077437',
                    },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "#077437",
                    textDecoration: "none",
                    "&:hover": {
                        textDecoration: "underline",
                        color: "#f59c17",
                    },
                    "&.Mui-focusVisible": {
                        textDecoration: "underline",
                    },
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    "&.Mui-expanded": {
                        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        },
    },
});

export default theme;