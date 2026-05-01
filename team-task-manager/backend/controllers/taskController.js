const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, priority, dueDate } = req.body;
    
    const proj = await Project.findById(project);
    if (!proj) return res.status(404).json({ message: 'Project not found' });

    // Only owner/admin can create tasks
    if (req.user.role !== 'admin' && proj.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only admin/owner can create tasks' });
    }

    const task = await Task.create({
      title, description, project, assignedTo, priority, dueDate,
      createdBy: req.user._id
    });
    
    const populated = await Task.findById(task._id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { project, status, assignedTo } = req.query;
    const filter = {};
    if (project) filter.project = project;
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;

    // Members see only their assigned tasks unless admin
    if (req.user.role !== 'admin') {
      filter.$or = [{ assignedTo: req.user._id }, { createdBy: req.user._id }];
    }

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name')
      .sort('-createdAt');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) return res.status(404).json({ message: 'Not found' });

    const isAdmin = req.user.role === 'admin';
    const isAssignee = task.assignedTo?.toString() === req.user._id.toString();
    const isOwner = task.project.owner.toString() === req.user._id.toString();

    if (!isAdmin && !isAssignee && !isOwner) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Members can only update status
    if (!isAdmin && !isOwner) {
      const allowed = ['status'];
      Object.keys(req.body).forEach(k => {
        if (!allowed.includes(k)) delete req.body[k];
      });
    }

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) return res.status(404).json({ message: 'Not found' });

    if (req.user.role !== 'admin' && task.project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { assignedTo: req.user._id };
    
    const allTasks = await Task.find(filter);
    const now = new Date();

    const stats = {
      total: allTasks.length,
      todo: allTasks.filter(t => t.status === 'todo').length,
      inProgress: allTasks.filter(t => t.status === 'in-progress').length,
      review: allTasks.filter(t => t.status === 'review').length,
      done: allTasks.filter(t => t.status === 'done').length,
      overdue: allTasks.filter(t => 
        t.dueDate && t.dueDate < now && t.status !== 'done'
      ).length,
      highPriority: allTasks.filter(t => t.priority === 'high' && t.status !== 'done').length
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};