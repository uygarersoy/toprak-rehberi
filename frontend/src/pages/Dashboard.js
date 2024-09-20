import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LandAdditionForm from "../components/LandAdditionForm";
import { removeUser, useFetchLandsQuery, useFetchGuidenessQuery } from "../store";
import LandItem from "../components/LandItem";
import CustomModal from "../components/CustomModal";
import DashboardLogicButtons from "../components/DashboardLogicButtons";
import DashboardHeader from "../components/DashboardHeader";
import useTokenValidation from "../hooks/tokenValidation";
import GuidanceForm from "../components/GuidanceForm";
import {
        Skeleton,
        Alert,
        Box,
        TableRow,
        TableCell,
        TableContainer,
        Table,
        TableHead,
        TableBody,
        Paper } from '@mui/material';

function DashBoard({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [landAdditionForm, setLandAdditionForm] = useState(false);
    const [ guidanceModal, setGuidanceModal ] = useState(false);
    const [ neighborhoodId, setNeighborhoodId ] = useState("");
    const [season, setSeason] = useState("");
    const [ guidanceResultTable, setGuidanceResultTable ] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { data, isFetching, isLoading, error: fetchFieldError } = useFetchLandsQuery(user.data, {skip: !user});
    const { data: guideData, error: fetchGuidenessError } = useFetchGuidenessQuery({neighborhoodId, season}, {skip: !neighborhoodId});
    const [ errorModalOpen, setErrorModalOpen ] = useState(false);
    useTokenValidation(fetchFieldError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(fetchGuidenessError, setIsLoggedIn, setErrorModalOpen);

    const imageMap = {
        "MEYVE": "fruits.png",
        "SEBZE": "vegetable.png",
        "SÜS BİTKİSİ": "plant.png",
        "TAHIL": "barley.png"
    }

    let guideContent = [];
    if (guideData) {
        guideContent = guideData.map((guide) => {
            const productType = imageMap[guide.productType]
            return (                
                <TableRow key={guide.id}>
                    <TableCell>
                        <img 
                            src={productType}
                            alt={guide.productType}
                            style={{width: "40px", height: "40px", objectFit: "contain"}}
                        />
                    </TableCell>
                    <TableCell>{guide.productName}</TableCell>
                    <TableCell>%{guide.percentage}</TableCell>
                    <TableCell>{guide.suggestedPlantingSeason}</TableCell>
                </TableRow>
            );
        });
    }

    const handleLogOut = () => {
        setIsLoggedIn(!isLoggedIn);
        dispatch(removeUser());
        localStorage.removeItem("token");
        navigate("/");
    };  
    
    const handleLandCreation = () => {
        setLandAdditionForm(true);
    }

    const handleGuidanceSubmit = () => {
        setGuidanceModal(false);
        setGuidanceResultTable(true);
    }

    const handleLandCreationModalClose = () => {
        setLandAdditionForm(false);
    };

    const handleGuidanceModalClose = () => {
        setGuidanceModal(false);
    };

    const handleRecommendationModalClose = () => {
        setGuidanceResultTable(false);
    };

    let landContent;
    if (isFetching || isLoading) {
        landContent = <Skeleton variant="rounded" width="100vw" height={30}/>;
    }
    else if (data) {
        landContent = data.map((land) => {
            return <LandItem key={land.id} land={land} setIsLoggedIn={setIsLoggedIn}/>;
        });
    }
    return (
        <Box sx={{ padding: 2, minHeight: '100vh', position: 'relative'}}>
            <DashboardHeader />
            <CustomModal text="Yeni Arazi Ekle" open={landAdditionForm} close={handleLandCreationModalClose}>
                <LandAdditionForm setLandAdditionForm={setLandAdditionForm} setIsLoggedIn={setIsLoggedIn}/>
            </CustomModal>
            <CustomModal text="Arazi Konumunu Girin" open={guidanceModal} close={handleGuidanceModalClose}>
                <GuidanceForm setIsLoggedIn={setIsLoggedIn} setNeighborhoodId={setNeighborhoodId} setSeason={setSeason} handleGuidanceSubmit={handleGuidanceSubmit}/>
            </CustomModal>
            <CustomModal text="Toprak Rehberi" open={guidanceResultTable} close={handleRecommendationModalClose}>
                <TableContainer component={Paper} sx={{maxHeight: "50vh", boxShadow: "none", borderRadius: 0, overflowY: "auto"}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Ürün Adı</TableCell>
                                <TableCell>Başarı Oranı</TableCell>
                                <TableCell>Ekim Sezonu</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {guideContent}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomModal>
            <CustomModal text="HATA" open={errorModalOpen} close={() => {}}>
                <Alert severity="error">Tokeninizin süresi doldu. Giriş sayfasına yönlendiriliyorsunuz. Tekrar giriş yapın!</Alert>
            </CustomModal>
            {landContent}
            <DashboardLogicButtons
                handleLandCreation={handleLandCreation}
                handleLogOut={handleLogOut}
                setGuidanceModal={setGuidanceModal}
            />
        </Box>
    );
}

export default DashBoard;