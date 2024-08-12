//import { useDispatch } from "react-redux";
//import { removeField } from "../store/thunks/removeField";
//import { useState } from "react";
import { GoTrash } from "react-icons/go";
import ExpandablePanel from "./ExpandablePanel";
import HarvestList from "./HarvestList";
import { useRemoveFieldMutation } from "../store";


function FieldItem({ field }) {
    //const dispatch = useDispatch();
    const [removeField, results] = useRemoveFieldMutation();
    //const [isExpanded, setIsExpanded] = useState(false);

    const handleRemoveField = () => {
        removeField(field.id);
        //dispatch(removeField(field.id));
    };

    /*const handleShow = () => {
        setIsExpanded(!isExpanded);
    };*/

    const header = <>
        <div className="field">
            <div>
                <button onClick={handleRemoveField}><GoTrash /></button>
            </div>
            <div>
                {field.type} \/ in {field.city} - {field.state} - {field.street}
            </div>
        </div>
    </>

    return (
        <ExpandablePanel header={header}>
            <HarvestList field={field}/>
        </ExpandablePanel>
    );
}


export default FieldItem;