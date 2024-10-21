const express = require('express');
const authRoutes = require('./routes/auth.js');
const profileRoutes = require('./routes/profile.js');

const app = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));