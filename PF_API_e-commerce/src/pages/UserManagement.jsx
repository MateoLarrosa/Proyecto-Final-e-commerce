import { Box, Typography, Button } from '@mui/material';
import UserTable from '../components/UserTable';

const dummyUsers = [
  { name: 'Juan Pérez', email: 'juan@example.com', role: 'Administrador' },
  { name: 'Ana Gómez', email: 'ana@example.com', role: 'Cliente' },
  { name: 'Carlos Díaz', email: 'carlos@example.com', role: 'Cliente' }
];

const UserManagement = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#232f3e' }}>
        Gestión de Usuarios
      </Typography>
      <Button variant="contained" sx={{ backgroundColor: '#febd69', color: '#232f3e' }}>
        Agregar Usuario
      </Button>
      <UserTable users={dummyUsers} />
    </Box>
  );
};

export default UserManagement;
