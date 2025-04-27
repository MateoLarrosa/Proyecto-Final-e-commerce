import { AppBar, Toolbar, Typography, Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#232f3e' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Amazonas
        </Typography>
        <Box sx={{ display: 'flex', backgroundColor: '#fff', borderRadius: 1, padding: '0 8px' }}>
          <InputBase placeholder="Buscar en Amazonas" sx={{ ml: 1, flex: 1 }} />
          <IconButton type="submit" sx={{ p: '10px', color: '#232f3e' }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
