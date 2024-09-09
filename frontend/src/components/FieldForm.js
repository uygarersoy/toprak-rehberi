import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddFieldMutation, useFetchDistrictsQuery, useFetchNeighborhoodsQuery, useFetchProvincesQuery } from "../store";
import { Box, MenuItem, Alert, Button, TextField } from '@mui/material';
import FieldFormController from "./FieldFormController";
import CustomModal from "./CustomModal";
import useTokenValidation from "../hooks/tokenValidation";

function FieldForm({ setVisibleForm, setIsLoggedIn }) {
	const [ errorModalOpen, setErrorModalOpen ] = useState(false);
	const [ addField , {error: addFieldError}] = useAddFieldMutation();
	const user = useSelector((state) => state.user);
	const [formState, setFormState] = useState({
		type: "",
		province: "",
		district: "",
		neighborhood: "",
	});
	
	
	const { data: provinceData, error: pError } = useFetchProvincesQuery();
	const selectedProvince = provinceData?.find(p => p.provinceName === formState.province);
	const { data: districtData, error: dError } = useFetchDistrictsQuery(selectedProvince?.id, {skip: !selectedProvince});
	const selectedDistrict = districtData?.find(d => d.districtName === formState.district);
	const {data: neighborhoodData, error: nError} = useFetchNeighborhoodsQuery(selectedDistrict?.id, {skip: !selectedDistrict});
	const selectedNeighborhood = neighborhoodData?.find(n => n.neighborhoodName === formState.neighborhood);
	let pContent, dContent, nContent;

	if (provinceData) {
		pContent = provinceData.map((province) => {
			return <MenuItem key={province.id} value={province.provinceName}>{province.provinceName}</MenuItem>;
		})
	}

	if (districtData) {
		dContent = districtData.map((district) => {
			return <MenuItem key={district.id} value={district.districtName}>{district.districtName}</MenuItem>;
		})
	}


	if (neighborhoodData) {
		nContent = neighborhoodData.map((neighborhood) => {
			return <MenuItem key={neighborhood.id} value={neighborhood.neighborhoodName}>{neighborhood.neighborhoodName}</MenuItem>;
		})
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
		} else {
			updatedFields = { [name]: value };
		}
	
		setFormState((previousState) => ({
			...previousState,
			...updatedFields
		}));
	};
	

	const handleSubmit = (event) => {
		event.preventDefault();
		const field = {
			type: formState.type,
			neighborhoodId: selectedNeighborhood.id,
			user: {id: user.data.id}
		};
		addField(field);
		setVisibleForm(false);
	};

	useTokenValidation(addFieldError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(pError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(dError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(nError, setIsLoggedIn, setErrorModalOpen);


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
				<TextField
					label="Arazi Tipi"
					name="type"
					value={formState.type}
					onChange={handleChange}
					fullWidth
					autoFocus
				/>
				<FieldFormController disabled={formState.type} label="Il" value={formState.province} handleChange={handleChange} content={pContent}/>
				<FieldFormController disabled={formState.province} label="Ilçe" value={formState.district} handleChange={handleChange} content={dContent}/>
				<FieldFormController disabled={formState.district} label="Mahalle" value={formState.neighborhood} handleChange={handleChange} content={nContent}/>
				
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={!(formState.type && formState.province && formState.district && formState.neighborhood)}
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

export default FieldForm;