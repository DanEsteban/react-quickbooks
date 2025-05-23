import React from 'react'

import { useCreateAsiento } from '@/api/asientos/asientos-request';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { paths } from '@/paths';
import { Option } from "@/components/core/option";
import { CreateAsientoDto } from '@/api/asientos/asientos-types';
import { Card, CardContent, CircularProgress, Divider, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useGetTransaccionContable } from '@/api/transaccion_contable/transaccion-contable-request';
import { TransaccionContableResponseType } from '@/api/transaccion_contable/transaccion-contable-types';

export const AsientosFormMejorada = () => {
     const navigate = useNavigate();
     const { selectedEmpresa } = useSelector((state: RootState) => state.empresaSlice);

     const { mutate, isLoading } = useCreateAsiento(selectedEmpresa.id);
     const {
          data: transacciones = [],
          isLoading: isLoadingTransacciones,
          isError: isErrorTransacciones,
          refetch: refetchTransacciones
     } = useGetTransaccionContable(selectedEmpresa.id);
     const {
          control,
          register,
          handleSubmit,
          formState: { errors },
          setValue
     } = useForm<CreateAsientoDto>();


     const onSubmit = (data: CreateAsientoDto) => {
          const payload = { ...data, empresa_id: selectedEmpresa.id };

          mutate(payload, {
               onSuccess: () => {
                    navigate(paths.dashboard.asientos.index(selectedEmpresa.id));
               },
          });
     };

     const handleTransaccionChange = React.useCallback(
          async (selectedTransaccion: string) => {
               const { data: freshTransacciones } = await refetchTransacciones();

               if (!freshTransacciones) {
                    console.error("No se pudo obtener transacciones actualizadas");
                    return;
               }

               const selectedTransaccionData = freshTransacciones.find(
                    (transaccion: TransaccionContableResponseType) =>
                         transaccion.codigo_transaccion === selectedTransaccion
               );

               if (selectedTransaccionData) {
                    const currentYear = new Date().getFullYear();
                    const nroAsiento = `${currentYear}-${selectedTransaccionData.codigo_transaccion}-${selectedTransaccionData.secuencial}`;
                    setValue("nro_asiento", nroAsiento);
               } else {
                    console.error("Transacción seleccionada no encontrada");
               }
          },
          [refetchTransacciones, setValue]
     );

     return (
          <form onSubmit={handleSubmit(onSubmit)}>
               <Card>
                    <CardContent>
                         <Stack spacing={4}>
                              <Stack spacing={3}>
                                   <Grid container spacing={3}>
                                        <Grid size={{ md: 6, xs: 12 }}>
                                             <Controller
                                                  control={control}
                                                  name="codigo_transaccion"
                                                  render={({ field }) => (
                                                       <FormControl fullWidth>
                                                            <InputLabel>Transacción</InputLabel>
                                                            <Select
                                                                 {...field}
                                                                 label="Transaccion"
                                                                 disabled={
                                                                      isLoadingTransacciones || isErrorTransacciones
                                                                 }
                                                                 value={
                                                                      transacciones.some(
                                                                           (t) => t.codigo_transaccion === field.value
                                                                      )
                                                                           ? field.value
                                                                           : ""
                                                                 }
                                                                 onChange={(e) => {
                                                                      field.onChange(e);
                                                                      handleTransaccionChange(e.target.value);
                                                                 }}
                                                            >
                                                                 {isErrorTransacciones && (
                                                                      <Option value="">
                                                                           <em>Error cargando transacciones</em>
                                                                      </Option>
                                                                 )}
                                                                 {isLoadingTransacciones ? (
                                                                      <Option value="">
                                                                           <CircularProgress size={20} />
                                                                           <Typography sx={{ ml: 1 }}>Cargando transacciones...</Typography>
                                                                      </Option>
                                                                 ) : (
                                                                      transacciones?.map(
                                                                           (
                                                                                transaccion
                                                                           ) => (
                                                                                <Option
                                                                                     key={transaccion.id}
                                                                                     value={transaccion.codigo_transaccion}
                                                                                >
                                                                                     {transaccion.nombre}
                                                                                </Option>
                                                                           )
                                                                      )
                                                                 )}
                                                            </Select>
                                                       </FormControl>
                                                  )}
                                             />
                                        </Grid>
                                        <Grid size={{ md: 6, xs: 12 }}>
                                             <Controller
                                                  control={control}
                                                  name="estado"
                                                  render={({ field }) => (
                                                       <FormControl fullWidth>
                                                            <InputLabel htmlFor="estado">Estado:</InputLabel>
                                                            <OutlinedInput id="estado" {...field} />
                                                       </FormControl>
                                                  )}
                                             />
                                        </Grid>
                                        <Grid size={{ md: 6, xs: 12 }}>
                                             <Controller
                                                  control={control}
                                                  name="nro_asiento"
                                                  render={({ field }) => (
                                                       <FormControl fullWidth>
                                                            <InputLabel>Número:</InputLabel>
                                                            <OutlinedInput
                                                                 {...field}
                                                                 readOnly
                                                                 sx={{
                                                                      backgroundColor: "#f5f5f5",
                                                                      color: "#777777", // Texto gris
                                                                      "& .MuiOutlinedInput-notchedOutline": {
                                                                           borderColor: "#bdbdbd", // Borde gris
                                                                      },
                                                                 }}
                                                            />
                                                       </FormControl>
                                                  )}
                                             />
                                        </Grid>
                                        <Grid size={{ md: 6, xs: 12 }}>
                                             <LocalizationProvider
                                                  dateAdapter={AdapterDayjs}
                                                  adapterLocale="es"
                                             >
                                                  <Controller
                                                       control={control}
                                                       name="fecha_emision"
                                                       render={({ field }) => (
                                                            <DatePicker
                                                                 {...field}
                                                                 label="Fecha Tr"
                                                                 format="YYYY-MM-DD"
                                                                 value={field.value ? dayjs(field.value) : null}
                                                                 onChange={(date) => {
                                                                      field.onChange(date ? date.format("YYYY-MM-DD") : '');
                                                                 }}
                                                                 slotProps={{
                                                                      textField: {
                                                                           error: Boolean(errors.fecha_emision),
                                                                           fullWidth: true,
                                                                           helperText: errors.fecha_emision?.message,
                                                                      },
                                                                 }}
                                                            />
                                                       )}
                                                  />
                                             </LocalizationProvider>
                                        </Grid>
                                        <Grid size={{ md: 6, xs: 12 }}>
                                             <Controller
                                                  control={control}
                                                  name="comentario"
                                                  render={({ field }) => (
                                                       <FormControl
                                                            fullWidth
                                                       >
                                                            <InputLabel>Comentario</InputLabel>
                                                            <OutlinedInput
                                                                 {...field}
                                                                 placeholder="e.g Esto es una Prueba"
                                                            />
                                                       </FormControl>
                                                  )}
                                             />
                                        </Grid>
                                        <Grid size={{ md: 6, xs: 12 }}>
                                             <Controller
                                                  control={control}
                                                  name="nro_referencia"
                                                  render={({ field }) => (
                                                       <FormControl fullWidth>
                                                            <InputLabel>Nro. Ref</InputLabel>
                                                            <OutlinedInput {...field} />
                                                       </FormControl>
                                                  )}
                                             />
                                        </Grid>
                                        <Grid size={{ md: 6, xs: 12 }}>
                                             <Controller
                                                  control={control}
                                                  name="codigo_centro"
                                                  render={({ field }) => (
                                                       <FormControl fullWidth>
                                                            <InputLabel>Centro</InputLabel>
                                                            <Select
                                                                 {...field}
                                                                 label="Centro"
                                                            >
                                                            </Select>

                                                       </FormControl>
                                                  )}
                                             />
                                        </Grid>
                                   </Grid>
                              </Stack>
                              <Divider sx={{ borderBottomWidth: 2, borderColor: "darkgray" }} />

                         </Stack>
                    </CardContent>
               </Card>
          </form>
     );
}
