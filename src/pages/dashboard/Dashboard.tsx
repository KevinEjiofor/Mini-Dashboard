import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchUsers, User } from '../../apiService/apiServices';
import logo from '../../assets/ibcs.png';
import './Dashboard.css';
import SearchInput from '../../components/searchInput/SearchInput';
import UserRow from '../../components/userRows/UserRows';

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

    const handleDeleteClick = (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        }
    };

    const handleEditChange = (field: keyof User, value: string) => {
        setEditedUser((prev) => ({ ...prev, [field]: value }));
    };

    if (loading) return <div className="p-4 text-center">Loading...</div>;
    if (error) return <div className="p-4 text-center text-red-600">Error: {error}</div>;

    return (
        <div className="dashboard-container">
            {/* Header with logo and title */}
            <div className="headerDiv">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <h1 className="dashboard-title">User Dashboard</h1>
                <div className="placeholder"></div>
            </div>

            {/* Search Input Component */}
            <SearchInput
                searchTerm={searchTerm}
                onSearchChange={(value) => {
                    setSearchTerm(value);
                    setCurrentPage(1);
                }}
            />

            {/* Responsive Table Container */}
            <div className="table-container">
                <table className="dashboard-table">
                    <thead>
                    <tr>
                        <th className="table-header" onClick={() => requestSort('name')}>
                            Name {sortConfig?.key === 'name' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                        <th className="table-header" onClick={() => requestSort('email')}>
                            Email {sortConfig?.key === 'email' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                        <th className="table-header">Actions</th>
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
                            onDelete={handleDeleteClick}
                            onEditChange={handleEditChange}
                        />
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="pagination-container">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Previous
                </button>
                <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
