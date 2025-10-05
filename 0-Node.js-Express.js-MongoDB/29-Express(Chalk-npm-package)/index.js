
import  express from 'express';
import chalk from "chalk";   //chalk works on import
const app = express();

//chalk changes colors of console's property
console.log(chalk.blueBright.underline.bgWhite(`We are using chalk`))
// Basic route

app.get('/', (req, res) => {
  console.log(chalk.blue.bgRed('Home route excecuted'))
  res.send(`<h1>Hello from Express server!</h1>`);
});

app.get('/products', (req, res) => {
  res.send('<h1>Product page</h1>');
});


const PORT =  3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
