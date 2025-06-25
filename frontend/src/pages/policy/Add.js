/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from "@mui/icons-material/Clear";

import { useFormik } from 'formik';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { apiget, apipost } from '../../service/api';
import Palette from '../../theme/palette';

const Add = (props) => {
    const { open, handleClose, setUserAction, _id } = props

    const [contactList, setContactList] = useState([])
    const userid = localStorage.getItem('user_id')
    const userRole = localStorage.getItem("userRole")

    // -----------  validationSchema
    const validationSchema = yup.object({
        policyType: yup.string().required("Obligatorio"),
        policyStartDate: yup.date().required("Obligatorio"),
        policyEndDate: yup.date().required("Obligatorio"),
        policyStatus: yup.string().required("Obligatorio"),
        coverageAmounts: yup.number().required("Obligatorio"),
        deductibles: yup.number().required("Obligatorio"),
        limits: yup.number().required("Obligatorio"),
        insuredPersonName: yup.string().required("Obligatorio"),
        insuredPersonDateOfBirth: yup.date().required("Obligatorio"),
        relationshipToTheInsured: yup.string().required("Obligatorio"),
        phoneNumber: yup.string().matches(/^[0-9]{11}$/, 'Inválido').required('Obligatorio'),
        emailAddress: yup.string().email('Inválido').required("Obligatorio"),
        additionalPhoneNumber: yup.string().matches(/^[0-9]{11}$/, 'Inválido ej:56912345678'),
        additionalEmailAddress: yup.string().email('Inválido'),
        underwriterPhone: yup.string().matches(/^[0-9]{11}$/, 'Inválido'),
        underwriterEmail: yup.string().email('Inválido')
    });

    // -----------   initialValues
    const initialValues = {
        policyType: "",
        policyStartDate: "",
        policyEndDate: "",
        policyStatus: "",
        coverageAmounts: "",
        deductibles: "",
        limits: "",
        insuredPersonName: "",
        insuredPersonDateOfBirth: "",
        phoneNumber: "",
        emailAddress: "",
        instagramProfile: "",
        twitterProfile: "",
        relationshipToTheInsured: "",
        additionalInsuredPersonName: "",
        additionalInsuredDateOfBirth: "",
        additionalRelationshipToTheInsured: "",
        additionalPhoneNumber: "",
        additionalEmailAddress: "",
        additionalInstagramProfile: "",
        additionalTwitterProfile: "",
        premiumAmount: "",
        FrequencyOfPremiumPayments: "",
        underwriterName: "",
        underwriterPhone: "",
        underwriterEmail: "",
        underwriterDecisions: "",
        createdBy: userid,
        contact_id: _id,
        assigned_agent: userid
    };

    // add policy api
    const addPolicy = async (values) => {
        const data = values
        const result = await apipost('policy/add', data)

        setUserAction(result)

        if (result && result.status === 201) {
            toast.success(result.data.message)
            formik.resetForm();
            handleClose();
        }
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addPolicy(values)
        },
    });

    const fetchdata = async () => {
        const result = await apiget(userRole === 'admin' ? `contact/list` : `contact/list/?createdBy=${userid}`)
        if (result && result.status === 200) {
            setContactList(result?.data?.result)
        }
    }
    useEffect(() => {
        fetchdata();
    }, [])
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
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
                    <Typography variant="h6">Nueva </Typography>
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
                                Detalles de la póliza
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Tipo de póliza</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="policyType"
                                            name="policyType"
                                            size='small'
                                            fullWidth
                                            value={formik.values.policyType}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.policyType &&
                                                Boolean(formik.errors.policyType)
                                            }
                                            helperText={
                                                formik.touched.policyType && formik.errors.policyType
                                            }
                                        >
                                            <MenuItem value="Seguro de auto">Seguro de auto</MenuItem>
                                            <MenuItem value="Seguro de salud">Seguro de salud </MenuItem>
                                            <MenuItem value="Seguro de hogar">Seguro de hogar </MenuItem>
                                            <MenuItem value="Seguro de vida">Seguro de vida </MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.policyType && formik.errors.policyType}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Fecha de inicio</FormLabel>
                                    <TextField
                                        name='policyStartDate'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        value={formik.values.policyStartDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.policyStartDate && Boolean(formik.errors.policyStartDate)}
                                        helperText={formik.touched.policyStartDate && formik.errors.policyStartDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Fecha de vencimiento</FormLabel>
                                    <TextField
                                        name='policyEndDate'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        value={formik.values.policyEndDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.policyEndDate && Boolean(formik.errors.policyEndDate)}
                                        helperText={formik.touched.policyEndDate && formik.errors.policyEndDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Estado</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="policyStatus"
                                            name="policyStatus"
                                            size='small'
                                            fullWidth
                                            value={formik.values.policyStatus}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.policyStatus &&
                                                Boolean(formik.errors.policyStatus)
                                            }
                                            helperText={
                                                formik.touched.policyStatus && formik.errors.policyStatus
                                            }
                                        >
                                            <MenuItem value="Activa">Activa</MenuItem>
                                            <MenuItem value="Inactiva">Inactiva </MenuItem>
                                            <MenuItem value="Cancelada">Cancelada </MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.policyStatus && formik.errors.policyStatus}</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Detalle de cobertura
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Monto de cobertura</FormLabel>
                                    <TextField
                                        id="coverageAmounts"
                                        name="coverageAmounts"
                                        size='small'
                                        type='number'
                                        fullWidth
                                        value={formik.values.coverageAmounts}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.coverageAmounts &&
                                            Boolean(formik.errors.coverageAmounts)
                                        }
                                        helperText={
                                            formik.touched.coverageAmounts && formik.errors.coverageAmounts
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Deducibles</FormLabel>
                                    <TextField
                                        id="deductibles"
                                        name="deductibles"
                                        size='small'
                                        type='number'
                                        fullWidth
                                        value={formik.values.deductibles}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.deductibles &&
                                            Boolean(formik.errors.deductibles)
                                        }
                                        helperText={
                                            formik.touched.deductibles && formik.errors.deductibles
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Límite</FormLabel>
                                    <TextField
                                        id="limits"
                                        name="limits"
                                        size='small'
                                        type='number'
                                        fullWidth
                                        value={formik.values.limits}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.limits &&
                                            Boolean(formik.errors.limits)
                                        }
                                        helperText={
                                            formik.touched.limits && formik.errors.limits
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Detalles del asegurado
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Nombre persona</FormLabel>
                                    <TextField
                                        name='insuredPersonName'
                                        size='small'
                                        fullWidth
                                        value={formik.values.insuredPersonName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.insuredPersonName && Boolean(formik.errors.insuredPersonName)}
                                        helperText={formik.touched.insuredPersonName && formik.errors.insuredPersonName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Fecha de Nacimiento</FormLabel>
                                    <TextField
                                        name='insuredPersonDateOfBirth'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        value={formik.values.insuredPersonDateOfBirth}
                                        onChange={formik.handleChange}
                                        error={formik.touched.insuredPersonDateOfBirth && Boolean(formik.errors.insuredPersonDateOfBirth)}
                                        helperText={formik.touched.insuredPersonDateOfBirth && formik.errors.insuredPersonDateOfBirth}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Relación con el asegurado</FormLabel>
                                    <TextField
                                        id="relationshipToTheInsured"
                                        name="relationshipToTheInsured"
                                        size='small'
                                        fullWidth
                                        value={formik.values.relationshipToTheInsured}
                                        onChange={formik.handleChange}
                                        error={formik.touched.relationshipToTheInsured && Boolean(formik.errors.relationshipToTheInsured)}
                                        helperText={formik.touched.relationshipToTheInsured && formik.errors.relationshipToTheInsured}
                                    />
                                </Grid>

                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Información de contacto del asegurado
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Teléfono</FormLabel>
                                    <TextField
                                        id=""
                                        name="phoneNumber"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Correo</FormLabel>
                                    <TextField
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="email"
                                        size='small'
                                        fullWidth
                                        value={formik.values.emailAddress}
                                        onChange={formik.handleChange}
                                        error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                                        helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Instagram</FormLabel>
                                    <TextField
                                        id="instagramProfile"
                                        name="instagramProfile"
                                        type=""
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
                                        type=""
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
                                Asegurado adicional
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Nombre persona</FormLabel>
                                    <TextField
                                        id="additionalInsuredPersonName"
                                        name="additionalInsuredPersonName"
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalInsuredPersonName}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Fecha de nacimiento</FormLabel>
                                    <TextField
                                        name='additionalInsuredDateOfBirth'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalInsuredDateOfBirth}
                                        onChange={formik.handleChange}
                                        error={formik.touched.additionalInsuredDateOfBirth && Boolean(formik.errors.additionalInsuredDateOfBirth)}
                                        helperText={formik.touched.additionalInsuredDateOfBirth && formik.errors.additionalInsuredDateOfBirth}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Relación con el asegurado</FormLabel>
                                    <TextField
                                        id="additionalRelationshipToTheInsured"
                                        name="additionalRelationshipToTheInsured"
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalRelationshipToTheInsured}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Información de contacto del asegurado adicional
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Teléfono</FormLabel>
                                    <TextField
                                        id="additionalPhoneNumber"
                                        name="additionalPhoneNumber"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalPhoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.additionalPhoneNumber && Boolean(formik.errors.additionalPhoneNumber)}
                                        helperText={formik.touched.additionalPhoneNumber && formik.errors.additionalPhoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Correo</FormLabel>
                                    <TextField
                                        id="additionalEmailAddress"
                                        name="additionalEmailAddress"
                                        type="email"
                                        size='small'
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
                                        id="additionalInstagramProfile"
                                        name="additionalInstagramProfile"
                                        type=""
                                        size='small'
                                        fullWidth
                                        onChange={(e) => formik.setFieldValue('additionalInstagramProfile', `${e.target.value}`)}
                                    />
                                    {formik.values.additionalInstagramProfile && <a href={`https://www.instagram.com/${formik.values.additionalInstagramProfile}`} target="_blank" rel="noreferrer">Link</a>}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Twitter</FormLabel>
                                    <TextField
                                        id="additionalTwitterProfile"
                                        name="additionalTwitterProfile"
                                        type=""
                                        size='small'
                                        fullWidth
                                        onChange={(e) => formik.setFieldValue('additionalTwitterProfile', `${e.target.value}`)}
                                    />
                                    {formik.values.additionalTwitterProfile && <a href={`https://twitter.com/${formik.values.additionalTwitterProfile}`} target="_blank" rel="noreferrer">Link</a>}
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Primas y Pagos de la Póliza
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Importe de la prima</FormLabel>
                                    <TextField
                                        id="premiumAmount"
                                        name="premiumAmount"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.premiumAmount}
                                        onChange={formik.handleChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Frecuencia de pago</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="FrequencyOfPremiumPayments"
                                            name="FrequencyOfPremiumPayments"
                                            label=""
                                            size='small'
                                            value={formik.values.FrequencyOfPremiumPayments}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="Mensual">Mensual</MenuItem>
                                            <MenuItem value="Semestral">Semestral </MenuItem>
                                            <MenuItem value="Anual">Anual </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Información del Suscriptor
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Nombre</FormLabel>
                                    <TextField
                                        id=""
                                        name="underwriterName"
                                        type=""
                                        fullWidth
                                        size='small'
                                        value={formik.values.underwriterName}
                                        onChange={formik.handleChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Teléfono</FormLabel>
                                    <TextField
                                        id=""
                                        name="underwriterPhone"
                                        type="number"
                                        fullWidth
                                        size='small'
                                        value={formik.values.underwriterPhone}
                                        onChange={formik.handleChange}
                                        error={formik.touched.underwriterPhone && Boolean(formik.errors.underwriterPhone)}
                                        helperText={formik.touched.underwriterPhone && formik.errors.underwriterPhone}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Correo</FormLabel>
                                    <TextField
                                        id=""
                                        name="underwriterEmail"
                                        type=""
                                        fullWidth
                                        size='small'
                                        value={formik.values.underwriterEmail}
                                        onChange={formik.handleChange}
                                        error={formik.touched.underwriterEmail && Boolean(formik.errors.underwriterEmail)}
                                        helperText={formik.touched.underwriterEmail && formik.errors.underwriterEmail}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Observaciones del suscriptor</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="underwriterDecisions"
                                            name="underwriterDecisions"
                                            label=""
                                            size='small'
                                            value={formik.values.underwriterDecisions}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="Policyholder has a clean driving record">El tomador del seguro tiene un historial limpio de conducción</MenuItem>
                                            <MenuItem value="Policyholder's property located in a low-risk area">La propuedad del tomador se encuentra en una zona de bajo riesgo</MenuItem>
                                            <MenuItem value="Underwriter consulted with the claims department to assess potential risks.">El tomador consultó con el departamento de sinistros para evaluar riesgos potenciales</MenuItem>
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