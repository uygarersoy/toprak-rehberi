import { useParams } from "react-router-dom";

function HarvestProductPage() {
    const harvestId = useParams();
    console.log(harvestId);

}

export default HarvestProductPage;