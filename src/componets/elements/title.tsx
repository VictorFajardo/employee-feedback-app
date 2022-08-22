// Material components
import Typography from '@mui/material/Typography';

interface TitleProps {
  text: string,
  align?: string,
}

const Title: React.FC<TitleProps> = ({ text, align }) => {
  return (
    <Typography
      variant="h6"
      noWrap
      component="a"
      sx={{
        mr: 2,
        display: 'flex',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
        alignItems: 'center',
        flexDirection: align ? align : 'initial',
      }}
      >
        {text}
    </Typography>
  )
}

export default Title