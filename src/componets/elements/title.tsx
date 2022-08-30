// Material components
import Typography from '@mui/material/Typography';

interface TitleProps {
  text: string;
  align?: string;
}

function Title({ text, align }: TitleProps): JSX.Element {
  return (
    <Typography
      variant='h6'
      noWrap
      component='a'
      sx={{
        mr: 2,
        display: 'flex',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
        alignItems: 'center',
        flexDirection: align !== undefined ? align : 'initial',
      }}
    >
      {text}
    </Typography>
  );
}

export default Title;
