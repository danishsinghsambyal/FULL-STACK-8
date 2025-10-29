const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'mysecretkey';

// Sample users
const users = [
  { username: 'adminUser', password: 'admin123', role: 'Admin' },
  { username: 'modUser', password: 'mod123', role: 'Moderator' },
  { username: 'normalUser', password: 'user123', role: 'User' }
];

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware for authentication and role check
function authorize(roles = []) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token required' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      if (!roles.includes(user.role) && roles.length > 0) {
        return res.status(403).json({ message: 'Access denied: insufficient role' });
      }
      req.user = user;
      next();
    });
  };
}

// Routes
app.get('/admin-dashboard', authorize(['Admin']), (req, res) => {
  res.json({ message: 'Welcome to the Admin dashboard', user: req.user });
});

app.get('/moderator-panel', authorize(['Moderator']), (req, res) => {
  res.json({ message: 'Welcome to the Moderator panel', user: req.user });
});

app.get('/user-profile', authorize(['Admin', 'User', 'Moderator']), (req, res) => {
  res.json({ message: `Welcome to your profile, ${req.user.username}`, user: req.user });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));