import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddFieldMutation } from "../store";

function FieldForm({ setVisibleForm }) {
	//const dispatch = useDispatch();
	const [addField, results] = useAddFieldMutation();
	const user = useSelector((state) => state.user);
	const [formState, setFormState] = useState({
		type: "",
		city: "",
		street: "",
		state: ""
	});

	const handlechange = (event) => {
		setFormState({...formState, [event.target.name]: event.target.value})
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const field = {...formState, user: {id: user.data.id}};
		//console.log(field);
		//dispatch(addField(field));
		addField(field);
		/*console.log("Form data submitted:", {
			type: event.target.type.value,
			city: event.target.city.value,
			state: event.target.state.value,
			street: event.target.street.value
		});*/
		setVisibleForm(false);
	};


	return (
		<form className="new-field-form" onSubmit={handleSubmit}>
			<div>
				<label>Type:</label>
				<input type="text" name="type" value={formState.type} onChange={handlechange}/>
			</div>
			<div>
				<label>City:</label>
				<input type="text" name="city" value={formState.city} onChange={handlechange}/>
			</div>
			<div>
				<label>State:</label>
				<input type="text" name="state" value={formState.state} onChange={handlechange}/>
			</div>
			<div>
				<label>Street:</label>
				<input type="text" name="street" value={formState.street} onChange={handlechange}/>
			</div>
			<button type="submit">Submit</button>
		</form>
	)
}

export default FieldForm;