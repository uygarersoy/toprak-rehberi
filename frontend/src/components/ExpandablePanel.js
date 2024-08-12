import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";


function ExpandablePanel( { header, children }) {
    const [isExpanded, setIsExpanded] = useState(false);
    

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="expandable-panel">
            <div className="expandable-panel-items">
                <div className="expandable-panel-header">
                    {header}
                </div>
                <div className="expandable-panel-button" onClick={handleClick}>
                    {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
                </div>
            </div>
            {isExpanded && children}
        </div>
    );
}

export default ExpandablePanel;