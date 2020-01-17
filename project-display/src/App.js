import React, {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data,setData] = useState([]);
  useEffect(() => {
    axios('http://localhost:8000/api/projects')
        .then(resp => {
          console.log(resp); 
          setData(resp.data);
        })
        .catch(err => {
          console.log('axios err:',err)
        })
  
  },[]);
  
  
  
  return (
    <div className="App">
        {data.map(item =>
          <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          
          </div>
        )}
    </div>
  );
}

export default App;
