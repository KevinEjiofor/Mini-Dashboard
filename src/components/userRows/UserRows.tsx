// UserRow.tsx
import React from 'react';
import { IconButton, Tooltip, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { User } from '../../apiService/apiServices';
import { StyledTableRow, StyledTableCell, ActionsCell } from './UserRow.styles';

interface UserRowProps {
    user: User;
    isEditing: boolean;
    editedUser: Partial<User>;
    onEdit: (user: User) => void;
    onSave: (id: number) => void;
    onCancel: () => void;
    onDelete: (id: number) => void;
    onEditChange: (field: keyof User, value: string) => void;
}

const UserRow: React.FC<UserRowProps> = ({
                                             user,
                                             isEditing,
                                             editedUser,
                                             onEdit,
                                             onSave,
                                             onCancel,
                                             onDelete,
                                             onEditChange,
                                         }) => {
    return (
        <StyledTableRow>
            <StyledTableCell>
                {isEditing ? (
                    <TextField
                        value={editedUser.name || ''}
                        onChange={(e) => onEditChange('name', e.target.value)}
                        variant="outlined"
                        size="small"
                    />
                ) : (
                    user.name
                )}
            </StyledTableCell>
            <StyledTableCell>
                {isEditing ? (
                    <TextField
                        type="email"
                        value={editedUser.email || ''}
                        onChange={(e) => onEditChange('email', e.target.value)}
                        variant="outlined"
                        size="small"
                    />
                ) : (
                    user.email
                )}
            </StyledTableCell>
            <ActionsCell>
                {isEditing ? (
                    <>
                        <Tooltip title="Save">
                            <IconButton onClick={() => onSave(user.id)} color="primary" size="small">
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <IconButton onClick={onCancel} color="secondary" size="small">
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Tooltip title="Edit">
                            <IconButton onClick={() => onEdit(user)} color="primary" size="small">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => onDelete(user.id)} color="error" size="small">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </ActionsCell>
        </StyledTableRow>
    );
};

export default UserRow;
