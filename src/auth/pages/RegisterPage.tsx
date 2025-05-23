import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../state/slices/authSlice';
import { useRegisterUser } from '../../api/user-request';
import { Alert, Card, CardContent, CardHeader, FormControl, FormHelperText, InputLabel, OutlinedInput, Snackbar, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { paths } from '@/paths';



export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      password2: '',
    },
  });


  const onSubmit = async (data: any) => {
    try {
      const { name, lastname, email, password, password2 } = data;

      const newUser = {
        name,
        lastname,
        email,
        password,
      };

      localStorage.setItem('registeredUser', JSON.stringify(newUser));
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/dashboard');

    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Ocurrió un error al registrar. Intente más tarde.',
      });
    }
  };


  const validatePassword = (value: string | undefined) => {
    const password = watch('password');
    return value === password || 'Las contraseñas no coinciden.';
  };

  return (
    <Stack spacing={4}>
      <Card>
        <CardHeader
          title="Registrarse"
          subheader={
            <Typography color="text.secondary" variant="body2">
              Ya tiene una cuenta?{" "}
              <Link component={RouterLink} to="/auth/login" variant="subtitle2">
                Iniciar Sesión
              </Link>
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
              {/* Error general */}
              {errors.root && (
                <Alert severity="error">{errors.root.message}</Alert>
              )}

              {/* Name */}
              <FormControl error={!!errors.name}>
                <InputLabel>Nombre</InputLabel>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'El nombre es requerido.' }}
                  render={({ field }) => (
                    <OutlinedInput {...field} />
                  )}
                />
                {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
              </FormControl>

              {/* Lastname */}
              <FormControl error={!!errors.lastname}>
                <InputLabel>Apellido</InputLabel>
                <Controller
                  name="lastname"
                  control={control}
                  rules={{ required: 'El apellido es requerido.' }}
                  render={({ field }) => (
                    <OutlinedInput {...field} />
                  )}
                />
                {errors.lastname && <FormHelperText>{errors.lastname.message}</FormHelperText>}
              </FormControl>

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

              {/* Confirm Password Field */}
              <FormControl error={!!errors.password2}>
                <InputLabel>Confirmar Contraseña</InputLabel>
                <Controller
                  name="password2"
                  control={control}
                  rules={{
                    required: 'Confirme la contraseña.',
                    validate: validatePassword,
                  }}
                  render={({ field }) => (
                    <OutlinedInput {...field} type="password" />
                  )}
                />
                {errors.password2 && <FormHelperText>{errors.password2.message}</FormHelperText>}
              </FormControl>

              <Button type="submit" variant="contained">
                Registrarse
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
}
