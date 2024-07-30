const express = require('express');
const cors = require('cors');
const oauthRoutes = require('./routes/oauth');

const app = express();
app.use(cors());

app.use('/oauth', oauthRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});