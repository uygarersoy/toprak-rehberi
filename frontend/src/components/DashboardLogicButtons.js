import { Box, Button } from "@mui/material";

function DashboardLogicButtons({ handleFieldCreation, handleLogOut, setGuidanceModal }) {
    return (
        <>
            <Box 
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    gap: 2,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
                    backgroundColor: "#f59c17"
                }}
            >
                 <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="primary" onClick={handleFieldCreation}>
                        Add New Field
                    </Button>
                </Box>

                <Box sx={{ flex: '0 1 auto', mx: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleLogOut}>
                        Log out
                    </Button>
                </Box>

                <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-start' }}>
                    <Button variant="contained" color="primary" onClick={() => setGuidanceModal(true)}>
                        Product Recommendation
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default DashboardLogicButtons;