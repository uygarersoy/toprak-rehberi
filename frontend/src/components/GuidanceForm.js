import { useState } from "react";
import { useFetchDistrictsQuery, useFetchNeighborhoodsQuery, useFetchProvincesQuery } from "../store";
import { Box, Alert, Button } from '@mui/material';
import LandAdditionFormController from "./LandAdditionFormController";
import CustomModal from "./CustomModal";
import useTokenValidation from "../hooks/tokenValidation";

function GuidanceForm({ setIsLoggedIn, setNeighborhoodId, setSeason, handleGuidanceSubmit }) {
	const [ errorModalOpen, setErrorModalOpen ] = useState(false);
	const [formState, setFormState] = useState({
		province: "",
		district: "",
		neighborhood: "",
		season: ""
	});

	const { data: provinceData, error: provinceError } = useFetchProvincesQuery();
	const selectedProvince = provinceData?.find(province => province.provinceName === formState.province);
	const { data: districtData, error: districtError } = useFetchDistrictsQuery(selectedProvince?.id, {skip: !selectedProvince});
	const selectedDistrict = districtData?.find(district => district.districtName === formState.district);
	const {data: neighborhoodData, error: neighborhoodError} = useFetchNeighborhoodsQuery(selectedDistrict?.id, {skip: !selectedDistrict});
	const selectedNeighborhood = neighborhoodData?.find(neighborhood => neighborhood.neighborhoodName === formState.neighborhood);

	const seasons = ["KIŞ", "İLKBAHAR", "YAZ", "SONBAHAR"];
	let provinceContent = [];
	let districtContent = [];
	let neighborhoodContent = [];

	if (provinceData) {
		provinceContent = provinceData.map(province => province.provinceName);
	}

	if (districtData) {
		districtContent = districtData.map(district => district.districtName);
	}

	if (neighborhoodData) {
		neighborhoodContent = neighborhoodData.map(neighborhood => neighborhood.neighborhoodName)
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		let updatedFormState = {};
	
		if (name === "il") {
			updatedFormState = {
				province: value,
				district: "",
				neighborhood: ""
			};
		} else if (name === "ilçe") {
			updatedFormState = {
				district: value,
				neighborhood: ""
			};
		} else if (name === "mahalle") {
			updatedFormState = {
				neighborhood: value
			};
		} else if (name === "mevsim") {
			updatedFormState = {
				season: value
			}
		}

		setFormState((previousState) => ({
			...previousState,
			...updatedFormState
		}));
	};
	

	const handleSubmit = (event) => {
		event.preventDefault();
		setNeighborhoodId(selectedNeighborhood.id);
		setSeason(formState.season);
		handleGuidanceSubmit();
	};

    useTokenValidation(provinceError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(districtError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(neighborhoodError, setIsLoggedIn, setErrorModalOpen);

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
				<LandAdditionFormController disabled={true} label="Il" value={formState.province} handleChange={handleChange} content={provinceContent}/>
				<LandAdditionFormController disabled={formState.province} label="Ilçe" value={formState.district} handleChange={handleChange} content={districtContent}/>
				<LandAdditionFormController disabled={formState.district} label="Mahalle" value={formState.neighborhood} handleChange={handleChange} content={neighborhoodContent}/>
				<LandAdditionFormController disabled={formState.neighborhood} label="Mevsim" value={formState.season} handleChange={handleChange} content={seasons}/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={!(formState.province && formState.district && formState.neighborhood && formState.season)}
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