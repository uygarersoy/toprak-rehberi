import { useState } from "react";
import ExpandablePanel from "./ExpandablePanel";
import HarvestList from "./HarvestList";
import { useRemoveFieldMutation } from "../store";
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetLocationInformationQuery } from '../store/apis/locationApi';
import { Box, Typography, IconButton, Alert } from '@mui/material';
import CustomModal from "./CustomModal";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useTokenValidation from "../hooks/tokenValidation";

function FieldItem({ field, setIsLoggedIn }) {
    const [ errorModalOpen, setErrorModalOpen ] = useState(false);
    const [ removeField, {error: removeFieldError} ] = useRemoveFieldMutation();
    const handleRemoveField = (event) => {
        event.stopPropagation();
        removeField(field.id);
    };
    const { data: locationData, error: getLocationError } = useGetLocationInformationQuery(field?.neighborhoodId);
    const header = (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
            <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-start' }}>
                <IconButton onClick={handleRemoveField} color= "error">
                    <DeleteIcon/>
                </IconButton>
                <Typography variant="body1" sx={{color: "#077437"}}>
                    {field.type}
                </Typography>
            </Box>
            <Box sx={{ flex: '1 1 auto', textAlign: 'center' }}>
                <Typography variant="body1">
                    {<LocationOnIcon />} {locationData?.["province"]} - {locationData?.["district"]} - {locationData?.["neighborhood"]}
                </Typography>
            </Box>
            <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="body1">
                    Mahalle ID: <b><u>{field.neighborhoodId}</u></b>
                </Typography>
            </Box>
        </Box>
    );
    
    useTokenValidation(getLocationError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(removeFieldError, setIsLoggedIn, setErrorModalOpen);

    
    return (
        <>
            <ExpandablePanel header={header}>
                <HarvestList field={field} setIsLoggedIn={setIsLoggedIn}/>
            </ExpandablePanel>
            <CustomModal text="HATA" open={errorModalOpen} close={() => {}}>
                <Alert severity="error">Tokeninizin süresi doldu. Giriş sayfasına yönlendiriliyorsunuz. Tekrar giriş yapın!</Alert>
            </CustomModal>
        </>
    );
}


export default FieldItem;