import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate(); // Create an instance of useHistory

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8007/api/projects', { name, description })
      .then((response) => {
        console.log('Success:', response.data);
        navigate('/projects'); // Navigate to the project list page
      })
      .catch((error) => console.error('Error:', error));
  };

    
    // The delete functionality is coming from deleting a specific item, we are going to need to pass the ID parameter to the function.

    // Make a copy of state since state still can’t be added or deleted directly in state. Rather than performing an operation such as this.state.tasks.splice(parameter, number of indices we are deleting) we need to make the copy.
    // Splice.
    // Set the state with the spliced copy.

  const handleDelete = (id) => {
    let copy = [...this.state.tasks];
    copy.splice(id, 1);
    this.state({tasks:copy});
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Project</h1>
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Project Description"
      />

      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProject;