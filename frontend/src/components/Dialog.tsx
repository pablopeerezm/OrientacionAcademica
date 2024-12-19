
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

import * as yup from 'yup'
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import React from "react"

interface CreateDialogProps {
  openDialog: boolean; 
  setOpenDialog: (arg: boolean) => void;
}
interface LoginProps {
  open: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}
interface SigninDialogProps {
  openDialog: boolean; 
  setOpenDialog: (arg: boolean) => void;
}
interface ProfileUserDialogProps {
  openDialog: boolean; 
  setOpenDialog: (arg: boolean) => void;
  user: string;
}
interface EditCitaDialogProps {
  open: boolean;
  handleClose: () => void;
  cita: any;
  onSave: (updatedCita: {fecha: string, hora:string}) => void;
}

export function ProfileUserDialog({openDialog, setOpenDialog, user}:ProfileUserDialogProps) {
  const navigate = useNavigate()
  function handleLogOut() {
    navigate('/')
    sessionStorage.clear();
    setOpenDialog(false)
  }
  const handleClose = () => {
    setOpenDialog(false)
  }
  return(
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle align="center"> Perfil</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hola, {user}
            <br/>
          </DialogContentText>
          <Button variant="contained" 
                  color="warning" 
                  type="submit" 
                  onClick={handleLogOut}
                  style={{display:'flex', width:'100%'}}>
            Cerrar sesion
          </Button>
        </DialogContent>
      </Dialog>
  );
}
export function LoginDialog({open, onClose, onLogin}:LoginProps) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const handleLogin = () => {
    onLogin(email, password);
  }
  const validationSchema = yup.object({
    email: yup.string().email('Ingrese un email válido').required('El nombre de usuario(email) es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria')
              .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema:validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        await onLogin(values.email, values.password);
        resetForm();
        onClose();
      } catch (error) {
        alert('Error en el login')
        console.error("Error en el login", error)
      }
    },
  });
    return(
      <Dialog open={open} onClose={onClose}>
        <DialogTitle> Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingresa tu email y contraseña para continuar
          </DialogContentText>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box sx={{display:'flex', justifyContent:'space-between', mt:2}}>
              <Button variant="contained" 
                      color="warning" 
                      type="submit"
              >
                Iniciar sesión
              </Button>
              <Button variant="contained" 
                      color="warning" 
                      onClick={onClose}
              >
                Cancelar
              </Button>
            </Box>
          </form> 
        </DialogContent>
      </Dialog>
    );
}
export function SigninDialog({openDialog, setOpenDialog}:SigninDialogProps) {
  
  const handleClose = () => {
    setOpenDialog(false)
  }
  const validationSchema = yup.object({
    email: yup.string().email('Ingrese un email válido').required('El nombre de usuario(email) es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria')
              .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema:validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        const {email, password} = values;
        // const response = await api.post('/auth/register', {
        const response = await api.post('/auth/register', {
          email,
          password,
          role: 'alumno'
        });
        alert('Registro de alumno completado con éxito')
        resetForm();
        setOpenDialog(false)
      } catch(error) {
        alert('Error en el registro')
      }
      // alert(JSON.stringify(values, null, 2));
      // resetForm();
      // setOpenDialog(false);
      // alert(JSON.stringify(values, null, 2));

        // const procedure: ProcedurePostDto = {clientId: clientId, name: formik.values.name, description: formik.values.description}

        // const options = {
        //   ...baseOptions,
        //   body: JSON.stringify(procedure)
        // }
        // fetch(urlDialog, options)
        // resetForm()
        // setOpenDialog(false)
    },
  });
    return(
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle> Registro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingresa tu email y crea una contraseña
          </DialogContentText>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box sx={{display:'flex', justifyContent:'space-between', mt:2}}>
              <Button variant="contained" 
                      color="warning" 
                      type="submit"
              >
                Confirmar datos
              </Button>
              <Button variant="contained" 
                      color="warning" 
                      onClick={handleClose}
              >
                Cancelar
              </Button>
            </Box>
          </form> 
        </DialogContent>
      </Dialog>
    );
}
export function CreateDialog({openDialog, setOpenDialog}:CreateDialogProps) {
  const [orientadores, setOrientadores] = useState<string[]>([]);
  const horasDisponibles = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];
  const fechaActual = new Date().toISOString().split("T")[0];
  
  useEffect(() => {
    const fetchOrientadores = async () => {
      try {
        const response = await api.get('admin/orientadores2');
        const emails = response.data.map((orientador: {email: string}) => orientador.email)
        setOrientadores(emails)
      } catch(error) {
        alert("Error al obtener orientadores para dar la cita")
      } 
    };
    fetchOrientadores();
  }, []);

  const handleClose = () => {
    setOpenDialog(false)
  }
  const validationSchema = yup.object({
    orientador: yup.string().required('Seleccionar orientador es obligatorio'),
    dia: yup.string().required('Seleccionar un día es obligatorio'),
    hora: yup.string().required('Seleccionar una hora es obligatorio'),
  })
  const formik = useFormik({
    initialValues: {orientador: '', dia: '', hora: ''},
    validationSchema:validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        const cita = {alumno_email: sessionStorage.email, orientador_email: values.orientador, 
                      fecha: values.dia, hora: values.hora}
        alert(`${sessionStorage.email} ${values.orientador} ${values.dia} ${values.hora}`)
                      await api.post('/citas/', cita, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.jwt}`
          }
        });
        alert('Cita creada correctamente')
        resetForm()
        setOpenDialog(false)
      } catch (error) {
        alert('Error al crear la cita')
      }
    },
  });
  return(
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle> Procedimiento</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Rellene los siguientes campos para concertar una cita
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth margin="dense" error={formik.touched.orientador && Boolean(formik.errors.orientador)}>
            <InputLabel>Orientador</InputLabel>
              <Select
                id="orientador"
                name="orientador"
                value={formik.values.orientador}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Orientador"
              >
                {orientadores.map((email, index) => (
                  <MenuItem key={index} value={email}>
                    {email}
                  </MenuItem>
                ))}
              </Select>
                {formik.touched.orientador && formik.errors.orientador && (
                  <Box color="error.main" mt={1}>{formik.errors.orientador}</Box>
                )}
              </FormControl>
              <TextField
                margin="dense"
                id="dia"
                name="dia"
                label="Día"
                type="date"
                value={formik.values.dia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: fechaActual,
                }}
                fullWidth
                error={formik.touched.dia && Boolean(formik.errors.dia)}
                helperText={formik.touched.dia && formik.errors.dia}
              />
              <FormControl fullWidth margin="dense" error={formik.touched.hora && Boolean(formik.errors.hora)}>
                <InputLabel>Hora</InputLabel>
                <Select
                  id="hora"
                  name="hora"
                  value={formik.values.hora}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Hora"
                >
                  {horasDisponibles.map((hora, index) => (
                    <MenuItem key={index} value={hora}>
                      {hora}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.hora && formik.errors.hora && (
                  <Box color="error.main" mt={1}>{formik.errors.hora}</Box>
                )}
              </FormControl>
                <Button variant="contained" color="warning" type="submit">Guardar</Button>
                <Button variant="contained" color="warning" onClick={handleClose}>Cancelar</Button>
              </form> 
            </DialogContent>
          </Dialog>
      );
}
export function CreateCitaOrientador({openDialog, setOpenDialog}:CreateDialogProps) {
  const [alumnos, setAlumnos] = useState<string[]>([]);
  const horasDisponibles = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];
  const fechaActual = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await api.get('admin/alumnos');
        const emails = response.data.map((alumno: {email: string}) => alumno.email)
        setAlumnos(emails)
      } catch(error) {
        alert("Error al obtener alumnos para dar la cita")
      } 
    };
    fetchAlumnos();
  }, []);

  const handleClose = () => {
    setOpenDialog(false)
  }
  const validationSchema = yup.object({
    alumno: yup.string().required('Seleccionar alumno es obligatorio'),
    dia: yup.string().required('Seleccionar un día es obligatorio'),
    hora: yup.string().required('Seleccionar una hora es obligatorio'),
  })
  const formik = useFormik({
    initialValues: {alumno: '', dia: '', hora: ''},
    validationSchema:validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        const cita = {alumno_email: values.alumno, orientador_email: sessionStorage.email, 
                      fecha: values.dia, hora: values.hora}
        alert(`${sessionStorage.email} ${values.alumno} ${values.dia} ${values.hora}`)
                      await api.post('/citas/', cita, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.jwt}`
          }
        });
        alert('Cita creada correctamente')
        resetForm()
        setOpenDialog(false)

      } catch (error) {
        alert('Error al crear la cita')
      }
    },
  });
  return(
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle> Procedimiento</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Rellene los siguientes campos para concertar una cita
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth margin="dense" error={formik.touched.alumno && Boolean(formik.errors.alumno)}>
            <InputLabel>Alumno</InputLabel>
              <Select
                id="alumno"
                name="alumno"
                value={formik.values.alumno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Alumno"
              >
                {alumnos.map((email, index) => (
                  <MenuItem key={index} value={email}>
                    {email}
                  </MenuItem>
                ))}
              </Select>
                {formik.touched.alumno && formik.errors.alumno && (
                  <Box color="error.main" mt={1}>{formik.errors.alumno}</Box>
                )}
              </FormControl>
              <TextField
                margin="dense"
                id="dia"
                name="dia"
                label="Día"
                type="date"
                value={formik.values.dia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: fechaActual,
                }}
                fullWidth
                error={formik.touched.dia && Boolean(formik.errors.dia)}
                helperText={formik.touched.dia && formik.errors.dia}
              />
              <FormControl fullWidth margin="dense" error={formik.touched.hora && Boolean(formik.errors.hora)}>
                <InputLabel>Hora</InputLabel>
                <Select
                  id="hora"
                  name="hora"
                  value={formik.values.hora}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Hora"
                >
                  {horasDisponibles.map((hora, index) => (
                    <MenuItem key={index} value={hora}>
                      {hora}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.hora && formik.errors.hora && (
                  <Box color="error.main" mt={1}>{formik.errors.hora}</Box>
                )}
              </FormControl>
                <Button variant="contained" color="warning" type="submit">Guardar</Button>
                <Button variant="contained" color="warning" onClick={handleClose}>Cancelar</Button>
              </form> 
            </DialogContent>
          </Dialog>
      );
}
export function CreateOrientadorDialog({openDialog, setOpenDialog}:CreateDialogProps) {
  const handleClose = () => {
    setOpenDialog(false)
  }
  const validationSchema = yup.object({
    email: yup.string().email('Ingrese un email válido').required('El email del orientador es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria')
              .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema:validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        const {email, password} = values;
        const response = await api.post('/auth/register', {
          email,
          password,
          role: 'orientador'
        });
        alert('Registro de orientador completado con éxito')
        resetForm();
        setOpenDialog(false)
      } catch(error) {
        alert('Error en el registro del orientador')
      }
    },
  });
  return(
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle> Procedimiento</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Rellene los siguientes campos para crear un orientador
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="dense"
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button variant="contained" color="warning" sx={{marginRight:'3px'}} type="submit">Guardar</Button>
              <Button variant="contained" color="warning" onClick={handleClose}>Cancelar</Button>
            </form> 
          </DialogContent>
        </Dialog>
      );
}
export function EditCitaDialog({open, handleClose, cita, onSave}: EditCitaDialogProps) {
  const [fecha, setFecha] = useState(cita?.fecha || '');
  const [hora, setHora] = useState(cita?.hora || '');
  const horasDisponibles = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];
  const fechaActual = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (cita) {
      setFecha(cita.fecha);
      setHora(cita.hora);
    }
  }, [cita]);

  const handleSave = () => {
    onSave({ fecha, hora });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Cita</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: fechaActual,
          }}
        />
        <Select
          id="hora"
          name="hora"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          label="Hora"
          fullWidth
        >
          {horasDisponibles.map((hora, index) => (
            <MenuItem key={index} value={hora}>
              {hora}
            </MenuItem>
          ))}
        </Select>
        <br/>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Guardar
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
