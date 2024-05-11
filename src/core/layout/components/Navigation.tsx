import * as React from 'react';

import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import { styled, useTheme } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CustomChip from '../../components/chip';
import Divider from '@mui/material/Divider'
import Icon from '../../components/icon';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { handlerName } from '../../utils/util';
import toast from "react-hot-toast";
import { useAuthContent } from '../AuthContext';

const pages: string[] = [];

const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const MenuItemStyled = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}))

function Navigation() {
  const theme = useTheme();
  const { user, logout } = useAuthContent();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlerLogout = () => {
    handleCloseUserMenu();
    logout();
  };
  
  const Img = styled('img')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
      height: 40,
    },
    [theme.breakpoints.down('md')]: {
      height: 25
    },
    [theme.breakpoints.down('xs')]: {
      height: 20,
    }
  }));

  const styles = {
    px: 2,
    py: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 1.5,
      fontSize: '1.5rem',
      color: 'text.secondary'
    }
  };

  const handleDropdownClose = (url?: string) => {
    toast.success('Will be available soon')
  };

  return (
    <AppBar position="static" elevation={0} sx={{background: 'transparent', boxShadow: 'none'}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{mt: {lg: 2, xs: 0}}}>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{color: theme.palette.grey[500]}}/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{mr: 2, flexGrow: 1,}}>
            <Img alt='Logo' src='/images/logo-haciendola.webp'/>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <Box>
              <Typography sx={{
                display: {xs: 'none', md: 'block', 
                color: theme.palette.grey[200]},
                mt: 1,
                mr: 2
              }}>
                Bienvenido, <strong>{handlerName(`${user?.name} ${user?.lastName}`)}</strong>
              </Typography>
            </Box>
            
            <Tooltip title="Open settings">
              <Badge
                overlap='circular'
                onClick={handleOpenUserMenu}
                sx={{ ml: 2, cursor: 'pointer' }}
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <Avatar
                  alt={user?.name}
                  src={user?.photoUrl}
                  onClick={handleOpenUserMenu}
                  sx={{ width: 38, height: 38 }}
                />
              </Badge>
            </Tooltip>
            <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu()}
                sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.75 } }}
                anchorOrigin={{ vertical: 'top',  horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Box sx={{ py: 1, px: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge
                      overlap='circular'
                      badgeContent={<BadgeContentSpan />}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                    >
                      <Avatar alt={user?.name} src={user?.photoUrl} sx={{ width: '2.5rem', height: '2.5rem' }} />
                    </Badge>
                    <Box sx={{ display: 'flex', ml: 2, alignItems: 'flex-start', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500 }} fontSize={13}>{user?.name ?? 'Welcome'}</Typography>
                      <CustomChip
                        size='small'
                        skin='light'
                        color={'primary'}
                        label={user?.type}
                      />
                    </Box>
                  </Box>
                </Box>
                <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
                <MenuItemStyled sx={{ p: 0 }} onClick={handlerLogout}>
                  <Box sx={styles}>
                    <Icon icon='tabler:logout' fontSize={10}/>
                    <Typography fontSize={13} textAlign="center">Logout</Typography>
                  </Box>
                </MenuItemStyled>
              </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;