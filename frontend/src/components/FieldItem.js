import { GoTrash } from "react-icons/go";
import ExpandablePanel from "./ExpandablePanel";
import HarvestList from "./HarvestList";
import { useFetchGuidenessQuery, useRemoveFieldMutation } from "../store";
import { useState } from "react";


function FieldItem({ field }) {
    const [ removeField ] = useRemoveFieldMutation();
    const handleRemoveField = () => {
        removeField(field.id);
    };

    const [show, setShow] = useState(false);

    const { data } = useFetchGuidenessQuery(field?.neighborhoodId);
    let content;
    if (data) {
        console.log(data);
        content = data.map((guide) => {
            return (                
                <li key={guide.id}>{guide.productName} - %{guide.percentage}</li>
            );
        })
    }

    const handleClick = () => {
        setShow(!show);
    };
    const header = <>
        <div className="field">
            <div>
                <button onClick={handleRemoveField}><GoTrash /></button>
            </div>
            <div>
                {field.type} \/ in {field.provinceName} - {field.districtName} - {field.neighborhoodName}
            </div>
            <button onClick={handleClick}>PRODUCT RECOMMENDATION</button>
        </div>
    </>

    return (
        <>
            {show && <ol>{content}</ol>}
            <ExpandablePanel header={header}>
                <HarvestList field={field} />
            </ExpandablePanel>
        </>
    );
}


export default FieldItem;