import { Box, CardContent, CardProps, Typography, styled } from "@mui/material"

import AuthIllustrationWrapper from '../login/AuthIllustrationWrapper';
import MuiCard from '@mui/material/Card'
import RegisterForm from "./RegisterForm";
import { motion } from 'framer-motion';

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))


const RegisterView = () => {

  return (
    <Box className='content-center'>
      <AuthIllustrationWrapper>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Card sx={{width: {lg: 500, xs: '100%'}}}>
            <CardContent sx={{ p: theme => `${theme.spacing(3, 6, 6)} !important` }}>
              <Box sx={{ mt: 3, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Aqui la imagen de logo */}
              <img alt='logo' src="/images/logo-haciendola.webp" height={45} /> 
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography variant='h4' sx={{ mb: 1.5, fontSize: {lg: 22, xs: 20},color: 'text.secondary' }}>
                  {`Registrate! 👋🏻`}
                </Typography>
              </Box>
              <RegisterForm />
            </CardContent>
          </Card>
        </motion.div>
      </AuthIllustrationWrapper>
    </Box>
  )
}
export default RegisterView;