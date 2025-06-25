/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import ClearIcon from "@mui/icons-material/Clear";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import * as yup from "yup";
import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { apiget, apiput } from "../../service/api";
import Palette from "../../theme/palette";


const Edit = (props) => {

  const { open, handleClose, id, fetchContact } = props
  const [contactData, setContactData] = useState({});



  // -----------  validationSchema
  const validationSchema = yup.object({
    firstName: yup.string().required("Obligatorio"),
    lastName: yup.string().required("Obligatorio"),
    dateOfBirth: yup.date().required("Obligatorio"),
    gender: yup.string().required("Obligatorio"),
    phoneNumber: yup.string().matches(/^[0-9]{11}$/, 'Teléfono inválido').required('Obligatorio'),
    emailAddress: yup.string().email('Correo inválido').required("Obligatorio"),
    address: yup.string().required(),
    alternatePhoneNumber: yup.string().matches(/^[0-9]{11}$/, 'Teléfono invalido'),
    additionalEmailAddress: yup.string().email('Correo inválido'),
  });

  // -----------   initialValues
  const initialValues = {
    firstName: contactData?.firstName,
    lastName: contactData?.lastName,
    dateOfBirth: contactData?.dateOfBirth,
    gender: contactData?.gender,
    phoneNumber: contactData?.phoneNumber,
    emailAddress: contactData?.emailAddress,
    address: contactData?.address,
    alternatePhoneNumber: contactData?.alternatePhoneNumber,
    additionalEmailAddress: contactData?.additionalEmailAddress,
    instagramProfile: contactData?.instagramProfile,
    twitterProfile: contactData?.twitterProfile,
    preferredContactMethod: contactData?.preferredContactMethod,
    referralSource: contactData?.referralSource,
    referralContactName: contactData?.referralContactName,
    relationshipToReferrer: contactData?.relationshipToReferrer,
    preferencesForMarketingCommunications: contactData?.preferencesForMarketingCommunications,
    preferredLanguage: contactData?.preferredLanguage,
    modifiedOn: ""
  };

  // add Contact Edit api
  const editContact = async (values) => {
    const data = values;
    const result = await apiput(`contact/edit/${id}`, data)

    if (result && result.status === 200) {
      handleClose();
      fetchContact();
    }
  }

  // fetch api
  const fetchdata = async () => {
    const result = await apiget(`contact/view/${id}`)
    if (result && result.status === 200) {
      setContactData(result?.data[0])
    }
  }

  useEffect(() => {
    fetchdata();
  }, [open])


  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const ContactData = {
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
        phoneNumber: values.phoneNumber,
        emailAddress: values.emailAddress,
        address: values.address,
        alternatePhoneNumber: values.alternatePhoneNumber,
        additionalEmailAddress: values.additionalEmailAddress,
        instagramProfile: values.instagramProfile,
        twitterProfile: values.twitterProfile,
        preferredContactMethod: values.preferredContactMethod,
        referralSource: values.referralSource,
        referralContactName: values.referralContactName,
        relationshipToReferrer: values.relationshipToReferrer,
        preferencesForMarketingCommunications: values.preferencesForMarketingCommunications,
        preferredLanguage: values.preferredLanguage,
        modifiedOn: new Date()
      }
      editContact(ContactData)

    },
  });

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
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
          <Typography variant="h6">Editar</Typography>
          <Typography>
            <ClearIcon
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Typography style={{ marginBottom: "15px" }} variant="h6">
              Información básica de contacto
            </Typography>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Nombres</FormLabel>
                <TextField
                  id="firstName"
                  name="firstName"
                  size="small"
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
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Apellidos</FormLabel>
                <TextField
                  id="lastName"
                  name="lastName"
                  size="small"
                  fullWidth
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={
                    formik.touched.lastName && formik.errors.lastName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <TextField
                  name='dateOfBirth'
                  type='date'
                  size='small'
                  fullWidth
                  value={dayjs(formik.values.dateOfBirth).format('YYYY-MM-DD')}
                  onChange={formik.handleChange}
                  error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                  helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Número de teléfono</FormLabel>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  size="small"
                  type="number"
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
              <Grid item xs={12} >
                <FormLabel>Correo</FormLabel>
                <TextField
                  id="emailAddress"
                  name="emailAddress"
                  size="small"
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
                    <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                    <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" />
                    <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                  </RadioGroup>
                  <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.gender && formik.errors.gender}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Dirección</FormLabel>
                <TextField
                  id="address"
                  name="address"
                  size="small"
                  multiline
                  fullWidth
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
            </Grid>
            <Typography style={{ marginBottom: "15px" }} variant="h6" mt={2}>
             Más detalles de contacto
            </Typography>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Teléfono Alternativo</FormLabel>
                <TextField
                  id="alternatePhoneNumber"
                  name="alternatePhoneNumber"
                  type="number"
                  size="small"
                  fullWidth
                  value={formik.values.alternatePhoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.alternatePhoneNumber && Boolean(formik.errors.alternatePhoneNumber)
                  }
                  helperText={formik.touched.alternatePhoneNumber && formik.errors.alternatePhoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Correo Alternativo</FormLabel>
                <TextField
                  id="additionalEmailAddress"
                  name="additionalEmailAddress"
                  type="email"
                  size="small"
                  fullWidth
                  value={formik.values.additionalEmailAddress}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.additionalEmailAddress && Boolean(formik.errors.additionalEmailAddress)
                  }
                  helperText={formik.touched.additionalEmailAddress && formik.errors.additionalEmailAddress}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Perfil Instagram</FormLabel>
                <TextField
                  id="instagramProfile"
                  name="instagramProfile"
                  type=""
                  size="small"
                  fullWidth
                  value={formik.values.instagramProfile}
                  onChange={(e) => formik.setFieldValue('instagramProfile', `${e.target.value}`)}
                />
                {formik.values.instagramProfile && <a href={`https://www.instagram.com/${formik.values.instagramProfile}`} target="_blank" rel="noreferrer">Link</a>}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Perfil Twitter</FormLabel>
                <TextField
                  id="twitterProfile"
                  name="twitterProfile"
                  type=""
                  size="small"
                  fullWidth
                  value={formik.values.twitterProfile}
                  onChange={(e) => formik.setFieldValue('twitterProfile', `${e.target.value}`)}
                />
                {formik.values.twitterProfile && <a href={`https://twitter.com/${formik.values.twitterProfile}`} target="_blank" rel="noreferrer">Link</a>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormLabel>Método de contacto preferido</FormLabel>
                <TextField
                  id="preferredContactMethod"
                  name="preferredContactMethod"
                  type=""
                  size="small"
                  fullWidth
                  value={formik.values.preferredContactMethod}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Typography style={{ marginBottom: "15px" }} variant="h6" mt={2}>
              Información de referencia
            </Typography>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Fuente</FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="referralSource"
                    name="referralSource"
                    size="small"
                    value={formik.values.referralSource}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.referralSource && Boolean(formik.errors.referralSource)
                    }
                  >
                    <MenuItem value="Existing Customers">Clientes actuales</MenuItem>
                    <MenuItem value="Professional Networks">Redes profesionales</MenuItem>
                    <MenuItem value="Business Partnerships">Asociaciones empresariales</MenuItem>
                    <MenuItem value="Employee Referrals">Referencias de empleados</MenuItem>
                    <MenuItem value="Online Reviews and Social Media">Reseñas en línea o Redes sociales</MenuItem>
                  </Select>
                  <FormHelperText
                    error={
                      formik.touched.referralSource && Boolean(formik.errors.referralSource)
                    }
                  >
                    {formik.touched.referralSource && formik.errors.referralSource}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Nombre del contacto</FormLabel>
                <TextField
                  id="referralContactName"
                  name="referralContactName"
                  size="small"
                  fullWidth
                  value={formik.values.referralContactName}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Relación con la persona</FormLabel>
                <TextField
                  id="relationshipToReferrer"
                  name="relationshipToReferrer"
                  size="small"
                  fullWidth
                  value={formik.values.relationshipToReferrer}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Typography style={{ marginBottom: "15px" }} variant="h6" mt={2}>
              Preferencias de comunicación
            </Typography>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>¿Quiere recibir Marketing?</FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="preferencesForMarketingCommunications"
                    name="preferencesForMarketingCommunications"
                    size="small"
                    value={formik.values.preferencesForMarketingCommunications}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.preferencesForMarketingCommunications && Boolean(formik.errors.preferencesForMarketingCommunications)
                    }
                  >
                    <MenuItem value="Opt-in">Sí</MenuItem>
                    <MenuItem value="Opt-out">No</MenuItem>
                  </Select>
                  <FormHelperText
                    error={
                      formik.touched.preferencesForMarketingCommunications && Boolean(formik.errors.preferencesForMarketingCommunications)
                    }
                  >
                    {formik.touched.preferencesForMarketingCommunications && formik.errors.preferencesForMarketingCommunications}
                  </FormHelperText>
                </FormControl>

              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Idioma preferido</FormLabel>
                <TextField
                  id="preferredLanguage"
                  name="preferredLanguage"
                  type=""
                  size="small"
                  fullWidth
                  value={formik.values.preferredLanguage}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            onClick={formik.handleSubmit}
            style={{ textTransform: "capitalize" }}
          >
            Guardar
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: "capitalize" }}
            color="error"
            onClick={() => {
              formik.resetForm()
              handleClose()
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Edit