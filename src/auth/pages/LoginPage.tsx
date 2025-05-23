import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert, Card, CardContent, CardHeader, FormControl, FormHelperText, InputLabel, OutlinedInput, Snackbar, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { paths } from "@/paths";
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

export default function LoginPage() {
     const navigate = useNavigate();
     const {
          control,
          handleSubmit,
          setError,
          formState: { errors },
     } = useForm({
          defaultValues: {
               email: '',
               password: '',
          },
     });

     const onSubmit = async (data: { email: string; password: string }) => {
          try {
               const stored = localStorage.getItem('registeredUser');
               if (!stored) {
                    setError('root', { type: 'manual', message: 'Correo o contraseña incorrectos.' });
                    return;
               }

               const user = JSON.parse(stored);

               if (data.email !== user.email || data.password !== user.password) {
                    setError('root', {
                         type: 'manual',
                         message: 'Correo o contraseña incorrectos.',
                    });
                    return;
               }

               localStorage.setItem('user', JSON.stringify(user));
          
               navigate('/dashboard');
          } catch (error: any) {
               setError('root', { type: 'manual', message: error.message || 'Error inesperado' });
          }
     };

     return (
          <Stack spacing={4}>
               <Card>
                    <CardHeader
                         title="Iniciar Sesión"
                         subheader={
                              <Typography color="text.secondary" variant="body2">
                                   No tiene una cuenta? <Link component={RouterLink} to="/auth/register" variant="subtitle2">Registrarse</Link>
                              </Typography>
                         }
                         action={
                              <Link
                                   component={RouterLink}
                                   to={paths.home}
                                   color="text.primary"
                                   underline="none"
                                   sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                              >
                                   <ArrowLeftIcon fontSize="small" />
                                   <Typography variant="subtitle2">Pantalla de Inicio</Typography>
                              </Link>
                         }
                    />

                    <CardContent>
                         <form onSubmit={handleSubmit(onSubmit)}>
                              <Stack spacing={2}>
                                   {/* Display form-wide error message if any */}
                                   {errors.root && (
                                        <Alert severity="error">{errors.root.message}</Alert>
                                   )}

                                   {/* Email Field */}
                                   <FormControl error={!!errors.email}>
                                        <InputLabel>Correo</InputLabel>
                                        <Controller
                                             name="email"
                                             control={control}
                                             rules={{
                                                  required: 'El correo es requerido.',
                                                  pattern: {
                                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                       message: 'Correo electrónico no válido.',
                                                  },
                                             }}
                                             render={({ field }) => (
                                                  <OutlinedInput {...field} type="email" />
                                             )}
                                        />
                                        {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                                   </FormControl>

                                   {/* Password Field */}
                                   <FormControl error={!!errors.password}>
                                        <InputLabel>Contraseña</InputLabel>
                                        <Controller
                                             name="password"
                                             control={control}
                                             rules={{ required: 'La contraseña es requerida.' }}
                                             render={({ field }) => (
                                                  <OutlinedInput {...field} type="password" />
                                             )}
                                        />
                                        {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
                                   </FormControl>

                                   <Button type="submit" variant="contained">
                                        Iniciar Sesión
                                   </Button>
                              </Stack>
                         </form>
                    </CardContent>
               </Card>
          </Stack >
     );
}
