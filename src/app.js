const express = require("express");
const waitListRoutes = require("./routes/waitListRoutes");
const app = express();
app.use(express.json());

app.use("/api/waitlist", waitListRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
