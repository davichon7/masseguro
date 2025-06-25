/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputAdornment, MenuItem, OutlinedInput, Radio, RadioGroup, Rating, Select, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from 'formik';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { apiget, apipost } from '../../service/api';
import Palette from '../../theme/palette';

const Add = (props) => {

  const { open, handleClose, _id, setUserAction } = props
  const [user, setUser] = useState([])

  const userid = localStorage.getItem('user_id');
  const userdata = JSON.parse(localStorage.getItem('user'));

  // -----------  validationSchema
  const validationSchema = yup.object({
    title: yup.string().required("Obligatorio"),
    firstName: yup.string().required("Obligatorio"),
    lastName: yup.string().required("Obligatorio"),
    dateOfBirth: yup.date().required("Obligatorio"),
    gender: yup.string().required("Obligatorio"),
    phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Número de teléfono inválido').required('Obligatorio'),
    emailAddress: yup.string().email('Correo electrónico inválido').required("Obligatorio"),
    address: yup.string().required("Obligatorio"),
    desiredCoverageAmount: yup.number(),
    coverageAmount: yup.number(),
    alternatePhoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Número de teléfono inválido'),
    additionalEmailAddress: yup.string().email('Correo electrónico inválido'),
    assigned_agent: yup.string().required("Obligatorio")
  });

  // -----------   initialValues
  const initialValues = {
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    leadSource: "0",
    leadStatus: "",
    leadScore: "",
    alternatePhoneNumber: "",
    additionalEmailAddress: "",
    instagramProfile: "",
    twitterProfile: "",
    typeOfInsurance: "",
    desiredCoverageAmount: "",
    specificPolicyFeatures: "",
    QualificationStatus: "",
    policyType: "",
    policyNumber: "",
    startDate: "",
    endDate: "",
    coverageAmount: "",
    termLength: "",
    conversionReason: "",
    conversionDateTime: "",
    leadCategory: "",
    leadPriority: "",
    assigned_agent: "",
    createdBy: userid,
    contact_id: _id
  };

  // add Lead api
  const addLead = async (values) => {
    const data = values;
    const result = await apipost('lead/add', data)
    setUserAction(result)

    if (result && result.status === 201) {
      formik.resetForm();
      handleClose();
      toast.success(result.data.message)
    }
  }

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      addLead(values)
    },
  });
  // user api
  const fetchUserData = async () => {
    const result = await apiget('user/list')
    if (result && result.status === 200) {
      setUser(result?.data?.result)
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      // TransitionComponent={Transition}
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Agregar Nuevo</Typography>
          <Typography>
            <ClearIcon
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >
              <Typography style={{ marginBottom: "15px" }} variant="h6">
                Información Básica
              </Typography>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
              >
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl fullWidth>
                    <FormLabel>Título</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="title"
                      name="title"
                      label=""
                      size='small'
                      fullWidth
                      value={formik.values.title || null}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.title &&
                        Boolean(formik.errors.title)
                      }
                      helperText={
                        formik.touched.title && formik.errors.title
                      }
                    >
                      <MenuItem value="Mr.">Sr.</MenuItem>
                      <MenuItem value="Mrs.">Sra.</MenuItem>
                      <MenuItem value="Miss.">Srta.</MenuItem>
                      <MenuItem value="Ms.">Sra.</MenuItem>
                      <MenuItem value="Dr.">Dr.</MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.title && formik.errors.title}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Nombres</FormLabel>
                  <TextField
                    id="fristName"
                    name="firstName"
                    label=""
                    size='small'
                    maxRows={10}
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Apellidos</FormLabel>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label=""
                    size='small'
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <TextField
                    name='dateOfBirth'
                    type='date'
                    size='small'
                    fullWidth
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Teléfono</FormLabel>
                  <TextField
                    id="phoneNumber"
                    name="phoneNumber"
                    type='number'
                    size='small'
                    fullWidth
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <TextField
                    id="emailAddress"
                    name="emailAddress"
                    label=""
                    size='small'
                    fullWidth
                    value={formik.values.emailAddress}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.emailAddress &&
                      Boolean(formik.errors.emailAddress)
                    }
                    helperText={
                      formik.touched.emailAddress && formik.errors.emailAddress
                    }
                  />
                </Grid>
                <Grid item xs={12} >
                  <FormControl fullWidth>
                    <FormLabel>Género</FormLabel>
                    <RadioGroup row name="gender" onChange={formik.handleChange} value={formik.values.gender}>
                      <FormControlLabel value="Male" control={<Radio />} label="Masculino" />
                      <FormControlLabel value="Female" control={<Radio />} label="Femenino" />
                      <FormControlLabel value="Other" control={<Radio />} label="Otro" />
                    </RadioGroup>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.gender && formik.errors.gender}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Dirección</FormLabel>
                  <TextField
                    id="address"
                    name="address"
                    label=""
                    size='small'
                    multiline
                    rows={5}
                    fullWidth
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address &&
                      Boolean(formik.errors.address)
                    }
                    helperText={
                      formik.touched.address && formik.errors.address
                    }
                  />
                </Grid>
              </Grid>
              <Typography
                style={{ marginBottom: "15px", marginTop: "15px" }}
                variant="h6"
              >
                Fuente de Información
              </Typography>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
              >
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl fullWidth>
                    <FormLabel>como nos conoció</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="leadSource"
                      name="leadSource"
                      label=""
                      size='small'
                      fullWidth
                      value={formik.values.leadSource || null}
                      onChange={formik.handleChange}

                    >
                      <MenuItem value="Website Referrals">
                        Sitio Web
                      </MenuItem>
                      <MenuItem value="Advertising">Publicidad</MenuItem>
                      <MenuItem value="Social Media">Redes Sociales</MenuItem>
                      <MenuItem value="Events and Trade Shows">
                        Eventos y Ferias Comerciales
                      </MenuItem>
                      <MenuItem value="Call Centers or Telemarketing">
                        Centros de Llamadas o Telemarketing
                      </MenuItem>
                      <MenuItem value="Partnerships">Alianzas</MenuItem>
                      <MenuItem value="Direct Mail">Correo Directo</MenuItem>
                      <MenuItem value="Online Aggregators or Comparison Websites">
                        Buscadores en Línea o Sitios de Comparación
                      </MenuItem>
                      <MenuItem value="Content Marketing">
                        Marketing de Contenidos
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Typography
                style={{ marginBottom: "15px", marginTop: "15px" }}
                variant="h6"
              >
                Detalles
              </Typography>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
              >
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl fullWidth>
                    <FormLabel>Estado</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="leadStatus"
                      name="leadStatus"
                      label=""
                      size='small'
                      fullWidth
                      value={formik.values.leadStatus}
                      onChange={formik.handleChange}

                    >
                      <MenuItem value="New">Nuevo</MenuItem>
                      <MenuItem value="Contacted">Contactado</MenuItem>
                      <MenuItem value="Qualified">Calificado</MenuItem>
                      <MenuItem value="Not Qualified">No Calificado</MenuItem>
                      <MenuItem value="In Progress">En Progreso</MenuItem>
                      <MenuItem value="Closed/Won">Cerrado/Ganado</MenuItem>
                      <MenuItem value="Closed/Lost">Cerrado/Perdido</MenuItem>
                      <MenuItem value="Follow-up Required">
                        Seguimiento Requerido
                      </MenuItem>
                      <MenuItem value="On Hold">En Espera</MenuItem>
                      <MenuItem value="Converted">Convertido</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <FormControl fullWidth>
                    <FormLabel>Agente Asignado</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="assigned_agent"
                      name="assigned_agent"
                      label=""
                      size='small'
                      fullWidth
                      value={formik.values.assigned_agent}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.assigned_agent &&
                        Boolean(formik.errors.assigned_agent)
                      }
                      helperText={
                        formik.touched.assigned_agent && formik.errors.assigned_agent
                      }
                    >
                      {
                        user.role === 'admin' ?
                          user.map((user) => {
                            if (user.role === 'admin') {
                              return (
                                <MenuItem key={user._id} value={user._id}>
                                  {`${user.firstName} ${user.lastName}`}
                                </MenuItem>
                              );
                            }
                            return null;
                          })
                          :
                          <MenuItem key={userdata._id} value={userdata._id}>
                            {`${userdata.firstName} ${userdata.lastName}`}
                          </MenuItem>
                      }
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.assigned_agent && formik.errors.assigned_agent}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl fullWidth>
                    <FormLabel>Puntuación o Rating</FormLabel>
                    <Typography display="flex">
                      <Rating name="leadScore" precision={0.1} onChange={(event, newValue) => formik.setFieldValue("leadScore", newValue)} />
                    </Typography>
                  </FormControl>
                </Grid>
              </Grid>
              <Typography
                style={{ marginBottom: "15px", marginTop: "15px" }}
                variant="h6"
              >
                Detalles de Contacto
              </Typography>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
              >
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Número de teléfono alternativo</FormLabel>
                  <TextField
                    id="alternatePhoneNumber"
                    name="alternatePhoneNumber"
                    type="number"
                    size='small'
                    fullWidth
                    value={formik.values.alternatePhoneNumber}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.alternatePhoneNumber &&
                      Boolean(formik.errors.alternatePhoneNumber)
                    }
                    helperText={
                      formik.touched.alternatePhoneNumber && formik.errors.alternatePhoneNumber
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Correo electrónico adicional</FormLabel>
                  <TextField
                    id="additionalEmailAddress"
                    name="additionalEmailAddress"
                    type="email"
                    size='small'
                    fullWidth
                    value={formik.values.additionalEmailAddress}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.additionalEmailAddress &&
                      Boolean(formik.errors.additionalEmailAddress)
                    }
                    helperText={
                      formik.touched.additionalEmailAddress && formik.errors.additionalEmailAddress
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Instagram</FormLabel>
                  <TextField
                    id="instagramProfile"
                    name="instagramProfile"
                    size='small'
                    fullWidth
                    onChange={(e) => formik.setFieldValue('instagramProfile', `${e.target.value}`)}
                  />
                  {formik.values.instagramProfile && <a href={`https://www.instagram.com/${formik.values.instagramProfile}`} target="_blank" rel="noreferrer">Link</a>}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Twitter</FormLabel>
                  <TextField
                    id="twitterProfile"
                    name="twitterProfile"
                    size='small'
                    fullWidth
                    onChange={(e) => formik.setFieldValue('twitterProfile', `${e.target.value}`)}
                  />
                  {formik.values.twitterProfile && <a href={`https://twitter.com/${formik.values.twitterProfile}`} target="_blank" rel="noreferrer">Link</a>}
                </Grid>
              </Grid>
              <Typography
                style={{ marginBottom: "15px", marginTop: "15px" }}
                variant="h6"
              >
                Seguridad y Requisitos de Póliza
              </Typography>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
              >
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Tipo de seguro</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="typeOfInsurance"
                      name="typeOfInsurance"
                      size='small'
                      fullWidth
                      value={formik.values.typeOfInsurance}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="Auto">Seguro de Auto</MenuItem>
                      <MenuItem value="Home Insurance">Seguro de Hogar</MenuItem>
                      <MenuItem value="Health Insurance">
                        Seguro de Salud
                      </MenuItem>
                      <MenuItem value="Life Insurance">Seguro de Vida</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Monto de cobertura deseado</FormLabel>
                    <OutlinedInput
                      id="desiredCoverageAmount"
                      name="desiredCoverageAmount"
                      endAdornment={
                        <InputAdornment position="end">&#8377;</InputAdornment>
                      }
                      type='number'
                      size='small'
                      fullWidth
                      value={formik.values.desiredCoverageAmount}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Características específicas</FormLabel>
                  <TextField
                    id="specificPolicyFeatures"
                    name="specificPolicyFeatures"
                    size='small'
                    rows={3}
                    multiline
                    fullWidth
                    value={formik.values.specificPolicyFeatures}
                    onChange={formik.handleChange}
                  />
                </Grid>
              </Grid>
              <Typography
                style={{ marginBottom: "15px", marginTop: "15px" }}
                variant="h6"
              >
                Cualificación de clientes potenciales
              </Typography>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
              >
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <FormLabel>Estado de Cualificación</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="QualificationStatus"
                      name="QualificationStatus"
                      size='small'
                      fullWidth
                      value={formik.values.QualificationStatus}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="Qualified">Calificado</MenuItem>
                      <MenuItem value="Not Qualified">No Calificado</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

              </Grid>
              <Typography
                style={{ marginBottom: "15px", marginTop: "15px" }}
                variant="h6"
              >
                Información conversión de clientes potenciales
              </Typography>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
              >
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Tipo de Póliza</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="policyType"
                      name="policyType"
                      size='small'
                      fullWidth
                      value={formik.values.policyType}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="Auto">Seguro de Auto</MenuItem>
                      <MenuItem value="Home Insurance">Seguro de Hogar</MenuItem>
                      <MenuItem value="Health Insurance">
                        Seguro de Salud     
                      </MenuItem>
                      <MenuItem value="Life Insurance">Seguro de Vida</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Número de Póliza</FormLabel>
                  <TextField
                    id="policyNumber"
                    name="policyNumber"
                    type='number'
                    size='small'
                    fullWidth
                    value={formik.values.policyNumber}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Fecha de Inicio</FormLabel>
                  <TextField
                    id="startDate"
                    name="startDate"
                    type='date'
                    size='small'
                    fullWidth
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Fecha de Finalización</FormLabel>
                  <TextField
                    id="endDate"
                    name="endDate"
                    type='date'
                    size='small'
                    fullWidth
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Monto de Cobertura</FormLabel>
                  <OutlinedInput
                    id="coverageAmount"
                    name="coverageAmount"
                    endAdornment={
                      <InputAdornment position="end">&#8377;</InputAdornment>
                    }
                    type='number'
                    size='small'
                    fullWidth
                    value={formik.values.coverageAmount}
                    onChange={formik.handleChange}
                  />

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Duración</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="termLength"
                      name="termLength"
                      label=""
                      size='small'
                      fullWidth
                      value={formik.values.termLength}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="1 year">1 año</MenuItem>
                      <MenuItem value="2 years">2 años </MenuItem>
                      <MenuItem value="5 years">5 años </MenuItem>
                      <MenuItem value="10 years">10 años </MenuItem>
                      <MenuItem value="15 years">15 años</MenuItem>
                    </Select>
                  </FormControl>

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Razón de Conversión</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="conversionReason"
                      name="conversionReason"
                      label=""
                      size='small'
                      fullWidth
                      value={formik.values.conversionReason}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="Coverage Needs">Necesidades de cobertura</MenuItem>
                      <MenuItem value="Trust and Reputation">Confianza y Reputación</MenuItem>
                      <MenuItem value="Competitive Pricing">Precios Competitivos</MenuItem>
                      <MenuItem value="Excellent Customer Service">Excelente Servicio al Cliente</MenuItem>
                      <MenuItem value="Referrals or Recommendations">Referencias o Recomendaciones</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Fecha y Hora de Conversión</FormLabel>
                  <TextField
                    id=""
                    name="conversionDateTime"
                    type='datetime-local'
                    size='small'
                    fullWidth
                    value={formik.values.conversionDateTime}
                    onChange={formik.handleChange}
                  />
                </Grid>
              </Grid>
              <Typography
                style={{ marginBottom: "15px", marginTop: "15px" }}
                variant="h6"
              >
                Segmentación de Clientes
              </Typography>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
              >
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Categoría</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="leadCategory"
                      name="leadCategory"
                      label=""
                      size='small'
                      fullWidth
                      value={formik.values.leadCategory}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="Hot Lead">Cliente potencial activo</MenuItem>
                      <MenuItem value="Cold Lead">Cliente potencial frío</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Prioridad de Cliente</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="leadPriority"
                      name="leadPriority"
                      label=""
                      size='small'
                      fullWidth
                      value={formik.values.leadPriority}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="High">Alta</MenuItem>
                      <MenuItem value="Medium">Media</MenuItem>
                      <MenuItem value="Low">Baja</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant='contained' color='primary'>Guardar</Button>
          <Button onClick={() => {
            formik.resetForm()
            handleClose()
          }} variant='outlined' color='error'>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Add