import Icon from '../../core/components/icon';
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField';
import errorMessage from './ErrorMessage';
import { useState } from 'react';

const InputPassword = ({ 
  variant="outlined", 
  name='password', 
  label='Contraseña', 
  errors,  
  size='small',
  register,
  sx= {}
} : any
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <TextField
          sx={sx}
          size={size}
          fullWidth
          {...register(name)}
          label={label}
          id={name}
          variant={variant}
          error={Boolean(errors.password)}
          {...(errors[name] && errorMessage(errors[name].message))}
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
    )
}

export default InputPassword;