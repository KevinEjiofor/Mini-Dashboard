// src/components/userForm/UserForm.tsx
import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import { createUser, User } from '../../apiService/apiServices';

interface UserFormProps {
    open: boolean;
    onClose: () => void;
    onUserCreated: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ open, onClose, onUserCreated }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const newUser = await createUser({ name, email });
            onUserCreated(newUser);
            onClose();
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Error creating user:', error);
            // You might show an error message here
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New User</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={loading}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserForm;
