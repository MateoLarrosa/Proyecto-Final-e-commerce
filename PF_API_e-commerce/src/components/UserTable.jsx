import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button
  } from '@mui/material';
  
  const UserTable = ({ users, onDeleteClick }) => {
    return (
        <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de usuarios">
          <TableHead sx={{ backgroundColor: '#232f3e' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Rol</TableCell>
              <TableCell sx={{ color: 'white' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => onDeleteClick(user)}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default UserTable;
  