import express, { json } from "express";
import waitListRoutes from "./routes/waitListRoutes";

const app = express();
require("dotenv").config();

app.use(json());
app.set("json spaces", 2);
app.use("/api/waitlist", waitListRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
	res.json({ status: true, message: "Navarra Working" });
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

export default app;
