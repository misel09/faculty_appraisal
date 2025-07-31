import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Alert,
  Avatar,
  Tabs,
  Tab,
  Stack,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  TextField,
  Tooltip,
  useTheme,
  Card,
  CardContent
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  School as SchoolIcon,
  Comment as CommentIcon
} from '@mui/icons-material';
import './Admin.css';

const AdminAppraisals = () => {
  const theme = useTheme();
  const [appraisals, setAppraisals] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppraisal, setSelectedAppraisal] = useState(null);
  const [dialogMode, setDialogMode] = useState('view'); // 'view' | 'accept' | 'reject'
  const [response, setResponse] = useState('');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const allAppraisals = JSON.parse(localStorage.getItem('appraisals')) || [];
    setAppraisals(allAppraisals);
  }, []);

  const handleOpenDialog = (appraisal, mode = 'view') => {
    setSelectedAppraisal(appraisal);
    setDialogMode(mode);
    setResponse('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAppraisal(null);
    setResponse('');
    setError('');
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this appraisal?')) return;
    const allAppraisals = JSON.parse(localStorage.getItem('appraisals') || '[]');
    const filtered = allAppraisals.filter(a => a.id !== id);
    localStorage.setItem('appraisals', JSON.stringify(filtered));
    setAppraisals(filtered);
  };

  const handleResponse = (status) => {
    if (!response.trim()) {
      setError('Please provide a response message');
      return;
    }

    try {
      const allAppraisals = JSON.parse(localStorage.getItem('appraisals')) || [];
      const updated = allAppraisals.map(a =>
        a.id === selectedAppraisal.id
          ? {
              ...a,
              status: status,
              adminResponse: response,
              adminResponseDate: new Date().toISOString()
            }
          : a
      );

      localStorage.setItem('appraisals', JSON.stringify(updated));
      setAppraisals(updated);
      setSuccess(`Appraisal ${status === 'accepted' ? 'accepted' : 'rejected'} successfully!`);
      handleCloseDialog();
    } catch {
      setError('Failed to update appraisal status');
    }
  };

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const filteredAppraisals = appraisals.filter(appraisal => {
    if (tabValue === 0) return true;
    if (tabValue === 1) return appraisal.status === 'pending';
    if (tabValue === 2) return appraisal.status === 'accepted';
    if (tabValue === 3) return appraisal.status === 'rejected';
    return true;
  });

  return (
    <Box className="appraisal-management-container">
      <Container maxWidth="lg">
        <Paper sx={{ p: 3, mb: 4, background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`, color: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'white', color: theme.palette.primary.main, fontSize: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <AssessmentIcon />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" fontWeight={600}>Faculty Appraisals</Typography>
              <Typography variant="subtitle1">Review and manage faculty appraisals</Typography>
            </Grid>
          </Grid>
        </Paper>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Paper sx={{ mb: 3, borderRadius: '12px' }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
            <Tab label="All Appraisals" />
            <Tab label="Pending" />
            <Tab label="Accepted" />
            <Tab label="Rejected" />
          </Tabs>
        </Paper>

        <Grid container spacing={3}>
          {filteredAppraisals.map((appraisal) => (
            <Grid item xs={12} key={appraisal.id}>
              <Card sx={{ borderRadius: '12px', transition: '0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8}>
                      <Stack spacing={1}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Typography variant="h6" fontWeight={600}>{appraisal.title}</Typography>
                          <Chip label={appraisal.status.toUpperCase()} color={getStatusColor(appraisal.status)} size="small" />
                        </Box>
                        <Typography variant="body2">{appraisal.description}</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                          <Chip icon={<PersonIcon />} label={appraisal.facultyName} size="small" />
                          <Chip icon={<PersonIcon />} label={appraisal.reviewerName} size="small" />
                          <Chip icon={<CalendarIcon />} label={new Date(appraisal.date).toLocaleDateString()} size="small" />
                          <Chip icon={<SchoolIcon />} label={appraisal.department} size="small" />
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Tooltip title="View Details">
                          <IconButton color="primary" onClick={() => handleOpenDialog(appraisal, 'view')}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        {appraisal.status === 'pending' && (
                          <>
                            <Button variant="contained" color="success" startIcon={<CheckCircleIcon />} onClick={() => handleOpenDialog(appraisal, 'accept')}>
                              Accept
                            </Button>
                            <Button variant="contained" color="error" startIcon={<CancelIcon />} onClick={() => handleOpenDialog(appraisal, 'reject')}>
                              Reject
                            </Button>
                            <Tooltip title="Delete Appraisal">
                              <IconButton color="error" onClick={() => handleDelete(appraisal.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box display="flex" alignItems="center" gap={1}>
              <CommentIcon color="primary" />
              <Typography variant="h6" fontWeight={600}>
                {dialogMode === 'view' ? 'View Details' : 'Admin Response'}
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            {selectedAppraisal ? (
              <Box display="flex" flexDirection="column" gap={2}>

              {/* Faculty Info */}
              <Typography variant="h6">Faculty Details</Typography>
              <Typography><strong>Name:</strong> {selectedAppraisal.facultyName}</Typography>
              <Typography><strong>Email:</strong> {selectedAppraisal.facultyId}</Typography>
              <Typography><strong>Course:</strong> {selectedAppraisal.course}</Typography>
              <Typography><strong>Department:</strong> {selectedAppraisal.department}</Typography>
              <Typography><strong>Semester:</strong> {selectedAppraisal.semester}</Typography>

              <Divider />

              <Typography variant="h6">Title</Typography>
              <Typography><strong>Title:</strong> {selectedAppraisal.title || 'N/A'}</Typography>

              <Divider />
              {/* Teaching Info */}
              <Typography variant="h6">Teaching Performance</Typography>
              <Typography><strong>Courses:</strong> {selectedAppraisal.teaching?.courses?.join(', ') || 'N/A'}</Typography>
              <Typography><strong>Total Students:</strong> {selectedAppraisal.teaching?.totalStudents || 'N/A'}</Typography>
              <Typography><strong>Teaching score:</strong> {selectedAppraisal.teaching?.teachingScore || 'N/A'}</Typography>

              <Divider />

              {/* Research Info */}
              <Typography variant="h6">Research</Typography>
              <Typography><strong>Projects:</strong> {selectedAppraisal.research?.projects?.join(', ') || 'N/A'}</Typography>
              <Typography><strong>Research Score:</strong> {selectedAppraisal.research?.researchScore || 'N/A'}</Typography>

              <Divider />

              {/* Service Info */}
              <Typography variant="h6">Service</Typography>
              <Typography><strong>Committees:</strong> {selectedAppraisal.service?.committees?.join(', ') || 'N/A'}</Typography>
              <Typography><strong>Avg. feedback:</strong> {selectedAppraisal.service?.averageFeedback || 'N/A'}</Typography>
              <Typography><strong>Service Score:</strong> {selectedAppraisal.service?.serviceScore || 'N/A'}</Typography>
              <Divider />

            

                {dialogMode !== 'view' && (
                  <TextField
                    label="Response"
                    fullWidth
                    multiline
                    rows={3}
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Write your response..."
                  />
                )}
              </Box>
            ) : (
              <Typography>No appraisal selected.</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
            {dialogMode === 'accept' && (
              <Button variant="contained" color="success" onClick={() => handleResponse('accepted')}>
                Submit Accept
              </Button>
            )}
            {dialogMode === 'reject' && (
              <Button variant="contained" color="error" onClick={() => handleResponse('rejected')}>
                Submit Reject
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminAppraisals;
