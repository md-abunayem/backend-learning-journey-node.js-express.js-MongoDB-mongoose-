const app = require("./app.js");
const connectDB = require("./db/index.js");

const PORT = process.env.PORT || 8000;

//call connectDB function
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is runnig at port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed!!!!, err");
  });
