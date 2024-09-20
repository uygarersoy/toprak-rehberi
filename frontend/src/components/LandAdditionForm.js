import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Alert, Button, TextField, Snackbar, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import LandAdditionFormController from "./LandAdditionFormController";
import CustomModal from "./CustomModal";
import useTokenValidation from "../hooks/tokenValidation";
import { useAddLandMutation, useFetchDistrictsQuery, useFetchLandTypesQuery, useFetchNeighborhoodsQuery, useFetchProvincesQuery } from "../store";

function LandAdditionForm({ setLandAdditionForm, setIsLoggedIn }) {
	const [ errorModalOpen, setErrorModalOpen ] = useState(false);
	const [ addLand , {error: addLandError, isError, isSuccess}] = useAddLandMutation();
	const [landExist, setLandExist] = useState(false);
	const user = useSelector((state) => state.user);
	const [formState, setFormState] = useState({
		type: "",
		province: "",
		district: "",
		neighborhood: "",
		size: "",
		ada: "",
		parcel: "",
		name: ""
	});

	const { data: landTypeData, error: landTypeError } = useFetchLandTypesQuery();
	const { data: provinceData, error: pError } = useFetchProvincesQuery({ skip: !landTypeData });
	const selectedProvince = provinceData?.find(p => p.provinceName === formState.province);
	const { data: districtData, error: dError } = useFetchDistrictsQuery(selectedProvince?.id, {skip: !selectedProvince});
	const selectedDistrict = districtData?.find(d => d.districtName === formState.district);
	const {data: neighborhoodData, error: nError} = useFetchNeighborhoodsQuery(selectedDistrict?.id, {skip: !selectedDistrict});
	const selectedNeighborhood = neighborhoodData?.find(n => n.neighborhoodName === formState.neighborhood);
	let typeContent = [];
	let provinceContent = [];
	let districtContent = [];
	let neighborhoodContent = [];
	if (landTypeData) {
		typeContent = landTypeData.map(data => data);
		typeContent.push("DİĞER");
	}

	if (provinceData) {
		provinceContent = provinceData.map(province => province.provinceName);
	}

	if (districtData) {
		districtContent = districtData.map(district => district.districtName);
	}

	if (neighborhoodData) {
		neighborhoodContent = neighborhoodData.map(neighborhood => neighborhood.neighborhoodName)
	}

	if (isSuccess) {
		setLandAdditionForm(false);
	}

	useEffect(() => {
		if (isError) {
			setLandExist(true);
		}
	}, [isError]);


	const handleLandExistsSnackbarClose = () => {
		setLandExist(false);
	};

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
			updatedFormState = { neighborhood: value};
		} else if (name === "arazi tipi"){
			updatedFormState = { type: value };
		} else if (name === "name") {
			updatedFormState = { name: value.slice(0,30) }
		} else {
			updatedFormState = { [name]: value};
		}
	
		setFormState((previousState) => ({
			...previousState,
			...updatedFormState,
		}));
	};
	

	const handleLandAdditionSubmit = (event) => {
		event.preventDefault();
		const land = {
			type: formState.type,
			neighborhoodId: selectedNeighborhood.id,
			user: user.data,
			availableArea: formState.size,
			adaNo: formState.ada,
			parcelNo: formState.parcel,
			landName: formState.name,
			isDeleted: false
		};
		addLand(land);
	};

	useTokenValidation(addLandError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(pError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(dError, setIsLoggedIn, setErrorModalOpen);
    useTokenValidation(nError, setIsLoggedIn, setErrorModalOpen);
	useTokenValidation(landTypeError, setIsLoggedIn, setErrorModalOpen);

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
					overflowY: "auto",
					maxHeight: "75vh",
					padding: 2,
					boxSizing: 'border-box',
				}}
				onSubmit={handleLandAdditionSubmit}
			>
				<LandAdditionFormController disabled={true} label="Arazi Tipi" value={formState.type} handleChange={handleChange} content={typeContent}/>
				<LandAdditionFormController disabled={formState.type} label="Il" value={formState.province} handleChange={handleChange} content={provinceContent}/>
				<LandAdditionFormController disabled={formState.province} label="Ilçe" value={formState.district} handleChange={handleChange} content={districtContent}/>
				<LandAdditionFormController disabled={formState.district} label="Mahalle" value={formState.neighborhood} handleChange={handleChange} content={neighborhoodContent}/>

				<TextField
					disabled={!formState.neighborhood}
					label={<span>Arazi Boyutu m<sup>2</sup></span>}
					name="size"
					type="number"
                    InputProps={{ inputProps: { min: 1, max: 500000} }}
					value={formState.size}
					onChange={handleChange}
					fullWidth					
				/>
				<TextField
					disabled={!formState.size}
					label="Ada No"
					name="ada"
					type="number"
                    InputProps={{ inputProps: { min: 0, max: 100000} }}
					value={formState.ada}
					onChange={handleChange}
					fullWidth					
				/>
				<TextField
					disabled={!formState.ada}
					label="Parsel No"
					name="parcel"
					type="number"
                    InputProps={{ inputProps: { min: 0, max: 100000} }}
					value={formState.parcel}
					onChange={handleChange}
					fullWidth					
				/>
				<TextField
					disabled={!formState.parcel}
					label="Arazi İsmi"
					name="name"
					type="text"
					value={formState.name}
					onChange={handleChange}
					fullWidth					
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={!(formState.type && formState.province && 
								formState.district && formState.neighborhood &&
								formState.ada && formState.parcel && formState.name)}
				>
					Gönder
				</Button>
			</Box>
			<Snackbar
				open={landExist}
				anchorOrigin={{vertical: "top", horizontal: "center"}}
				autoHideDuration={null}
			>		
				<Alert
					severity="warning"
					action={
						<IconButton color="inherit" onClick={handleLandExistsSnackbarClose} size="medium">
							<CloseIcon />
						</IconButton>}
				>
					Ada ve Parsel no çoktan kullanılmış. Tekrar deneyin.
				</Alert>
			</Snackbar>
			<CustomModal text="HATA" open={errorModalOpen} close={() => {}}>
				<Alert severity="error">Tokeninizin süresi doldu. Giriş sayfasına yönlendiriliyorsunuz. Tekrar giriş yapın!</Alert>
            </CustomModal>
		</>
	)
}

export default LandAdditionForm;