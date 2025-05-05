import { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle,
  DialogContent, TextField, DialogActions
} from '@mui/material';
import UserTable from '../Components/UserTable';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Layout from '../Components/Layout';



const API_URL = 'http://localhost:3001/users';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

  const fetchUsers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    if (newUser.name && newUser.email && newUser.role) {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      const createdUser = await res.json();
      setUsers([...users, createdUser]);
      setNewUser({ name: '', email: '', role: '' });
      setOpenAdd(false);
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      await fetch(`${API_URL}/${selectedUser.id}`, { method: 'DELETE' });
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setSelectedUser(null);
      setOpenDelete(false);
    }
  };

  return (
    <>
      <Layout>
        <Typography variant="h4" gutterBottom sx={{ color: '#232f3e' }}>
          Gestión de Usuarios
        </Typography>
  
        <Button
          variant="contained"
          sx={{ backgroundColor: '#febd69', color: '#232f3e', mb: 2 }}
          onClick={() => setOpenAdd(true)}
        >
          Agregar Usuario
        </Button>
  
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-begin',
                width: '100%',
                overflowX: 'auto',
            }}
            >
                <Box sx={{ width: '100%', maxWidth: '900px' }}>
                    <UserTable users={users} onDeleteClick={handleDeleteClick} />
                </Box>
            </Box>
      </Layout>
  
      {/* Diálogos afuera del layout */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            fullWidth
            name="name"
            value={newUser.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            name="email"
            value={newUser.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Rol"
            fullWidth
            name="role"
            value={newUser.role}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="error">
            Cancelar
          </Button>
          <Button onClick={handleAddUser} variant="contained" sx={{ backgroundColor: '#232f3e' }}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
  
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro que querés eliminar al usuario <strong>{selectedUser?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
  
};

export default UserManagement;
