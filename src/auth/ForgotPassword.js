import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../util/useLocalStorage";

const ForgotPassword = () => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [open, setOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [email, setEmail] = useState("");

    return (
        <>
            <Button variant="text" onClick={() => setOpen(true)}>
                Przypomnij hasło
            </Button>
            <Dialog open={open} fullWidth={true} onClose={() => setOpen(false)}>
                <DialogTitle textAlign="center">
                    Wprowadź email
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 2, maxWidth: 600 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOpen(false)
                            setInfoOpen(true)
                        }}
                    >
                        Potwierdź
                    </Button>
                    <Button onClick={() => setOpen(false)}>Anuluj</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={infoOpen}
                autoHideDuration={3000}
                onClose={() => setInfoOpen(false)}
            >
                <Alert
                    onClose={() => setInfoOpen(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    <AlertTitle>Sukces!</AlertTitle>
                    Nowe hasło zostało wysłane na podany mail
                </Alert>
            </Snackbar>
        </>
    );
};

export default ForgotPassword;
