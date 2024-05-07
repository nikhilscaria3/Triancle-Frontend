import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
// Import Checkbox from Material-UI
import Button from '@mui/material/Button';

const UserTableRow = ({ name, role, status, phoneNumber, company, isVerified, selected, handleClick, handleEdit, handleDelete }) => (
  <TableRow
    hover
    role="checkbox"
    aria-checked={selected}
    tabIndex={-1}
    selected={selected}
  >
    <TableCell padding="checkbox">
      <Checkbox
        checked={selected}
        onClick={(event) => handleClick(event, name)}
      />
    </TableCell>
    <TableCell>{name}</TableCell>
    <TableCell>{company}</TableCell>
    <TableCell>{phoneNumber}</TableCell>
    <TableCell>{role}</TableCell>
    <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>
    <TableCell>{status}</TableCell>
    <TableCell>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Button variant="contained" color="primary" onClick={() => handleEdit(name, role, status, company)}>
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={() => handleDelete(name)}>
          Delete
        </Button>
      </div>
    </TableCell>
  </TableRow>
);

UserTableRow.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};


export default UserTableRow;
