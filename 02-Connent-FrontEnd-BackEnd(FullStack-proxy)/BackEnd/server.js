import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

//Get a list of 5 jokes
app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      category: "Programming",
      joke: "Why do programmers prefer dark mode? Because light attracts bugs.",
    },
    {
      id: 2,
      category: "General",
      joke: "Why don’t scientists trust atoms? Because they make up everything!",
    },
    {
      id: 3,
      category: "Dad Joke",
      joke: "I only know 25 letters of the alphabet. I don’t know y.",
    },
    {
      id: 4,
      category: "Tech",
      joke: "Why did the computer show up at work late? It had a hard drive.",
    },
    {
      id: 5,
      category: "Puns",
      joke: "I would tell you a joke about construction, but I’m still working on it.",
    },
  ];
  res.send(jokes);
});

//go to json formatter website format the output(visualization)
//https://jsonformatter.org/

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
