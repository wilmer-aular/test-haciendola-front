import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, useTheme } from "@mui/material";

import DeleteProduct from "./DeleteProduct";
import { Icon } from "@iconify/react";
import ModalProduct from "./ModalProduct";
import { getInitials } from '../../../core/utils/get-initials';
import { handlerName } from "../../../core/utils/util";
import { useAuthContent } from "../../../core/layout/AuthContext";

const StaffCard = ({ products}: any) => {
  const theme = useTheme();
  const {user} = useAuthContent();

  return(
    <Card sx={{mb: 3}}>
    <CardContent>
            <Grid container spacing={2} >
                <Grid item lg={3} sm={2} xs={2.5}>
                  <Avatar
                    alt={'Usuario'}
                     src={user?.photoUrl}
                    sx={{ width: {lg: 80, xs: 60}, height: {lg: 80, xs: 60}, mb: 2, fontSize: {lg: '2.5rem', xs: '2rem'} }}
                  >
                    {
                      getInitials(user?.name)
                    }
                  </Avatar>    
                </Grid>
                <Grid item  lg={9} sm={3} xs={6}>
                  <Typography variant='h6' >
                    {handlerName(`${user?.name} ${user?.lastName}`)}
                  </Typography>
                  <Box sx={{mt: 1}} >
                  {
                    user?.email ?
                    <Box  sx={{display: 'flex', mr: 5}}>
                      <Icon icon='iconoir:mail' style={{marginTop: '1px'}} fontSize={20} color={theme.palette.error.dark}/>
                      <Typography sx={{ ml: 1 }} color='grey'>{user?.email}</Typography>
                    </Box>
                    : <></>
                  }
                  {
                    user?.phone ?
                    <Box  sx={{display: 'flex', mr: 5}}>
                      <Icon icon='tabler:phone' style={{marginTop: '1px'}} fontSize={20} color={theme.palette.primary.dark}/>
                      <Typography sx={{ ml: 1 }} color='grey'>{user?.phone}</Typography>
                    </Box>
                    : <></>
                  }
                  </Box>  
                </Grid>
              
              </Grid>
              <Divider sx={{my: 1}}/>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                  <ModalProduct />
                  <DeleteProduct />
              </Box>
    </CardContent>
  </Card>
  );
}

export default StaffCard;

