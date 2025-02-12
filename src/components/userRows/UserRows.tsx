import React from 'react';
import { User } from '../../apiService/apiServices';

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
        <tr className="table-row">
            <td className="table-cell">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedUser.name || ''}
                        onChange={(e) => onEditChange('name', e.target.value)}
                        className="search-input"
                    />
                ) : (
                    user.name
                )}
            </td>
            <td className="table-cell">
                {isEditing ? (
                    <input
                        type="email"
                        value={editedUser.email || ''}
                        onChange={(e) => onEditChange('email', e.target.value)}
                        className="search-input"
                    />
                ) : (
                    user.email
                )}
            </td>
            <td className="table-cell">
                {isEditing ? (
                    <div className="flex space-x-2">
                        <button onClick={() => onSave(user.id)} className="button button-save">
                            Save
                        </button>
                        <button onClick={onCancel} className="button button-cancel">
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="flex space-x-2">
                        <button onClick={() => onEdit(user)} className="button button-edit">
                            Edit
                        </button>
                        <button onClick={() => onDelete(user.id)} className="button button-delete">
                            Delete
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default UserRow;
