import React, { useEffect, useState } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    api.post(`/repositories`, {
      "title": `Bootcamp GoStack Desafios ReactJS ${Date.now()}`,
      "url": "https://github.com/rocketseat-education/bootcamp-gostack-desafios",
      "techs": [
        "NodeJs", 
        "Express",
        "Laravel"
      ]
    }).then(response => {
      if (response.status === 200) {        
        setRepositories([...repositories, response.data]);
      }
    });
  }

  async function handleRemoveRepository(id) {    
    api.delete(`/repositories/${id}`).then(response => {
      if (response.status === 204) {
        const repos = repositories.filter((repository) => repository.id !== id);
        setRepositories(repos);
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (<li key={repository.id}> 
          {repository.title }
          <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
