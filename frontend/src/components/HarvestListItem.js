import { GoTrash } from "react-icons/go";
import { useAddFeedBackMutation, useRemoveHarvestMutation, useUpdateFractionsMutation } from "../store";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";

function HarvestListItem({ harvest }) {
    const [ removeHarvest ] = useRemoveHarvestMutation();
    //const navigate = useNavigate();
    const [satisfaction, setSatisfaction] = useState("");
    const [amount, setAmount] = useState(0);
    const [visible, setVisible] = useState(false);
    const [ addFeedback ] = useAddFeedBackMutation();
    const [ updateFraction ] = useUpdateFractionsMutation();
    //console.log("Satisfaction: ", satisfaction);

    const handleRemoveHarvest = () => {
        removeHarvest(harvest);
    };

    const handleHarvest = () => {
        setVisible(true);
        //navigate(`/harvest/${harvest.id}`, {state: {harvest}});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        /*console.log(satisfaction);
        console.log(amount);
        console.log(harvest.field);*/
        const result = {
            neighborhoodId: harvest.field.neighborhoodId,
            yield: amount,
            productId: harvest.product.id
        };
        const fraction = {
            neighborhoodId: harvest.field.neighborhoodId,
            productId: harvest.product.id,
            satisfaction: satisfaction,
            area: amount
        };
        /*console.log(fraction);
        console.log(result);*/
        addFeedback(result);
        updateFraction(fraction);
        setAmount(0);
        setSatisfaction("");
        setVisible(false);
        removeHarvest(harvest);
    };
    

    const feedback = (
        <form onSubmit={handleSubmit}>
            <div>
				<label>Satisfaction:</label>
				<select id="res" onChange={(event) => setSatisfaction(parseInt(event.target.value))} value={satisfaction}>
                    <option value="">Select Satisfaction</option>
                    <option value={3}>Very Good</option>
                    <option value={2}>Not bad, Not good</option>
                    <option value={1}>Very Bad</option>
                </select>
			</div>
            <div>
                <label>Amoun of the harvest</label>
                <input type="number" onChange={(event) => setAmount(parseInt(event.target.value))} value={amount || ""}></input>
            </div>
            <button type="submit" disabled={!(satisfaction && amount)}>Submit</button>
        </form>
    );

    return (
        <div className="harvest-item">
            <div><button onClick={handleRemoveHarvest}><GoTrash /></button></div>
            <div><button onClick={handleHarvest}>Harvest the product</button></div>
            <div>Product: {harvest.product.productName} - Area: {harvest.area}</div>      
            {visible && feedback}     
        </div>   
    )
}

export default HarvestListItem;