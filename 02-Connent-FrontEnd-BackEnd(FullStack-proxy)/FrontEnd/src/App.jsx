import {useEffect, useState} from 'react';
import axios from "axios";


function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios.get('/api/jokes')
    .then((res)=>{
      setJokes(res.data);
    })
    .catch((error)=>{
      console.log(error.message);
    })
  }, [])
  
  return (
    <>
      <h1>Jokes  Comes from Backend</h1>
      <p>Total Jokes: {jokes.length}</p>
      {
        jokes.map((joke, index)=>{
          return <div>
            <h3>{joke.category}</h3>
            <p>{joke.joke}</p>
          </div>
        })
      }
    </>
  )
}

export default App
