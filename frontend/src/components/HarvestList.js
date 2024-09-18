import { useState } from "react";
import { Button, Box, Grid, CircularProgress, Alert, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody} from '@mui/material';
import { useAddHarvestMutation, useFetchHarvestsQuery, useFetchProductsQuery, useGetPastHarvetsQuery, useUpdateFieldMutation } from "../store";
import HarvestListItem from "./HarvestListItem";
import HarvestForm from "./HarvestForm";
import CustomModal from "./CustomModal";
import useTokenValidation from "../hooks/tokenValidation";

function formatDate(rawDate) {
    const date = new Date(rawDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}


function HarvestList({ field, setIsLoggedIn }) {
    const { data: harvestData, isFetching, error: fetchHarvestError } = useFetchHarvestsQuery(field);
    const [ addHarvest, {error: addHarvestError}] = useAddHarvestMutation();
    const [ updateField, { error: updataFieldError}] = useUpdateFieldMutation();
    const [visible, setVisible] = useState(false);
    const [pastHarvests, setPastHarvests] = useState(false);
    const [formState, setFormState] = useState({
        type: "",
        product: "",
        area: "",
        plantingDate: null,
        harvestDate: null,
        amount: ""
    });
    const [ errorModalOpen, setErrorModalOpen ] = useState(false);
    const imageMap = {
        "MEYVE": "fruits.png",
        "SEBZE": "vegetable.png",
        "SÜS BİTKİSİ": "plant.png",
        "TAHIL": "barley.png"
    }

    const { data: productData, error: fetchProductsError} = useFetchProductsQuery(formState.type, {skip: !formState.type});
    const { data: pastHarvestsData, error: pastHarvestsError } = useGetPastHarvetsQuery(field);
    let pContent = [];
    let pastData = [];

    if (pastHarvestsData) {
        pastData = pastHarvestsData.map((harvest) => {
            return (
                <TableRow key={harvest.id}>
                    <TableCell>
                        <img
                            src={imageMap[harvest.product.type]}
                            alt={harvest.product.productName}
                            style={{width: "40px", height: "40px", objectFit: "contain"}}
                        />
                    </TableCell>
                    <TableCell>{harvest.product.productName}</TableCell>
                    <TableCell>{formatDate(harvest.plantingDate)}</TableCell>
                    <TableCell>{formatDate(harvest.harvestDate)}</TableCell>
                    <TableCell>{harvest.harvestAmount} {harvest.product.unitOfHarvest}</TableCell>
                </TableRow>
            );
        });
    }

    if (productData) {
        pContent = productData.map((product) => {
            if (product.productName !== "DİĞER") {
                return product.productName;
            }
            else {
                return null;
            }
        }).filter(product => product !== null);
        pContent = pContent.concat("DİĞER");
    }

    useTokenValidation(fetchHarvestError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(addHarvestError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(fetchProductsError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(updataFieldError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(pastHarvestsError, setIsLoggedIn, setErrorModalOpen);

	const handleChange = (event) => {
		const { name, value } = event.target;
		let updatedState = {};
		if (name === "type") {
			updatedState = {
				type: value,
				product: "",
				area: ""
			};
		} else if (name === "product") {
			updatedState = {
				product: productData?.find(p => p.productName === value),
				area: ""
			};
		} else if (name === "area") {
			updatedState = {
				area: value
			};
		} else {
            updatedState = { [name] : value}
        }
	
		setFormState((previousState) => ({
			...previousState,
			...updatedState
		}));
	};

    const handleSubmit = (event) => {
        event.preventDefault();
        const harvest = {
            area: formState.area,
            product: formState.product, 
            field: field,
            plantingDate: formState.plantingDate,
            expectedAmountPerMeterSquare: formState.amount,
            isDeleted: false
        };
        addHarvest(harvest);
        updateField({fieldId: field.id, sign: -1, area: formState.area});
        setFormState({type: "", product: "", area: ""});
        setVisible(false);
    };

    const handleAddHarvest = () => {
        setVisible(true);
    };

    const handleHarvestModal = () => {
        setVisible(false);
    };

    const handlePastHarvestsOpen = () => {
        setPastHarvests(true);
    };
    
    const handlePastHarvestsClose = () => {
        setPastHarvests(false);
    };

    let content = "";
    if (isFetching) {
        content = <CircularProgress />;
    }
    else if (harvestData) {
        content = (
            <Grid container spacing={2}>
                {harvestData.map((harvest) => (
                <Grid item key={harvest.id} xs={12} sm={6} md={4}>
                    <HarvestListItem harvest={harvest} setIsLoggedIn={setIsLoggedIn} type={formState.type}/>
                </Grid>
                ))}
            </Grid>
        );    
    }

    return (
        <>        
            <Box>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleAddHarvest}>
                        Ürün Ekle
                    </Button>
                    <Button variant="contained" color="primary" onClick={handlePastHarvestsOpen}>
                        Geçmiş Hasatlar
                    </Button>
                </Box>
                <CustomModal text="Yeni Ürün Ekle" open={visible} close={handleHarvestModal}>
                    <HarvestForm handleSubmit={handleSubmit} formState={formState} handleChange={handleChange} pContent={pContent} field={field}/>
                </CustomModal>
                <CustomModal text="Eski Hasatlar" open={pastHarvests} close={handlePastHarvestsClose}>
                    <TableContainer component={Paper} sx={{maxHeight: "50vh", boxShadow: "none", borderRadius: 0, overflowY: "auto"}}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Ürün Adı</TableCell>
                                    <TableCell>Ekim Tarihi</TableCell>
                                    <TableCell>Hasat Tarihi</TableCell>
                                    <TableCell>Hasat Miktarı</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pastData}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CustomModal>
                {content}
            </Box>
            <CustomModal text="HATA" open={errorModalOpen} close={() => {}}>
                <Alert severity="error">Tokeninizin süresi doldu. Giriş sayfasına yönlendiriliyorsunuz. Tekrar giriş yapın!</Alert>
            </CustomModal>
        </>
    )
}


export default HarvestList;