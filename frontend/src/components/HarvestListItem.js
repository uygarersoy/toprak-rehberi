import { GoTrash } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchHarvests, removeHarvest } from "../store";

function HarvestListItem({ harvest }) {
    const field = useSelector((state) => state.fields);
    const dispatch = useDispatch();

    const handleRemoveHarvest = () => {
        console.log(field);
        dispatch(removeHarvest(harvest));
//        dispatch(fetchHarvests(field));
        console.log(field);
};

    return (
        <div className="harvest-item">
            <div><button onClick={handleRemoveHarvest}><GoTrash /></button></div>
            <div>Product: {harvest.product} - Area: {harvest.area}</div>           
        </div>   
    )
}

export default HarvestListItem;