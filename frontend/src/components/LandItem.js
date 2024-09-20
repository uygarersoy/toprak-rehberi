import { useState } from "react";
import { Box, Typography, IconButton, Alert } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandablePanel from "./ExpandablePanel";
import HarvestList from "./HarvestList";
import { useRemoveLandMutation, useGetLocationInformationQuery } from "../store";
import CustomModal from "./CustomModal";
import useTokenValidation from "../hooks/tokenValidation";

function LandItem({ land, setIsLoggedIn }) {
    const [ errorModalOpen, setErrorModalOpen ] = useState(false);
    const [ removeLand, {error: removeLandError} ] = useRemoveLandMutation();
    
    const handleRemoveLand = (event) => {
        event.stopPropagation();
        removeLand(land.id);
    };
    
    const { data: locationData, error: getLocationError } = useGetLocationInformationQuery(land?.neighborhoodId);
    
    const header = (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
            <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-start' }}>
                <IconButton onClick={handleRemoveLand} color= "error">
                    <DeleteIcon/>
                </IconButton>
                <Typography variant="body1" sx={{color: "#077437"}}>
                    <b>{land.type}:</b> {land.landName}<br></br><b>Ada No:</b> {land.adaNo}<br></br><b>Parsel No:</b> {land.parcelNo}<br></br>
                </Typography>
            </Box>
            <Box sx={{ flex: '1 1 auto', textAlign: 'center' }}>
                <Typography variant="body1">
                    {<LocationOnIcon />} {locationData?.["province"]} - {locationData?.["district"]} - {locationData?.["neighborhood"]}
                </Typography>
            </Box>
            <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-end' }}>
                <Typography>
                    EKİLEBİLİR ARAZİ: <b>{land.availableArea}</b> m<sup>2</sup>
                </Typography>
            </Box>
        </Box>
    );
    
    useTokenValidation(getLocationError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(removeLandError, setIsLoggedIn, setErrorModalOpen);

    
    return (
        <>
            <ExpandablePanel header={header}>
                <HarvestList land={land} setIsLoggedIn={setIsLoggedIn}/>
            </ExpandablePanel>
            <CustomModal text="HATA" open={errorModalOpen} close={() => {}}>
                <Alert severity="error">Tokeninizin süresi doldu. Giriş sayfasına yönlendiriliyorsunuz. Tekrar giriş yapın!</Alert>
            </CustomModal>
        </>
    );
}


export default LandItem;