// import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
// import { Controller, useForm } from "react-hook-form";
// import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
// import CloseIcon from '@mui/icons-material/Close';
// import React from "react";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { useNavigate } from "react-router-dom";


// type Empresa = {
//      // id: string;
//      nombre: string;
//      ruc: string;
//      telefono: string;
//      correo: string;
//      direccion: string;
//      claveFirma: string;
//      archivoFirma: string;
//      avatar: string;
// };

// function fileToBase64(file: Blob): Promise<string> {
//      return new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.readAsDataURL(file);
//           reader.onload = () => {
//                resolve(reader.result as string);
//           };
//           reader.onerror = () => {
//                reject(new Error('Error converting file to base64'));
//           };
//      });
// }

// export function CrearEmpresaDialog({ open, onClose, onCrear }: {
//      open: boolean;
//      onClose: () => void;
//      onCrear: (empresa: Empresa) => void;
// }) {
//      const navigate = useNavigate();
//      const {
//           control,
//           handleSubmit,
//           reset,
//           formState: { errors },
//           watch,
//           setValue,
//      } = useForm({
//           defaultValues: {
//                avatar: '',
//                nombre: '',
//                ruc: '',
//                telefono: '',
//                correo: '',
//                direccion: '',
//                claveFirma: '',
//                archivoFirma: '',
//           },
//      });

//      const avatarInputRef = React.useRef<HTMLInputElement>(null);
//      const archivoFirmaInputRef = React.useRef<HTMLInputElement>(null);
//      const avatar = watch('avatar');

//      const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//           const file = event.target.files?.[0];
//           if (file) {
//                const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//                if (!validTypes.includes(file.type)) {
//                     alert('Solo se permiten imágenes JPG o PNG.');
//                     return;
//                }

//                const base64 = await fileToBase64(file);
//                setValue('avatar', base64);
//           }
//      };

//      const [archivoFirmaNombre, setArchivoFirmaNombre] = React.useState('');

//      const limpiarArchivoFirma = () => {
//           setArchivoFirmaNombre('');
//           setValue('archivoFirma', '');
//           if (archivoFirmaInputRef.current) {
//                archivoFirmaInputRef.current.value = ''; // resetea el input file
//           }
//      };

//      const handleArchivoFirmaChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//           const file = event.target.files?.[0];

//           if (file) {
//                const lowerName = file.name.toLowerCase();
//                if (!lowerName.endsWith('.p12') && !lowerName.endsWith('.pfx')) {
//                     alert('Solo se permiten archivos con extensión .p12 o .pfx');
//                     return;
//                }

//                const base64 = await fileToBase64(file);
//                setArchivoFirmaNombre(file.name);
//                setValue('archivoFirma', base64);
//           }
//      };


//      const onSubmit = (data: any) => {
//           if (!data.avatar) {
//                alert('Debe seleccionar un avatar.');
//                return;
//           }
//           if (!data.archivoFirma) {
//                alert('Debe subir el archivo de la firma electrónica.');
//                return;
//           }

//           const nuevaEmpresa: Empresa = {
//                // id: Date.now().toString(),
//                nombre: data.nombre,
//                ruc: data.ruc,
//                telefono: data.telefono,
//                correo: data.correo,
//                direccion: data.direccion,
//                claveFirma: data.claveFirma,
//                archivoFirma: data.archivoFirma,
//                avatar: data.avatar,
//           };

//           onCrear(nuevaEmpresa);
//           reset();

//           navigate('/dashboard');
//      };



//      return (
//           <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//                <DialogTitle>Información de la Empresa</DialogTitle>
//                <DialogContent>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                          <Stack spacing={3}>
//                               {/* Avatar */}
//                               <Stack direction="row" spacing={3} alignItems="center">
//                                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
//                                         <Avatar
//                                              src={avatar}
//                                              sx={{ width: 100, height: 100 }}
//                                         >
//                                              {!avatar && <CameraIcon />}
//                                         </Avatar>

//                                         {avatar && (
//                                              <IconButton
//                                                   size="small"
//                                                   onClick={() => setValue('avatar', '')}
//                                                   sx={{
//                                                        position: 'absolute',
//                                                        top: 0,
//                                                        right: 0,
//                                                        bgcolor: 'white',
//                                                        '&:hover': { bgcolor: 'grey.200' },
//                                                        boxShadow: 1,
//                                                   }}
//                                              >
//                                                   <CloseIcon fontSize="small" />
//                                              </IconButton>
//                                         )}
//                                    </Box>

//                                    <Stack spacing={1}>
//                                         <Typography variant="subtitle1">Avatar</Typography>
//                                         <Typography variant="caption">Min 400x400px, PNG o JPEG</Typography>
//                                         <Button
//                                              variant="outlined"
//                                              onClick={() => avatarInputRef.current?.click()}
//                                         >
//                                              Seleccionar
//                                         </Button>
//                                         <input
//                                              hidden
//                                              ref={avatarInputRef}
//                                              type="file"
//                                              accept="image/jpeg,image/png,image/jpg"
//                                              onChange={handleAvatarChange}
//                                         />
//                                    </Stack>
//                               </Stack>

//                               {/* Campos */}
//                               {([
//                                    { name: 'nombre', label: 'Nombre de la empresa' },
//                                    { name: 'ruc', label: 'RUC' },
//                                    { name: 'telefono', label: 'Teléfono' },
//                                    { name: 'correo', label: 'Correo electrónico' },
//                                    { name: 'direccion', label: 'Dirección' },
//                                    { name: 'claveFirma', label: 'Clave Firma Electrónica', type: 'password' },
//                               ] as { name: keyof Empresa; label: string; type?: string }[]).map(({ name, label, type = 'text' }) => (
//                                    <Controller
//                                         key={name}
//                                         name={name}
//                                         control={control}
//                                         rules={{ required: `${label} es obligatorio.` }}
//                                         render={({ field }) => (
//                                              <TextField
//                                                   {...field}
//                                                   type={type}
//                                                   label={label}
//                                                   fullWidth
//                                                   error={!!errors[name as keyof Empresa]}
//                                                   helperText={errors[name as keyof Empresa]?.message as string}
//                                              />
//                                         )}
//                                    />
//                               ))}

//                               {/* Archivo firma */}
//                               <Stack direction="row" spacing={2} alignItems="center">
//                                    <Button
//                                         variant="outlined"
//                                         onClick={() => archivoFirmaInputRef.current?.click()}
//                                    >
//                                         {archivoFirmaNombre ? 'Cambiar archivo de firma' : 'Subir archivo de firma (.p12 / .pfx)'}
//                                    </Button>

//                                    <input
//                                         hidden
//                                         ref={archivoFirmaInputRef}
//                                         type="file"
//                                         accept=".p12,.pfx"
//                                         onChange={handleArchivoFirmaChange}
//                                    />

//                                    {archivoFirmaNombre && (
//                                         <Chip
//                                              label={archivoFirmaNombre}
//                                              onDelete={limpiarArchivoFirma}
//                                              icon={<CheckCircleIcon color="success" />}
//                                              variant="outlined"
//                                         />
//                                    )}
//                               </Stack>

//                               <DialogActions>
//                                    <Button onClick={onClose}>Cancelar</Button>
//                                    <Button type="submit" variant="contained">Crear</Button>
//                               </DialogActions>
//                          </Stack>
//                     </form>
//                </DialogContent>
//           </Dialog>
//      );
// }