import { useState } from "react";
import { useFetchDistrictsQuery, useFetchFieldTypesQuery, useFetchNeighborhoodsQuery, useFetchProvincesQuery } from "../store";
import { Box, Alert, Button } from '@mui/material';
import FieldFormController from "./FieldFormController";
import CustomModal from "./CustomModal";
import useTokenValidation from "../hooks/tokenValidation";

function GuidanceForm({ setIsLoggedIn, setNeighborhoodId, handleGuidanceSubmit }) {
	const [ errorModalOpen, setErrorModalOpen ] = useState(false);
	const [formState, setFormState] = useState({
		province: "",
		district: "",
		neighborhood: "",
	});

	const { data: fieldTypeData, error: fieldTypeError } = useFetchFieldTypesQuery();
	const { data: provinceData, error: pError } = useFetchProvincesQuery({ skip: !fieldTypeData });
	const selectedProvince = provinceData?.find(p => p.provinceName === formState.province);
	const { data: districtData, error: dError } = useFetchDistrictsQuery(selectedProvince?.id, {skip: !selectedProvince});
	const selectedDistrict = districtData?.find(d => d.districtName === formState.district);
	const {data: neighborhoodData, error: nError} = useFetchNeighborhoodsQuery(selectedDistrict?.id, {skip: !selectedDistrict});
	const selectedNeighborhood = neighborhoodData?.find(n => n.neighborhoodName === formState.neighborhood);
	//let pContent, dContent, nContent;
	let pContent = [];
	let dContent = [];
	let nContent = [];

	if (provinceData) {
		/*pContent = provinceData.map((province) => {
			return <MenuItem key={province.id} value={province.provinceName}>{province.provinceName}</MenuItem>;
		})*/
		pContent = provinceData.map(province => province.provinceName);

	}

	if (districtData) {
		/*dContent = districtData.map((district) => {
			return <MenuItem key={district.id} value={district.districtName}>{district.districtName}</MenuItem>;
		})*/
		dContent = districtData.map(district => district.districtName);
	}

	if (neighborhoodData) {
		/*nContent = neighborhoodData.map((neighborhood) => {
			return <MenuItem key={neighborhood.id} value={neighborhood.neighborhoodName}>{neighborhood.neighborhoodName}</MenuItem>;
		})*/
		nContent = neighborhoodData.map(neighborhood => neighborhood.neighborhoodName)

	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		let updatedFields = {};
	
		if (name === "il") {
			updatedFields = {
				province: value,
				district: "",
				neighborhood: ""
			};
		} else if (name === "ilçe") {
			updatedFields = {
				district: value,
				neighborhood: ""
			};
		} else if (name === "mahalle") {
			updatedFields = {
				neighborhood: value
			};
		} 

		setFormState((previousState) => ({
			...previousState,
			...updatedFields
		}));
	};
	

	const handleSubmit = (event) => {
		event.preventDefault();
		setNeighborhoodId(selectedNeighborhood.id);
		handleGuidanceSubmit();
	};

    useTokenValidation(pError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(dError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(nError, setIsLoggedIn, setErrorModalOpen);
	useTokenValidation(fieldTypeError, setIsLoggedIn, setErrorModalOpen);

	return (
		<>
			<Box
				component="form"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					width: '100%',
					maxWidth: 500,
					margin: '0 auto',
					overflow: 'auto',
					padding: 2,
					boxSizing: 'border-box',
				}}
				onSubmit={handleSubmit}
			>
				<FieldFormController disabled={true} label="Il" value={formState.province} handleChange={handleChange} content={pContent}/>
				<FieldFormController disabled={formState.province} label="Ilçe" value={formState.district} handleChange={handleChange} content={dContent}/>
				<FieldFormController disabled={formState.district} label="Mahalle" value={formState.neighborhood} handleChange={handleChange} content={nContent}/>
				
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={!(formState.province && formState.district && formState.neighborhood)}
				>
					Gönder
				</Button>
			</Box>
			<CustomModal text="HATA" open={errorModalOpen} close={() => {}}>
				<Alert severity="error">Tokeninizin süresi doldu. Giriş sayfasına yönlendiriliyorsunuz. Tekrar giriş yapın!</Alert>
            </CustomModal>
		</>
	)
}

export default GuidanceForm;