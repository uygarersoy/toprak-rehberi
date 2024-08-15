import { GoTrash } from "react-icons/go";
import ExpandablePanel from "./ExpandablePanel";
import HarvestList from "./HarvestList";
import { useRemoveFieldMutation } from "../store";


function FieldItem({ field }) {
    const [removeField, results] = useRemoveFieldMutation();
    const handleRemoveField = () => {
        removeField(field.id);
    };
    const header = <>
        <div className="field">
            <div>
                <button onClick={handleRemoveField}><GoTrash /></button>
            </div>
            <div>
                {field.type} \/ in {field.provinceName} - {field.districtName} - {field.neighborhoodName}
            </div>
            <button>PRODUCT RECOMMENDATION</button>
        </div>
    </>

    return (
        <ExpandablePanel header={header}>
            <HarvestList field={field}/>
        </ExpandablePanel>
    );
}


export default FieldItem;