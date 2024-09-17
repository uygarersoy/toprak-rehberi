import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldForm from "../components/FieldForm";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, useFetchFieldsQuery } from "../store";
import FieldItem from "../components/FieldItem";
import { useFetchGuidenessQuery } from "../store";
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
    const [visibleForm, setVisibleForm] = useState(false);
    const [ guidanceModal, setGuidanceModal ] = useState(false);
    const [ neighborhoodId, setNeighborhoodId ] = useState("");
    const [ open, setOpen ] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { data, isFetching, isLoading, error: fetchFieldError } = useFetchFieldsQuery(user.data, {skip: !user});
    const { data: guideData, error: fetchGuidenessError } = useFetchGuidenessQuery(neighborhoodId, {skip: !neighborhoodId});
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
                    <TableCell>{guide.percentage}</TableCell>
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
    
    const handleFieldCreation = () => {
        setVisibleForm(true);
    }

    const handleGuidanceSubmit = () => {
        setGuidanceModal(false);
        setOpen(true);
    }

    const handleFieldAdditionModal = () => {
        setVisibleForm(false);
    };

    const handleGuidanceModal = () => {
        setGuidanceModal(false);
    };

    const handleRecommendationModal = () => {
        setOpen(false);
    };

    let content;
    if (isFetching || isLoading) {
        content = <Skeleton variant="rounded" width="100vw" height={30}/>;
    }
    else if (data) {
        content = data.map((field) => {
            return <FieldItem key={field.id} field={field} setIsLoggedIn={setIsLoggedIn}/>;
        });
    }
    return (
        <Box sx={{ padding: 2, minHeight: '100vh', position: 'relative'}}>
            <DashboardHeader />
            <CustomModal text="Yeni Arazi Ekle" open={visibleForm} close={handleFieldAdditionModal}>
                <FieldForm setVisibleForm={setVisibleForm} setIsLoggedIn={setIsLoggedIn}/>
            </CustomModal>
            <CustomModal text="Arazi Konumunu Girin" open={guidanceModal} close={handleGuidanceModal}>
                <GuidanceForm setIsLoggedIn={setIsLoggedIn} setNeighborhoodId={setNeighborhoodId} handleGuidanceSubmit={handleGuidanceSubmit}/>
            </CustomModal>
            <CustomModal text="Toprak Rehberi" open={open} close={handleRecommendationModal}>
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
            {content}
            <DashboardLogicButtons
                handleFieldCreation={handleFieldCreation}
                handleLogOut={handleLogOut}
                setGuidanceModal={setGuidanceModal}
            />
        </Box>
    );
}

export default DashBoard;