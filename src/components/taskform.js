// file src/components/TaskForm.js
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "../index.css"; // Pastikan efek glassmorphism tersedia di sini

const TaskForm = ({ show, handleClose, addTask, editTask, taskToEdit }) => {
  const [task, setTask] = useState({
    name: "",
    priority: "Medium",
    status: "To Do",
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({ name: "", priority: "Medium", status: "To Do" });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!task.name.trim()) {
      alert("Task name cannot be empty");
      return;
    }

    taskToEdit ? editTask(task) : addTask(task);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        setTask({ name: "", priority: "Medium", status: "To Do" });
      }}
      dialogClassName="glass-style" // Menambahkan kelas glass-style ke modal
    >
      <Modal.Header closeButton>
        <Modal.Title>{taskToEdit ? "Edit Task" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Type your task here..."
              value={task.name}
              onChange={handleChange}
              required
              className="glass-input" // Kelas tambahan untuk input dengan efek glass
            />
          </Form.Group>

          <Form.Group controlId="taskPriority" className="mt-3">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="glass-input">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="taskStatus" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={task.status}
              onChange={handleChange}
              className="glass-input">
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {taskToEdit ? "Update Task" : "Add Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;
