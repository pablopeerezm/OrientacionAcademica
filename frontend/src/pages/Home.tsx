import { Box, Button } from "@mui/material";
import { Header } from "../components/Header";
import { Height } from "@mui/icons-material";
import { Footer } from "../components/Footer";
import { LoginDialog, SigninDialog } from "../components/Dialog";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "../api/axios";
import {AxiosError, isAxiosError} from 'axios';
import api from "../api/axios";
// import axios from './api/axios'

export function Home() {
    // const [email, setEmail] = useState<string>('')
    // const [password, setPassword] = useState<string>('')
    
    const navigate = useNavigate();
    const [userData, setUserData] = useState<{token: string, role: string} | null>(null)
    const [dialogLoginIsVisible, setDialogLoginIsVisible] = useState<boolean>(false)
    const [dialogSigninIsVisible, setDialogSigninIsVisible] = useState<boolean>(false)
    // function handleLogin() {
    //     setDialogLoginIsVisible(true)
    // }
    const handleLogin = async (email:string, password: string) => {
        api
            .post("/auth/login", {email, password})
            .then((response) => {
                const data = response.data;
                if (response.status === 200) {
                // alert(`Login exitoso: ${data.token} ${data.role}`)
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("role", data.role)
                localStorage.setItem("email", email)
                alert(`Login exitoso: ${localStorage.role} ${data.token} ${data.role} ${email}`)
                if (localStorage.role === 'admin') {
                    navigate('/admin-profile');  // Redirigir a AdminProfile
                    // alert("aqui")
                  } else if (localStorage.role === 'alumno') {
                    navigate('/user-profile');  // Redirigir a UserProfile
                  } else if (localStorage.role === 'orientador') {
                    navigate('/orientador-profile');  // Redirigir a OrientadorProfile
                  }

                }
        //         const data = response.data;
        //         alert(data)
            }).catch((error) => {
                if (error.response) {
                    console.error("Error en la respuesta:", error.response);
                    alert(`Error en la respuesta: ${error.response.data.error}`);
                  } else if (error.request) {
                    console.error("Error en la solicitud:", error.request);
                    alert('No se recibió respuesta del servidor');
                  } else {
                    console.error("Error desconocido:", error.message);
                    alert(`Error desconocido: ${error.message}`);
                  }
            })
        // try {axios.post('/auth/login', {email, password})}
        // catch(error) {
        //     alert("error")
        // }
        // try {
        //     const response = await axios.post('/auth/login', {email, password});
        //     alert(response)
        //     const data = await response;
        //     // alert(response)

        //     const {role, token} = response.data;
        //     // alert(response.data)
        //     localStorage.setItem('token', token);
        //     localStorage.setItem('role', role);
            // if (role === 'admin') {
            //     navigate('/admin-profile');  // Redirigir a AdminProfile
            //     alert("aqui")
            //   } else if (role === 'alumno') {
            //     navigate('/user-profile');  // Redirigir a UserProfile
            //   } else if (role === 'orientador') {
            //     navigate('/orientador-profile');  // Redirigir a OrientadorProfile
            //   }
        // } catch(error: unknown) {
        //     if (isAxiosError(error)) {
        //     console.error('Error al iniciar sesión:', error.response?.data || error.message);

        //     } else {
        //         alert('Credenciales incorrectas');

        //     }
        // }
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
                    onClick={() => setDialogLoginIsVisible(true)}
                    // onClick={() => setDialogLogOutIsVisible(true)}
                    sx={{display:'flex', /*justifyContent:'flex-start',*/ width:'50%'}}>
                    Iniciar sesion
                </Button>
                <LoginDialog open={dialogLoginIsVisible} onClose={() => setDialogLoginIsVisible(false)} onLogin={handleLogin} />

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