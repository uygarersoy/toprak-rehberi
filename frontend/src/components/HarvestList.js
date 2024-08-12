import { useSelector } from "react-redux";
import { useState } from "react";
import { useAddHarvestMutation, useFetchFieldsQuery, useFetchHarvestsQuery } from "../store";
import HarvestListItem from "./HarvestListItem";

function HarvestList({ field }) {
    //const dispatch = useDispatch();
    //const { data, isLoading, error } = useSelector((state) => state.harvests);
    const { data, isFetching, isLoading, error } = useFetchHarvestsQuery(field);
    const [ addHarvest, resultsHarvest ] = useAddHarvestMutation();
    const user = useSelector((state) => state.user);
    //const { fieldData, isFetchingFields, errorFields } = useFetchFieldsQuery(user.data);
    const [visible, setVisible] = useState(false);
    const [formState, setFormState] = useState({
        product: "",
        area: ""
    });

    const handleChange = (event) => {
		setFormState({...formState, [event.target.name]: event.target.value})
	};

    const handleSubmit = (event) => {
        event.preventDefault();
        const harvest = {...formState, field: field};
        addHarvest(harvest);
        //fetchFields(user.data);
        //dispatch(addHarvest(harvest));
        //dispatch(fetchFields(user.data));
        setVisible(false);
    };

    /*useEffect(() => {
        dispatch(fetchHarvests(field));
        console.log(field.harvest);
    }, [dispatch, data.length]);*/

    const handleAddHarvest = () => {
        setVisible(true);
    };

    const harvestForm = (
        <form className="new-field-form" onSubmit={handleSubmit}>
			<div>
				<label>Product:</label>
				<input type="text" name="product" value={formState.product} onChange={handleChange}/>
			</div>
			<div>
				<label>Area:</label>
				<input type="text" name="area" value={formState.area} onChange={handleChange}/>
			</div>
			<button type="submit">Submit</button>
		</form>
    );

    let content = "";
    if (isFetching) {
        content = <div>Loading harvest data...</div>;
    }
    else if (error) {
        content = <div>Error fetching harvest data...</div>;
    }
    else if (!data) {
        content = <div>no data at the moment</div>;
    }
    else {
        content = data.map((harvest) => {
            return <HarvestListItem key={harvest.id} harvest={harvest}/>;
        });    
    }

    return (
        <div className="harvest-item">
            <div>
                <button onClick={handleAddHarvest}>Add a harvest</button>
            </div>
            <div>
                {visible && harvestForm}
            </div>
                {content}
        </div>
    )
}


export default HarvestList;