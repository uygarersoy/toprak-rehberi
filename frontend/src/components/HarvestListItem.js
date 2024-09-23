import { Box, Card, CardContent, Typography, IconButton, Button, Link, Alert } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import HarvestFeedback from "./HarvestFeedback";
import CustomModal from "./CustomModal";
import useTokenValidation from "../hooks/tokenValidation";
import { useAddFeedBackMutation, useGetProductSuccessValueQuery, useRemoveHarvestMutation, useUpdateLandMutation, useUpdateProductSuccessValuesMutation } from "../store";

function formatDate(rawDate) {
    const date = new Date(rawDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}


function HarvestListItem({ harvest, setIsLoggedIn }) {
    const [ errorModalOpen, setErrorModalOpen ] = useState(false);
    const [removeHarvest, {error: removeHarvestError}] = useRemoveHarvestMutation();
    const [ updateLand, { error: updateLandError } ] = useUpdateLandMutation();
    const [satisfaction, setSatisfaction] = useState("");
    const [amount, setAmount] = useState(null);
    const [addFeedback, {error: addFeedbackError}] = useAddFeedBackMutation();
    const [updateProductSuccessValue, {error: updateSuccessValueError}] = useUpdateProductSuccessValuesMutation();
    const [harvestFeedbackOpen, setHarvestFeedbackOpen] = useState(false);
    const [adviceModalOpen, setAdviceModalOpen] = useState(false);
    const [harvestToRemove, setHarvestToRemove] = useState(null);

    const { data, error: getProductSuccessValueError } = useGetProductSuccessValueQuery({
        neighborhoodId: harvest.land.neighborhoodId,
        productId: harvest.product.id
    });

    const baseURL = "https://tr.wikipedia.org/w/index.php?search=";
    const fullURL = `${baseURL}${encodeURIComponent(harvest.product.productName)}`;

    const images = {
        MEYVE: "fruits.png",
        SEBZE: "vegetable.png",
        TAHIL: "barley.png",
        "SÜS BİTKİSİ": "plant.png"
    };
    const imageSrc = images[harvest.product.type];

    const handleRemoveHarvest = () => {
        if (harvestToRemove) {
            removeHarvest({ harvest: harvestToRemove, harvestedOrDeleted: true, harvestAmount: amount});
            setHarvestToRemove(null);
            updateLand({landId: harvest.land.id, sign: 1, area: harvest.area});
        }
    };

    const today = new Date();
    const expectedHarvest = dayjs(harvest.plantingDate).add(harvest.product.durationTillHarvest, "day").toDate();
    const beforeHarvest = today < expectedHarvest;

    const handleOpenHarvestFeedbackModal = () => {
        setHarvestFeedbackOpen(true);
    };

    const handleCloseHarvestFeedbackModal = () => {
        setHarvestFeedbackOpen(false);
    };

    const handleCloseInformationModal = () => {
        setAdviceModalOpen(false);
        handleRemoveHarvest();
    };
    
    const handleRemoveWithoutHarvest = () => {
        removeHarvest({ harvest: harvest, harvestedOrDeleted: false, harvestAmount: 0});
        updateLand({landId: harvest.land.id, sign: 1, area: harvest.area});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = {
            neighborhoodId: harvest.land.neighborhoodId,
            harvestAmount: amount,
            productId: harvest.product.id
        };
        const productSuccess = {
            neighborhoodId: harvest.land.neighborhoodId,
            productId: harvest.product.id,
            satisfaction: satisfaction,
            area: amount,
            productName: harvest.product.productName
        };
        addFeedback(result);

        if (data && data.percentage >= 70 && satisfaction === 1) {
            setHarvestToRemove(harvest);
            setAdviceModalOpen(true);
        } else {
            removeHarvest({ harvest: harvest, harvestedOrDeleted: true, harvestAmount: amount});
            updateLand({landId: harvest.land.id, sign: 1, area: harvest.area});
            updateProductSuccessValue(productSuccess);
        }
        setAmount(0);
        setSatisfaction("");
        setHarvestFeedbackOpen(false);
    };

    useTokenValidation(removeHarvestError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(addFeedbackError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(updateSuccessValueError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(getProductSuccessValueError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(updateLandError, setIsLoggedIn, setErrorModalOpen);

    return (
        <>
            <Card sx={{ mb: 2, height: '100%', maxWidth: '400px', mx: "auto", boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <img 
                            src={imageSrc} 
                            alt={harvest.product.type} 
                            style={{ 
                                width: '30%',   
                                maxWidth: '80px',
                                height: 'auto'
                            }} 
                        />
                    </Box>
                    <Box sx={{ textAlign: 'center', width: '100%', minHeight: '40px' }}>
                        <Typography variant="body1" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <b>ÜRÜN:</b> {harvest.product.productName}
                        </Typography>
                        <Typography variant="body1" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <b>EKİLİ ALAN:</b> {harvest.area} m<sup>2</sup>
                        </Typography>
                        <Typography variant="body1" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <b>METREKARE BAŞI BEKLENTİ:</b> {harvest.expectedAmountPerMeterSquare} {harvest.product.unitOfHarvest.toUpperCase()}
                        </Typography>
                        <Typography variant="body1" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <b>EKİM TARİHİ:</b> {formatDate(harvest.plantingDate)}
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" onClick={handleOpenHarvestFeedbackModal} disabled={beforeHarvest} >
                            HASAT ET
                        </Button>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <IconButton onClick={handleRemoveWithoutHarvest} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </CardContent>
                <CustomModal text="Geri Dönüş" open={harvestFeedbackOpen} close={handleCloseHarvestFeedbackModal}>
                    <HarvestFeedback
                        type={harvest.product.type}
                        handleSubmit={handleSubmit}
                        satisfaction={satisfaction}
                        setSatisfaction={setSatisfaction}
                        amount={amount}
                        setAmount={setAmount}
                        harvest={harvest}
                    />
                </CustomModal>
                <CustomModal text="TAVSİYE" open={adviceModalOpen} close={handleCloseInformationModal}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 2,
                            width: "%100"
                        }}
                    >
                        <HelpCenterRoundedIcon sx={{ color: "#077437", width: '30%', height: 'auto' }}/>
                    </Box>
                    <Typography variant="body1">
                        Bu ürün burada yetiştirilebilir. Eğer bilgi almak isterseniz, buraya{" "}
                        <Link href={fullURL} target="_blank" rel="noopener noreferrer" onClick={handleCloseInformationModal}>
                            tıklayın!
                        </Link>
                    </Typography>
                </CustomModal>
            </Card>
            <CustomModal text="HATA" open={errorModalOpen} close={() => {}}>
                <Alert severity="error">Tokeninizin süresi doldu. Giriş sayfasına yönlendiriliyorsunuz. Tekrar giriş yapın!</Alert>
            </CustomModal>
        </>
    );
}

export default HarvestListItem;