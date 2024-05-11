import * as yup from 'yup'

import { Alert, Button, IconButton, InputAdornment, Typography } from "@mui/material";

import CustomTextField from "../../core/forms/CustomTextField";
import { Icon } from '@iconify/react';
import { useAuthContent } from "../../core/layout/AuthContext";
import { useForm } from 'react-hook-form'
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required')
})

const LoginForm = () => {
  
  const auth = useAuthContent();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
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
      await auth.login({...data, type: 'staff'});
    } catch (error) {
      setShowErrorMessage(true);
    }
  }

  return <>
   {showErrorMessage ? 
    <Alert severity="warning" sx={{ py: 3, mb: 6, '& .MuiAlert-message': { p: 0 } }}>
      <Typography variant='body2' sx={{ color: 'warning.main' }}>
        Ops! There was an error logging in, please check your username or password.
      </Typography>
    </Alert>
    : <></>}
  <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <CustomTextField
        autoFocus
        fullWidth
        label='Email'
        sx={{ mb: 3 }}
        placeholder='john.doe@gmail.com'
        error={Boolean(errors.email)}
        {...register('email')}
        helperText={<>{errors.email?.message}</>}
        
      />
      <CustomTextField
        fullWidth
        sx={{ mb: 1.5 }}
        label='Password'
        {...register('password')}
        error={Boolean(errors.password)}
        helperText={<>{errors.password?.message}</>}
        placeholder='············'
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
             <IconButton
                edge='end'
                onMouseDown={e => e.preventDefault()}
                onClick={() => setShowPassword(!showPassword)}
              >
               <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button fullWidth type='submit' variant='contained' startIcon={loading ? <Icon icon="eos-icons:loading" /> : <></>} >
        <Typography color={'white'} fontWeight={600}>Login</Typography>
      </Button>
    </form>
  </>
}

export default LoginForm;
