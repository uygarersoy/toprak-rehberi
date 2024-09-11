import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddFieldMutation, useFetchDistrictsQuery, useFetchFieldTypesQuery, useFetchNeighborhoodsQuery, useFetchProvincesQuery } from "../store";
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
		size: ""
	});

	const { data: fieldTypeData, error: fieldTypeError } = useFetchFieldTypesQuery();
	const { data: provinceData, error: pError } = useFetchProvincesQuery({ skip: !fieldTypeData });
	const selectedProvince = provinceData?.find(p => p.provinceName === formState.province);
	const { data: districtData, error: dError } = useFetchDistrictsQuery(selectedProvince?.id, {skip: !selectedProvince});
	const selectedDistrict = districtData?.find(d => d.districtName === formState.district);
	const {data: neighborhoodData, error: nError} = useFetchNeighborhoodsQuery(selectedDistrict?.id, {skip: !selectedDistrict});
	const selectedNeighborhood = neighborhoodData?.find(n => n.neighborhoodName === formState.neighborhood);
	let typeContent, pContent, dContent, nContent;

	if (fieldTypeData) {
		typeContent = fieldTypeData.map((type, idx) => {
			return <MenuItem key={idx} value={type}>{type}</MenuItem>
		})
		typeContent = typeContent.concat(<MenuItem key={typeContent.length} value="DİĞER">DİĞER</MenuItem>)
	}

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
		} else if (name === "arazi tipi"){
			updatedFields = { type: value };
		} else {
			updatedFields = { [name]: value};
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
			user: user.data,
			availableArea: formState.size
		};
		addField(field);
		setVisibleForm(false);
	};

	useTokenValidation(addFieldError, setIsLoggedIn, setErrorModalOpen);
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
				<FieldFormController disabled={true} label="Arazi Tipi" value={formState.type} handleChange={handleChange} content={typeContent}/>
				<FieldFormController disabled={formState.type} label="Il" value={formState.province} handleChange={handleChange} content={pContent}/>
				<FieldFormController disabled={formState.province} label="Ilçe" value={formState.district} handleChange={handleChange} content={dContent}/>
				<FieldFormController disabled={formState.district} label="Mahalle" value={formState.neighborhood} handleChange={handleChange} content={nContent}/>

				<TextField
					disabled={!formState.neighborhood}
					label="Arazi boyutu"
					name="size"
					type="number"
                    InputProps={{ inputProps: { min: 1, max: 500000} }}
					value={formState.size}
					onChange={handleChange}
					fullWidth					
				/>

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