import { Box, Button, Typography, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ExpandablePanel from "./ExpandablePanel";
import HarvestList from "./HarvestList";
import { useFetchGuidenessQuery, useRemoveFieldMutation } from "../store";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function FieldItem({ field }) {
    const [ removeField ] = useRemoveFieldMutation();
    const handleRemoveField = () => {
        removeField(field.id);
    };

    //const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);

    const { data } = useFetchGuidenessQuery(field?.neighborhoodId);
    let content = [];
    if (data) {
        //console.log(data);
        content = data.map((guide) => {
            return (                
                <TableRow key={guide.id}>
                    <TableCell>{guide.productName}</TableCell>
                    <TableCell>{guide.percentage}</TableCell>
                </TableRow>
            );
        });
    }

    /*const handleClick = () => {
        setShow(!show);
    };*/

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    /*const header = <>
        <div className="field">
            <div>
                <button onClick={handleRemoveField}><GoTrash /></button>
            </div>
            <div>
                {field.type} \/ in {field.provinceName} - {field.districtName} - {field.neighborhoodName}
            </div>
            <button onClick={handleClick}>PRODUCT RECOMMENDATION</button>
        </div>
    </>*/
    const header = (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
            <IconButton onClick={handleRemoveField}>
                <DeleteIcon />
            </IconButton>
    
            <Typography variant="body1">
                {field.type} in {field.provinceName} - {field.districtName} - {field.neighborhoodName}
            </Typography>
    
            <Button variant="contained" color="primary" onClick={(event) => {event.stopPropagation(); handleOpenModal();}}>
                PRODUCT RECOMMENDATION
            </Button>
        </Box>
    );
    
    return (
        <>
            <ExpandablePanel header={header}>
                <HarvestList field={field} />
            </ExpandablePanel>

            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="product-recommendation"
                aria-describedby="product-recommendation-details"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '80%', md: 600 },
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 24,
                    overflowY: 'auto',
                    maxHeight: '80vh'
                }}>
                    <Typography variant="h6" component="h2" 
                        sx={{
                        textAlign: 'center',
                        p: 2,
                        borderBottom: '1px solid #ddd',
                        width: '100%',
                    }}>
                        Product Recommendations
                    </Typography>
                    <TableContainer component={Paper} sx={{maxHeight: "70vh"}}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Percentage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {content}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </>
    );
}


export default FieldItem;