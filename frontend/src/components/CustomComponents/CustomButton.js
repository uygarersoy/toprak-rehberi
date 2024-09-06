import { styled, Button} from "@mui/material";

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#ffffff",      
    color: "#077437",
    border: "1px solid #077437",
    "&:hover": {
        backgroundColor: "#077437",
        color: "#ffffff",
    },
}));

export default CustomButton;