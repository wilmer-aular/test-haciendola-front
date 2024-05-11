import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

import { Icon } from '@iconify/react'

const ConfirmDeleteDialog = ({open, onClose, title, children, action, titleAction='Eliminar', loading=false}: any) => {
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth={'sm'}
      transitionDuration={500}
      PaperProps={{
        style: {
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: open ? 1 : 0,
          borderRadius: 8,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <DialogTitle sx={{backgroundColor: 'error.main'}}>
        <Typography fontWeight={600} fontSize={20} color='#fff' sx={{my: 2}}>{title}</Typography>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
          <Button onClick={onClose} color="error">Cancelar</Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={action}
            startIcon={loading ? <Icon icon='eos-icons:loading' /> : <></>}
          >
            {titleAction}
          </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
