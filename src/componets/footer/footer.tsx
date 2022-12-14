// Material elements
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SvgIcon from '@mui/material/SvgIcon';
// Material omponents
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const style: React.CSSProperties = {
  position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%',
};

function Footer(): JSX.Element {
  return (
    <footer style={style}>
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'flex',
            margin: 2,
          }}
        >
          <Typography
            noWrap
            component='p'
            sx={{
              display: 'flex',
              fontWeight: 700,
              color: 'inherit',
            }}
          >
            Architect designed and developed by&nbsp;
            <a href='https://www.linkedin.com/in/victorfajardo/' target='_blank' rel='noreferrer'>
              Victor Fajardo
            </a>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <iframe
              src='https://ghbtns.com/github-btn.html?user=victorfajardo&repo=employee-feedback-app&type=star&count=true&size=large'
              frameBorder='0'
              scrolling='0'
              width='120'
              height='30'
              title='GitHub'
            ></iframe>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
              flexDirection: 'row-reverse',
              '& > a': { ml: 1 },
            }}
          >
            <a href='https://www.linkedin.com/in/victorfajardo/' target='_blank' rel='noreferrer'>
              <SvgIcon component={LinkedInIcon} />
            </a>
            <a href='https://github.com/VictorFajardo' target='_blank' rel='noreferrer'>
              <SvgIcon component={GitHubIcon} />
            </a>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;
