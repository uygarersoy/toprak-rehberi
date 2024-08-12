import { GoTrash } from "react-icons/go";
import { useRemoveHarvestMutation } from "../store";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";

function HarvestListItem({ harvest }) {
    const [ removeHarvest, results ] = useRemoveHarvestMutation();
    //const navigate = useNavigate();
    const [satisfaction, setSatisfaction] = useState("");
    const [amount, setAmount] = useState(0);
    const [visible, setVisible] = useState(false);

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
        console.log(satisfaction);
        console.log(amount);
        setAmount(0);
        setSatisfaction("");
        setVisible(false);
    };
    

    const feedback = (
        <form onSubmit={handleSubmit}>
            <div>
				<label>Satisfaction:</label>
				<select id="res" onChange={(event) => setSatisfaction(event.target.value)} value={satisfaction}>
                    <option value="">Select Satisfaction</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Not bad, Not good">Not bad, Not good</option>
                    <option value="Very Bad">Very Bad</option>
                </select>
			</div>
            <div>
                <label>Amoun of the harvest</label>
                <input type="number" onChange={(event) => setAmount(parseInt(event.target.value))} value={amount || ""}></input>
            </div>
            <button type="submit">Submit</button>
        </form>
    );

    return (
        <div className="harvest-item">
            <div><button onClick={handleRemoveHarvest}><GoTrash /></button></div>
            <div><button onClick={handleHarvest}>Harvest the product</button></div>
            <div>Product: {harvest.product} - Area: {harvest.area}</div>      
            {visible && feedback}     
        </div>   
    )
}

export default HarvestListItem;