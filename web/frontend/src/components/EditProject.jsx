import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // This retrieves the project ID from the URL
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8007/api/projects/${id}`)
      .then((response) => {
        setProject(response.data); // Set the project data
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while fetching the project data.");
        setIsLoading(false);
      });
  }, [id]); // The effect depends on the project ID

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .patch(`http://localhost:8007/api/projects/${id}`, project)
      .then(() => {
        navigate("/projects"); // Navigate back to the project list after saving
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while updating the project.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!project) {
    return <p>Project data is not available.</p>;
  }

  return (
    <form onSubmit={handleSave}>
      <h1>Edit Project</h1>
      {error && <p className="error">{error}</p>}
      <label htmlFor="projectName">Project Name</label>
      <input
        id="projectName"
        type="text"
        name="name"
        value={project.name}
        onChange={handleInputChange}
        placeholder="Project Name"
      />
      <label htmlFor="projectDescription">Project Description</label>
      <textarea
        id="projectDescription"
        name="description"
        value={project.description}
        onChange={handleInputChange}
        placeholder="Project Description"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProject;