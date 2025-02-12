import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchUsers, User } from '../../apiService/apiServices';
import logo from '../../assets/ibcs.png';
import './Dashboard.styles';
import SearchInput from '../../components/searchInput/SearchInput';
import UserRow from '../../components/userRows/UserRows';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UserForm from '../../components/UserForms/userForm';
import {
    DashboardContainer,
    HeaderDiv,
    LogoContainer,
    DashboardTitle,
    TableContainer,
    PaginationContainer,
    PaginationButton,
    PaginationInfo,
    SpaceBelowSearch,
} from './Dashboard.styles';

const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'ascending' | 'descending'; } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [editedUser, setEditedUser] = useState<Partial<User>>({});
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [openUserForm, setOpenUserForm] = useState(false);

    useEffect(() => {
        fetchUsers()
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const sortedUsers = useMemo(() => {
        let sortableUsers = [...users];
        if (sortConfig !== null) {
            sortableUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    }, [users, sortConfig]);

    const filteredUsers = useMemo(() => {
        return sortedUsers.filter(
            (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, sortedUsers]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const currentUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, filteredUsers]);

    const requestSort = useCallback(
        (key: keyof User) => {
            let direction: 'ascending' | 'descending' = 'ascending';
            if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
                direction = 'descending';
            }
            setSortConfig({ key, direction });
        },
        [sortConfig]
    );

    const handleEditClick = (user: User) => {
        setEditingUserId(user.id);
        setEditedUser({ name: user.name, email: user.email });
    };

    const handleSaveClick = (id: number) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, ...editedUser } : user
            )
        );
        setEditingUserId(null);
        setEditedUser({});
    };

    const handleDeleteRequest = (user: User) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirmed = () => {
        if (userToDelete) {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
            setSnackbarOpen(true);
        }
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const handleEditChange = (field: keyof User, value: string) => {
        setEditedUser((prev) => ({ ...prev, [field]: value }));
    };

    // Callback when a new user is created in the form
    const handleUserCreated = (newUser: User) => {
        setUsers((prevUsers) => [newUser, ...prevUsers]);
    };

    if (loading) return <LoadingScreen />;
    if (error) return <DashboardContainer>Error: {error}</DashboardContainer>;

    return (
        <DashboardContainer>
            <HeaderDiv>
                <LogoContainer>
                    <img src={logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
                </LogoContainer>
                <DashboardTitle variant="h1">User Dashboard</DashboardTitle>
            </HeaderDiv>

            <SearchInput
                searchTerm={searchTerm}
                onSearchChange={(value) => {
                    setSearchTerm(value);
                    setCurrentPage(1);
                }}
            />

            <SpaceBelowSearch />

            <TableContainer>
                <table>
                    <thead>
                    <tr>
                        <th onClick={() => requestSort('name')}>
                            Name {sortConfig?.key === 'name' && (sortConfig.direction === 'ascending' ? <FiArrowUp /> : <FiArrowDown />)}
                        </th>
                        <th onClick={() => requestSort('email')}>
                            Email {sortConfig?.key === 'email' && (sortConfig.direction === 'ascending' ? <FiArrowUp /> : <FiArrowDown />)}
                        </th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentUsers.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            isEditing={editingUserId === user.id}
                            editedUser={editedUser}
                            onEdit={handleEditClick}
                            onSave={handleSaveClick}
                            onCancel={() => setEditingUserId(null)}
                            onDelete={handleDeleteRequest}
                            onEditChange={handleEditChange}
                        />
                    ))}
                    </tbody>
                </table>
            </TableContainer>

            <PaginationContainer>
                <PaginationButton
                    variant="contained"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </PaginationButton>
                <PaginationInfo>
                    Page {currentPage} of {totalPages}
                </PaginationInfo>
                <PaginationButton
                    variant="contained"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </PaginationButton>
            </PaginationContainer>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete {userToDelete?.name}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirmed} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for deletion notification */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="User has been deleted"
            />


            <Fab
                color="primary"
                aria-label="add"
                onClick={() => setOpenUserForm(true)}
                style={{ position: 'fixed', bottom: 20, right: 20 }}
            >
                <AddIcon />
            </Fab>

            <UserForm
                open={openUserForm}
                onClose={() => setOpenUserForm(false)}
                onUserCreated={handleUserCreated}
            />
        </DashboardContainer>
    );
};

export default Dashboard;
