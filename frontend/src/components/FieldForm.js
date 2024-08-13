import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddFieldMutation, useFetchDistrictsQuery, useFetchNeighborhoodsQuery, useFetchProvincesQuery } from "../store";

function FieldForm({ setVisibleForm }) {
	const [addField, results] = useAddFieldMutation();
	const user = useSelector((state) => state.user);
	const [formState, setFormState] = useState({
		type: "",
		province: "",
		provinceId: "",
		district: "",
		districtId: "",
		neighborhood: "",
		neighborhoodId: ""
	});
	
	const { data: provinceData, isLoading: pIsLoading, error: pError } = useFetchProvincesQuery();
	const { data: districtData, isLoading: dIsloading, error: dError } = useFetchDistrictsQuery(formState.provinceId, {skip: !formState.provinceId});
	const {data: neighborhoodData, isLoading: nIsLoading, error: nError} = useFetchNeighborhoodsQuery(formState.district, {skip: !formState.districtId});
	let pContent, dContent, nContent;

	if (provinceData) {
		pContent = provinceData.map((province) => {
			return <option key={province.id} value={province.id}>{province.provinceName}</option>;
		})
	}

	if (districtData) {
		dContent = districtData.map((district) => {
			return <option key={district.id} value={district.id}>{district.districtName}</option>;
		})
	}


	if (neighborhoodData) {
		nContent = neighborhoodData.map((neighborhood) => {
			return <option key={neighborhood.id} value={neighborhood.id}>{neighborhood.neighborhoodName}</option>;
		})
	}

	const handleChange = (event) => {
		const { name, value } = event.target; 
		let updatedFields = {[name]: value};
		if (name === "province") {
//			const selectedProvince = provinceData.find(province => province.id === value);
			updatedFields = {
				...updatedFields,
				provinceId: value,
//				province: selectedProvince?.province || "",
				districtId: "",
				district: "",
				neighborhoodId: "",
				neighborhood: ""
			};
		}
		else if (name === "district") {
//			const selectedDistrict = districtData.find(district => district.id === value);
			updatedFields = {
				...updatedFields,
				districtId: value,
				//district: selectedDistrict?.district || "",*/
				neighborhoodId: "",
				neighborhood: ""
			};
		}
		else if (name === "neighborhood") {
		//	const selectedNeighborhood = neighborhoodData.find(neighborhood => neighborhood.id === value);
			updatedFields = {
				...updatedFields,
				neighborhoodId: value,
				//neighborhood: selectedNeighborhood?.neighborhood || ""
			};
		}
		setFormState((previousState) => ({
			...previousState,
			...updatedFields
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const field = {type: formState.type, 
			province: formState.province, 
			district: formState.district, 
			neighborhood: formState.neighborhood,
			user: {id: user.data.id}};

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