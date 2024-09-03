import ExpandablePanel from "./ExpandablePanel";
import HarvestList from "./HarvestList";
import { useRemoveFieldMutation } from "../store";
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetLocationInformationQuery } from '../store/apis/locationApi';
import { Box,
        Typography,
        IconButton } from '@mui/material';


function FieldItem({ field }) {
    const [ removeField ] = useRemoveFieldMutation();
    const handleRemoveField = () => {
        removeField(field.id);
    };
    const { data: locationData } = useGetLocationInformationQuery(field?.neighborhoodId);
    const header = (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
            <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-start' }}>
                <IconButton onClick={handleRemoveField}>
                    <DeleteIcon />
                </IconButton>
            </Box>
            <Box sx={{ flex: '1 1 auto', textAlign: 'center' }}>
                <Typography variant="body1">
                    {field.type} in {locationData?.["province"]} - {locationData?.["district"]} - {locationData?.["neighborhood"]}
                </Typography>
            </Box>
            <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="body1">
                    Neighborhood ID: {field.neighborhoodId}
                </Typography>
            </Box>
        </Box>
    );
    
    
    return (
        <>
            <ExpandablePanel header={header}>
                <HarvestList field={field} />
            </ExpandablePanel>
        </>
    );
}


export default FieldItem;