// import React from "react";
// import { Button, Card, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

// import { useNavigate } from "react-router-dom";
// import { CrearEmpresaDialog } from "@/components/core/empresa/crear-empresa-dialog";

// type Empresa = {
//     id: string;
//     nombre: string;
// };

// export default function Empresa() {
//     const navigate = useNavigate();
//     const [empresas, setEmpresas] = React.useState<Empresa[]>([]);
//     const [empresaSeleccionada, setEmpresaSeleccionada] = React.useState('');
//     const [openModal, setOpenModal] = React.useState(false);

//     React.useEffect(() => {
//         const usuario = JSON.parse(localStorage.getItem('user') || '{}');
//         const empresasUsuario = usuario?.empresas || [];
//         setEmpresas(empresasUsuario);
//     }, []);

//     const handleSeleccion = () => {
//         const empresa = empresas.find((e) => e.id === empresaSeleccionada);
//         if (empresa) {
//             localStorage.setItem('empresaSeleccionada', JSON.stringify(empresa));
//             navigate('/dashboard');
//         }
//     };

//     const handleCrearEmpresa = (nueva: Empresa) => {
//         const actualizadas = [...empresas, nueva];
//         setEmpresas(actualizadas);
//         setEmpresaSeleccionada(nueva.id);

//         // Simular que el usuario ha sido actualizado
//         const usuario = JSON.parse(localStorage.getItem('user') || '{}');
//         usuario.empresas = actualizadas;
//         localStorage.setItem('user', JSON.stringify(usuario));

//         setOpenModal(false);
//     };

//     return (
//         <Card sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 6 }}>
//             <Typography variant="h6" gutterBottom>
//                 Seleccione o cree su empresa
//             </Typography>

//             {empresas.length > 0 && (
//                 <>
//                     <FormControl fullWidth sx={{ my: 2 }}>
//                         <InputLabel>Empresa</InputLabel>
//                         <Select
//                             value={empresaSeleccionada}
//                             label="Empresa"
//                             onChange={(e) => setEmpresaSeleccionada(e.target.value)}
//                         >
//                             {empresas.map((empresa) => (
//                                 <MenuItem key={empresa.id} value={empresa.id}>
//                                     {empresa.nombre}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>

//                     <Button
//                         variant="contained"
//                         fullWidth
//                         onClick={handleSeleccion}
//                         disabled={!empresaSeleccionada}
//                     >
//                         Entrar al sistema
//                     </Button>
//                 </>
//             )}

//             {empresas.length === 0 && (
//                 <Typography color="text.secondary" sx={{ my: 2 }}>
//                     No tiene empresas registradas aún.
//                 </Typography>
//             )}

//             <Button
//                 variant="outlined"
//                 fullWidth
//                 sx={{ mt: 3 }}
//                 onClick={() => setOpenModal(true)}
//             >
//                 Crear nueva empresa
//             </Button>

//             <CrearEmpresaDialog
//                 open={openModal}
//                 onClose={() => setOpenModal(false)}
//                 onCrear={handleCrearEmpresa}
//             />
//         </Card>
//     );
// }
