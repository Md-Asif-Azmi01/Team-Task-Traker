const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', auth, admin, async (req, res) => {
  const { title, description, assignedTo } = req.body;
  try {
    const task = new Task({
      title,
      description,
      assignedTo,
      assignedBy: req.user.id
    });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/my', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate('assignedBy', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['new', 'in-progress', 'completed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    task.status = status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/', auth, admin, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('assignedTo', 'name email')
      .populate('assignedBy', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;