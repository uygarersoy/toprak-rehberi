//import { useSelector } from "react-redux";
import { useState } from "react";
import { useAddHarvestMutation, useFetchHarvestsQuery, useFetchProductsQuery } from "../store";
import HarvestListItem from "./HarvestListItem";

function HarvestList({ field }) {
    const { data: harvestData, isFetching, error } = useFetchHarvestsQuery(field);
    const [ addHarvest ] = useAddHarvestMutation();
    //const user = useSelector((state) => state.user);
    const [visible, setVisible] = useState(false);
    const [formState, setFormState] = useState({
        type: "",
        product: "",
        area: ""
    });

    const { data: productData} = useFetchProductsQuery(formState.type, {skip: !formState.type});
    let pContent;

    if (productData) {
        pContent = productData.map((product) => {
            return <option key={product.id} value={product.productName}>{product.productName}</option>;
        });
    }

    const handleChange = (event) => {
		setFormState({...formState, [event.target.name]: event.target.value})
	};

    const handleSubmit = (event) => {
        event.preventDefault();
        const harvest = {
            area: formState.area,
            product: productData?.find(p => p.productName === formState.product), 
            field: field
        };
        addHarvest(harvest);
        setFormState({type: "", product: "", area: ""});
        setVisible(false);
    };

    const handleAddHarvest = () => {
        setVisible(true);
    };

    const harvestForm = (
        <form className="new-field-form" onSubmit={handleSubmit}>
            <div>
				<label>Product Type:</label>
				<select name="type" value={formState.type} onChange={handleChange}>
					<option value="">Select a Type</option>
					<option value="MEYVE">Meyve</option>
					<option value="SEBZE">Sebze</option>
					<option value="SÜS BİTKİSİ">Süs Bitkileri</option>
					<option value="TAHIL">Tahıl</option>
				</select>				
			</div>
			<div>
				<label>Product:</label>
                <select name="product" value={formState.product} onChange={handleChange} disabled={!formState.type}>
                    <option value="">Select a Product</option>
                    {pContent}
                </select>
			</div>
			<div>
				<label>Area:</label>
				<input type="number" name="area" value={formState.area} onChange={handleChange} disabled={!formState.product}/>
			</div>
			<button type="submit" disabled={!(formState.type && formState.product && formState.area)}>Submit</button>
		</form>
    );

    let content = "";
    if (isFetching) {
        content = <div>Loading harvest data...</div>;
    }
    else if (error) {
        content = <div>Error fetching harvest data...</div>;
    }
    else if (!harvestData) {
        content = <div>no data at the moment</div>;
    }
    else {
        content = harvestData.map((harvest) => {
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