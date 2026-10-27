const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  updatePerformance,
  deactivateEmployee,
  getManagersList,
} = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('manager', 'hr'), getEmployees);
router.get('/managers-list', protect, authorize('hr'), getManagersList);
router.get('/:id', protect, getEmployeeById);
router.post('/', protect, authorize('hr'), createEmployee);
router.put('/:id', protect, authorize('hr'), updateEmployee);
router.put('/:id/performance', protect, authorize('manager', 'hr'), updatePerformance);
router.delete('/:id', protect, authorize('hr'), deactivateEmployee);

module.exports = router;
