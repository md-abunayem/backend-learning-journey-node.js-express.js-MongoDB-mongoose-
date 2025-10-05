const express = require("express");
const app = express();

const userRouter = require('./routes/user.routes')

const PORT = 3000;

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

//user routes
app.use('/api', userRouter)



app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
