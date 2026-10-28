import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Rating,
  Pagination,
  Skeleton,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Star as StarIcon,
  Block as DeactivateIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import axiosClient from '../api/axiosClient';
import EmptyState from '../components/EmptyState';

const Employees = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');

  // Modals
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openPerfModal, setOpenPerfModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  // Add form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'Engineering',
    designation: 'Associate Software Engineer',
    phone: '',
    address: '',
  });

  // Performance review form data
  const [rating, setRating] = useState(4);
  const [perfNotes, setPerfNotes] = useState('');

  const fetchEmployees = async (p = 1, s = '', d = '') => {
    try {
      setLoading(true);
      const query = `/employees?page=${p}&limit=10${s ? `&search=${s}` : ''}${d ? `&department=${d}` : ''}`;
      const res = await axiosClient.get(query);
      if (res.data.success) {
        setEmployees(res.data.employees);
        setPages(res.data.pages || 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(page, search, department);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchEmployees(1, search, department);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password) {
      toast.warning('Please provide a temporary password for the employee account');
      return;
    }
    try {
      await axiosClient.post('/employees', formData);
      setOpenAddModal(false);
      setFormData({
        name: '',
        email: '',
        password: '',
        department: 'Engineering',
        designation: 'Associate Software Engineer',
        phone: '',
        address: '',
      });
      toast.success('Employee account created successfully');
      fetchEmployees(1, search, department);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add employee');
    }
  };

  const handlePerfSubmit = async () => {
    if (!selectedEmp) return;
    try {
      await axiosClient.put(`/employees/${selectedEmp._id}/performance`, {
        performanceRating: rating,
        performanceNotes: perfNotes,
      });
      setOpenPerfModal(false);
      toast.success('Performance review recorded');
      fetchEmployees(page, search, department);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update performance');
    }
  };

  const handleDeactivate = async (empId) => {
    if (window.confirm('Are you sure you want to deactivate this employee account?')) {
      try {
        await axiosClient.delete(`/employees/${empId}`);
        toast.info('Employee account deactivated');
        fetchEmployees(page, search, department);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Deactivation failed');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#f3f4f6' }}>
            Employee Directory
          </Typography>
          <Typography variant="body1" sx={{ color: '#94a3b8', mt: 0.5 }}>
            Browse staff profiles, record performance reviews, and manage team members.
          </Typography>
        </Box>
        {user?.role === 'hr' && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddModal(true)}
            sx={{ py: 1.2, px: 3 }}
          >
            Add New Employee
          </Button>
        )}
      </Box>

      {/* Filter and Search Bar */}
      <Card sx={{ p: 2.5, mb: 3 }}>
        <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search by name, ID, or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 240 }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: '#8b949e', mr: 1 }} />,
            }}
          />
          <TextField
            select
            size="small"
            label="Department"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setPage(1);
              fetchEmployees(1, search, e.target.value);
            }}
            sx={{ width: 200 }}
          >
            <MenuItem value="">All Departments</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Human Resources">Human Resources</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Design">Design</MenuItem>
          </TextField>
          <Button variant="contained" type="submit">
            Filter
          </Button>
        </Box>
      </Card>

      {/* Directory Table */}
      <Card sx={{ p: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Employee ID</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Name & Contact</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Designation</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Performance</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                [1, 2, 3, 4, 5].map((idx) => (
                  <TableRow key={idx}>
                    <TableCell><Skeleton width={80} /></TableCell>
                    <TableCell><Skeleton width={140} /><Skeleton width={100} height={12} /></TableCell>
                    <TableCell><Skeleton width={100} /></TableCell>
                    <TableCell><Skeleton width={120} /></TableCell>
                    <TableCell><Skeleton width={90} /></TableCell>
                    <TableCell><Skeleton width={60} /></TableCell>
                    <TableCell align="right"><Skeleton width={80} sx={{ ml: 'auto' }} /></TableCell>
                  </TableRow>
                ))
              ) : employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ p: 0 }}>
                    <EmptyState
                      icon={<PeopleIcon sx={{ fontSize: 26 }} />}
                      title="No employees found"
                      description="No personnel records match your current search and department filters."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((emp) => (
                  <TableRow key={emp._id}>
                    <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {emp.employeeId}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{emp.user?.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{emp.user?.email}</Typography>
                    </TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>{emp.designation}</TableCell>
                    <TableCell>
                      <Rating value={emp.performanceRating || 4} readOnly size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={emp.user?.status || 'active'}
                        size="small"
                        color={emp.user?.status === 'active' ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                        <Tooltip title="Performance Review">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              setSelectedEmp(emp);
                              setRating(emp.performanceRating || 4);
                              setPerfNotes(emp.performanceNotes || '');
                              setOpenPerfModal(true);
                            }}
                          >
                            <StarIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {user?.role === 'hr' && (
                          <Tooltip title="Deactivate">
                            <IconButton size="small" color="error" onClick={() => handleDeactivate(emp._id)}>
                              <DeactivateIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {pages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={pages}
              page={page}
              onChange={(e, val) => {
                setPage(val);
                fetchEmployees(val, search, department);
              }}
              color="primary"
            />
          </Box>
        )}
      </Card>

      {/* Add Employee Modal (HR Only) */}
      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Add New Employee</DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              required
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              required
              fullWidth
              type="email"
              label="Work Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
              required
              fullWidth
              type="password"
              label="Temporary Password"
              placeholder="e.g. EmployeeTemp123!"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              helperText="Employee can change this after signing in"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Human Resources">Human Resources</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Designation / Role"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSubmit}>
            Create Employee
          </Button>
        </DialogActions>
      </Dialog>

      {/* Performance Review Modal */}
      <Dialog open={openPerfModal} onClose={() => setOpenPerfModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>
          Performance Evaluation: {selectedEmp?.user?.name}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Rating (1 to 5 Stars)
            </Typography>
            <Rating
              value={rating}
              onChange={(e, val) => setRating(val)}
              size="large"
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Evaluation Notes & Feedback"
            value={perfNotes}
            onChange={(e) => setPerfNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenPerfModal(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handlePerfSubmit}>
            Save Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Employees;
