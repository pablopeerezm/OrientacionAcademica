import { Box, Button } from "@mui/material";
import { Header } from "../components/Header";
import { Height } from "@mui/icons-material";
import { Footer } from "../components/Footer";
import { LoginDialog, SigninDialog } from "../components/Dialog";
import { useState } from "react";

export function Home() {
    const [dialogLoginIsVisible, setDialogLoginIsVisible] = useState<boolean>(false)
    const [dialogSigninIsVisible, setDialogSigninIsVisible] = useState<boolean>(false)
    function handleLogin() {
        setDialogLoginIsVisible(true)
    }
    function handleSignin() {
        setDialogSigninIsVisible(true)
    }
    return (
        <Box sx={{display:'flex',
            flexDirection: 'column',
            justifyContent:'space-between',
            height: '80vh',
            width: '100%',
            // padding:2

        }}>
            <Header/>
            <Box sx={{textAlign:'center',
                // flex:1
            }}>
                Bienvenido a la página principal
                <br/>
                Por favor, regístrese o inicie sesión
            </Box>
            <Box sx={{ display:'flex',
                    gap:2,
                    width:'100%'
                    }}>
                <Button  
                    variant="contained" 
                    color="warning" 
                    onClick={handleLogin}
                    // onClick={() => setDialogLogOutIsVisible(true)}
                    sx={{display:'flex', /*justifyContent:'flex-start',*/ width:'50%'}}>
                    Iniciar sesion
                </Button>
                <LoginDialog openDialog={dialogLoginIsVisible} setOpenDialog={setDialogLoginIsVisible} />

                <Button variant="contained" 
                    color="warning" 
                    onClick={handleSignin}
                    sx={{display:'flex', width:'50%'}}>
                    Registrarse
                </Button>
                <SigninDialog openDialog={dialogSigninIsVisible} setOpenDialog={setDialogSigninIsVisible} />

            </Box>   
            <Footer/>
        </Box>
        
    )
}