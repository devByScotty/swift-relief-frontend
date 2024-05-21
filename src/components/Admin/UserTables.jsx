// UserTable.js
import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './UserTable.css';

const UserTable = ({ users, onDelete, onEdit }) => {
  const handleDelete = (userId) => {
    onDelete(userId);
    message.success('User deleted successfully!');
  };

  const handleEdit = (userId) => {
    onEdit(userId);
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>


          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
