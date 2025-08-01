/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
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
                <Typography variant="body1">Asunto :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.subject ? data?.subject : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
                <Typography variant="body1">Fecha inicio :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >
                  {
                    data?.startDate ? moment(data?.startDate).format('lll') : "--"
                  }
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Nota :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.note ? data?.note : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1"> Usuario:</Typography>
                <Typography variant="body2" color={Palette.primary.main} >
                  <Link to={`/dashboard/user/view/${data?.assignTo?._id}`} style={{ textDecoration: "none" }}>
                    <Typography variant="body2" color={Palette.primary.main} textTransform={"capitalize"}>{`${data?.assignTo?.firstName} ${data?.assignTo?.lastName}`}</Typography>
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Estado :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.status ? data?.status : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Fecha término :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >
                  {
                    data?.endDate ? moment(data?.endDate).format('lll') : "--"
                  }
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Prioridad :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.priority ? data?.priority : "--"}</Typography>
              </Grid>
              {
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">Cliente {data?.lead_id?._id ? 'Lead' : ''} :</Typography>
                  {
                    data?.relatedTo === "Lead" ?
                      <Link to={`/dashboard/lead/view/${data?.lead_id?._id}`} style={{ textDecoration: "none" }}>
                        <Typography variant="body2" color={Palette.primary.main} textTransform={"capitalize"}>{`${data?.lead_id?.firstName} ${data?.lead_id?.lastName}`}</Typography>
                      </Link>
                      :
                      <Link to={`/dashboard/contact/view/${data?.contact_id?._id}`} style={{ textDecoration: "none" }}>
                        <Typography variant="body2" color={Palette.primary.main} textTransform={"capitalize"}>{`${data?.contact_id?.firstName} ${data?.contact_id?.lastName}`}</Typography>
                      </Link>

                  }
                </Grid>
              }

            </Grid>
          </Grid>
        </Box>
      </Card>
    </div >
  )
}

export default Overview
