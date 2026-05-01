const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createProject, getProjects, getProjectById,
  updateProject, deleteProject, addMember
} = require('../controllers/projectController');

router.use(protect);

router.route('/').get(getProjects).post(createProject);
router.route('/:id').get(getProjectById).put(updateProject).delete(deleteProject);
router.post('/:id/members', addMember);

module.exports = router;