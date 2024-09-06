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
	
		if (name === "province") {
			updatedFields = {
				province: value,
				district: "",
				neighborhood: ""
			};
		} else if (name === "district") {
			updatedFields = {
				district: value,
				neighborhood: ""
			};
		} else if (name === "neighborhood") {
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
					label="Type"
					name="type"
					value={formState.type}
					onChange={handleChange}
					fullWidth
					autoFocus
				/>
				<FieldFormController disabled={formState.type} label="Province" value={formState.province} handleChange={handleChange} content={pContent}/>
				<FieldFormController disabled={formState.province} label="District" value={formState.district} handleChange={handleChange} content={dContent}/>
				<FieldFormController disabled={formState.district} label="Neighborhood" value={formState.neighborhood} handleChange={handleChange} content={nContent}/>
				
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={!(formState.type && formState.province && formState.district && formState.neighborhood)}
				>
					Submit
				</Button>
			</Box>
			<CustomModal text="ERROR" open={errorModalOpen} close={() => {}}>
                <Alert severity="error">Your token has expired. You are being redirected. Please login again!</Alert>
            </CustomModal>
		</>
	)
}

export default FieldForm;