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
import { toast } from "react-toastify";
import { apipost } from "../../service/api";
// import { FiSave } from "react-icons/fi";
// import { GiCancel } from "react-icons/gi";
import Palette from "../../theme/palette";

const Add = (props) => {
  const { open, handleClose, setUserAction } = props
  const userid = localStorage.getItem('user_id');


  // -----------  validationSchema
  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    dateOfBirth: yup.date().required("Date of Birth is required"),
    gender: yup.string().required("Gender is required"),
    phoneNumber: yup.string().matches(/^[0-9]{11}$/, 'Phone number is invalid').required('Phone number is required'),
    emailAddress: yup.string().email('Invalid email').required("Email is required"),
    address: yup.string().required(),
    alternatePhoneNumber: yup.string().matches(/^[0-9]{11}$/, 'Phone number is invalid'),
    additionalEmailAddress: yup.string().email('Invalid email')
  });

  // -----------   initialValues
  const initialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    alternatePhoneNumber: "",
    additionalEmailAddress: "",
    instagramProfile: "",
    twitterProfile: "",
    preferredContactMethod: "",
    referralSource: "",
    referralContactName: "",
    relationshipToReferrer: "",
    preferencesForMarketingCommunications: "",
    preferredLanguage: "",
    createdBy: userid
  };

  // add contact api
  const addContact = async (values) => {
    const data = values;
    const result = await apipost('contact/add', data)
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
      addContact(values)
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
            <Typography style={{ marginBottom: "15px" }} variant="h6">
              Información Personal
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
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={
                    formik.touched.lastName && formik.errors.lastName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Nacimiento</FormLabel>
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
              <Grid item xs={12}>
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
                  rows={4}
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
              Más Información
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
                  error={formik.touched.alternatePhoneNumber && Boolean(formik.errors.alternatePhoneNumber)}
                  helperText={formik.touched.alternatePhoneNumber && formik.errors.alternatePhoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Correo alternativo</FormLabel>
                <TextField
                  id="additionalEmailAddress"
                  name="additionalEmailAddress"
                  type="email"
                  size="small"
                  fullWidth
                  value={formik.values.additionalEmailAddress}
                  onChange={formik.handleChange}
                  error={formik.touched.additionalEmailAddress && Boolean(formik.errors.additionalEmailAddress)}
                  helperText={formik.touched.additionalEmailAddress && formik.errors.additionalEmailAddress}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Instagram</FormLabel>
                <TextField
                  id="instagramProfile"
                  name="instagramProfile"
                  type=""
                  size="small"
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
                  type=""
                  size="small"
                  fullWidth
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
                    <MenuItem value="Opt-in">Si</MenuItem>
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
          // startIcon={<FiSave />}
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

export default Add