import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#232f3e', color: 'white', p: 2}}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 1 }}>
        <Link href="#" color="inherit" underline="hover">Inicio</Link>
        <Link href="#" color="inherit" underline="hover">Condiciones de uso</Link>
        <Link href="#" color="inherit" underline="hover">Aviso de privacidad</Link>
        <Link href="#" color="inherit" underline="hover">FAQs</Link>
        <Link href="#" color="inherit" underline="hover">Acerca de</Link>
      </Box>
      <Typography variant="body2" align="center">
        © 2025 Amazonas, Inc
      </Typography>
    </Box>
  );
};

export default Footer;
