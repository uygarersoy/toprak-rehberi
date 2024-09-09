import YardIcon from '@mui/icons-material/Yard';
import { Grid, Typography } from "@mui/material";

function DashboardHeader() {
    //, backgroundColor: "#f59c17"
    return (
        <>
            <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Grid item xs="auto">
                    <YardIcon sx={{ height: "40px", width: "auto", color: "#077437" }} />
                </Grid>
                <Grid item xs>
                    <Typography variant="h4" component="h1" align="center" sx={{ color: "#077437" }}>
                        ARAZİLERİM
                    </Typography>
                </Grid>
                <Grid item xs="auto">
                    <YardIcon sx={{ height: "40px", width: "auto", color: "#077437" }} />
                </Grid>
            </Grid>
        </>
    );
}

export default DashboardHeader;