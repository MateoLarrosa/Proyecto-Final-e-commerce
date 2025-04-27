// src/components/Layout.jsx

import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f3f3f3' }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          maxWidth: '100%',
          mx: 'auto',
          p: 2,
          overflowX: 'hidden',
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
