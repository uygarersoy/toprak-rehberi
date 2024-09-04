import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function CustomModal({ text, open, close, children }) {
    return (
        <>
            <Modal
                open={open}
                onClose={close}
                disableEscapeKeyDown
                hideBackdrop
            >
                <Box 
                    sx={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '80%', md: 400 },
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                    }}
                >
                    <Typography variant="h6" component="h1" sx={{ mb: 2 }}>
                        {text}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={() => close(false)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {children}
                </Box>
            </Modal>
        </>
    );
}

export default CustomModal;