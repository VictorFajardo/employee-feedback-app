// React components
import { useAppSelector } from '../../hooks';
// Redux components
import { currentUser } from '../../features/authentication/authenticationSlice';
// Material omponents
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
// Utils
import { stringAvatar } from '../../utilities/stringavatar';

function Header(): JSX.Element {
  const user = useAppSelector(currentUser); // Select the current user to verify level access

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DASHBOARD
          </Typography>
          {user !== null && (
            <>
              <Box
                sx={{
                  flexGrow: 1,
                  mr: 2,
                  display: 'flex',
                  flexDirection: 'row-reverse',
                }}
              >
                <Typography
                  noWrap
                  component='a'
                  sx={{
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Welcome {user.firstName} {user.lastName}!
                </Typography>
              </Box>
              <Box
                sx={{
                  flexGrow: 0,
                  display: 'flex',
                  flexDirection: 'row-reverse',
                }}
              >
                <Avatar
                  {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                />
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
