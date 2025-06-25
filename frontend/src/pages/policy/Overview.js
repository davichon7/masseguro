/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import Palette from '../../theme/palette'


// eslint-disable-next-line arrow-body-style
const Overview = ({ data }) => {
  return (
    <div>
      <Card style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
        <Box p={3}>
          <Grid container display="flex" spacing={4}>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Número :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.policyNumber ? data?.policyNumber : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
                <Typography variant="body1">Tipo :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.policyType ? data?.policyType : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Fecha de inicio :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >
                  {
                    data?.policyStartDate ? dayjs(data?.policyStartDate).format("DD/MM/YYYY") : "--"
                  }
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
                <Typography variant="body1">Deducibles :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.deductibles ? data?.deductibles : "--"}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Vencimiento :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >
                  {
                    data?.policyEndDate ? dayjs(data?.policyEndDate).format("DD/MM/YYYY") : "--"
                  }
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Estado :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.policyStatus ? data?.policyStatus : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Cobertura  :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.coverageAmounts ? data?.coverageAmounts : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Límite  :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.limits ? data?.limits : "--"}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  )
}

export default Overview
