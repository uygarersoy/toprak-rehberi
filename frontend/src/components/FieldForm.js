import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddFieldMutation, useFetchDistrictsQuery, useFetchNeighborhoodsQuery, useFetchProvincesQuery } from "../store";

function FieldForm({ setVisibleForm }) {
	const [addField, results] = useAddFieldMutation();
	const user = useSelector((state) => state.user);
	const [formState, setFormState] = useState({
		type: "",
		province: "",
		district: "",
		neighborhood: "",
	});
	
	
	const { data: provinceData, isLoading: pIsLoading, error: pError } = useFetchProvincesQuery();
	const selectedProvince = provinceData?.find(p => p.provinceName === formState.province);
	const { data: districtData, isLoading: dIsloading, error: dError } = useFetchDistrictsQuery(selectedProvince?.id, {skip: !selectedProvince});
	const selectedDistrict = districtData?.find(d => d.districtName === formState.district);
	const {data: neighborhoodData, isLoading: nIsLoading, error: nError} = useFetchNeighborhoodsQuery(selectedDistrict?.id, {skip: !selectedDistrict});
	let pContent, dContent, nContent;

	if (provinceData) {
		pContent = provinceData.map((province) => {
			return <option key={province.id} value={province.provinceName}>{province.provinceName}</option>;
		})
	}

	if (districtData) {
		dContent = districtData.map((district) => {
			return <option key={district.id} value={district.districtName}>{district.districtName}</option>;
		})
	}


	if (neighborhoodData) {
		nContent = neighborhoodData.map((neighborhood) => {
			return <option key={neighborhood.id} value={neighborhood.neighborhoodName}>{neighborhood.neighborhoodName}</option>;
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
			province: formState.province, 
			district: formState.district, 
			neighborhood: formState.neighborhood,
			user: {id: user.data.id}
		};
		addField(field);
		setVisibleForm(false);
	};


	return (
		<form className="new-field-form" onSubmit={handleSubmit}>
			<div>
				<label>Type:</label>
				<input type="text" name="type" value={formState.type} onChange={handleChange}/>
			</div>
			<div>
				<label>Province:</label>
				<select name="province" value={formState.province} onChange={handleChange}>
					<option value="">Select a Province</option>
					{pContent}
				</select>				
			</div>
			<div>
				<label>District:</label>
				<select name="district" value={formState.district} onChange={handleChange} disabled={!formState.province}>
					<option value="">Select a District</option>
					{dContent}
				</select>
			</div>
			<div>
				<label>Neighborhood:</label>
				<select name="neighborhood" value={formState.neighborhood} onChange={handleChange} disabled={!formState.district}>
					<option value="">Select a Neighborhood</option>
					{nContent}
				</select>
			</div>
			<button type="submit">Submit</button>
		</form>
	)
}

export default FieldForm;