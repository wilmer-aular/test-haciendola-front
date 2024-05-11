import * as yup from 'yup'

import { Alert, Box, Button, Typography } from "@mui/material";

import { Icon } from '@iconify/react';
import InputPassword from './InputPassword';
import { LinkStyled } from './AuthIllustrationWrapper';
import TextField from '@mui/material/TextField';
import { useAuthContent } from "../../core/layout/AuthContext";
import { useForm } from 'react-hook-form'
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().email().required('Email es requerido'),
  password: yup.string().min(5).max(10).required('Contraseña es requerida')
})

const LoginForm = () => {
  const auth = useAuthContent();
  const [loading, setLoading] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async(data: any) => {
    try {
      setLoading(true);
      await auth.login(data);
    } catch (error) {
      setShowErrorMessage(true);
    } finally {
      setLoading(false);
    }
  }

  return <>
   {showErrorMessage ? 
    <Alert severity="warning" sx={{ py: 3, mb: 2, '& .MuiAlert-message': { p: 0 } }}>
      <Typography variant='body2' sx={{ color: 'warning.main' }}>
        ¡Ops! Se produjo un error al iniciar sesión, verifique su nombre de usuario o contraseña.
      </Typography>
    </Alert>
    : <></>}
  <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('email')}
        label='Email'
        variant='outlined'
        size='small'
        fullWidth
        sx={{ mb: 2 }}
        error={Boolean(errors.email)}
        placeholder='john.doe@gmail.com'
        helperText={<>{errors.email?.message}</>}
      />
     <Box sx={{ mb: 4 }}>
        <InputPassword register={register} errors={errors}/>
      </Box>
      
      <Button fullWidth type='submit' variant='contained' startIcon={loading ? <Icon icon="eos-icons:loading" /> : <></>} >
        <Typography color={'white'} fontWeight={600}>Login</Typography>
      </Button>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Typography sx={{ color: 'text.secondary', mr: 2 }}>¿Eres nuevo en Haciendola?</Typography>
        <Typography href='/register' component={LinkStyled}>
        ¡Regístrate ahora!
        </Typography>
      </Box>
    </form>
  </>
}

export default LoginForm;
