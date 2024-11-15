import React, { useState, useEffect } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import TaskList from "./components/tasklist";
import TaskForm from "./components/taskform";
import GlassCard from "./components/GlassCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [showIntro, setShowIntro] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const addTask = (task) => {
    if (tasks.some((t) => t.name.toLowerCase() === task.name.toLowerCase())) {
      alert("Task dengan nama ini sudah ada!");
      return;
    }
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  const cancelDeleteTask = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  const clearAllTasks = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  const handleEnterApp = () => {
    setShowIntro(false);
  };

  return (
    <Container
      className={`my-5 app-container ${
        darkMode ? "dark-container" : "light-container"
      }`}>
      {showIntro ? (
        <GlassCard
          onEnter={handleEnterApp}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
      ) : (
        <>
          <div className="text-center mb-4">
            <h1 className="mb-3">Project To-Do List</h1>
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="primary"
                onClick={handleShowForm}
                className="add-task-btn">
                + Add Task
              </Button>
              <Button
                variant="secondary"
                onClick={toggleDarkMode}
                className="dark-mode-toggle">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
              <Button
                variant="danger"
                onClick={clearAllTasks}
                className="clear-all-btn">
                Clear All Tasks
              </Button>
            </div>
          </div>
          <TaskList
            tasks={tasks}
            deleteTask={handleDeleteClick}
            showEditForm={showEditForm}
          />
          <TaskForm
            show={showForm}
            handleClose={handleCloseForm}
            addTask={addTask}
            editTask={editTask}
            taskToEdit={taskToEdit}
          />

          <Modal show={showDeleteModal} onHide={cancelDeleteTask} centered>
            <Modal.Body className="text-center">
              <div
                className="delete-icon"
                style={{ fontSize: "2rem", color: "red" }}>
                <i className="bi bi-x-circle"></i>
              </div>
              <h5>Are you sure?</h5>
              <p>
                Do you really want to delete this task? This process cannot be
                undone.
              </p>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button variant="secondary" onClick={cancelDeleteTask}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDeleteTask}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default App;
