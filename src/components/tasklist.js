// file src/components/TaskList.js
import React from "react";
import "./TaskList.css";

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  return (
    <div className="task-list-container glass-style">
      <h2 className="task-list-title">Your Task List</h2>
      <p className="task-list-description">
        Manage your tasks efficiently and stay organized.
      </p>
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-info">
                <div className="task-details">
                  <span className="task-label">Task</span>
                  <span className="task-name">{task.name}</span>
                </div>
                <div className="task-details">
                  <span className="priority-label">Priority</span>
                  <span
                    className={`priority-value ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="status-container">
                  <span
                    className={`status ${task.status
                      .replace(" ", "-")
                      .toLowerCase()}`}>
                    {task.status}
                  </span>
                </div>
              </div>
              <div className="task-actions">
                <button
                  onClick={() => showEditForm(task)}
                  className="icon-button edit-button">
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  onClick={() => deleteTask(task)}
                  className="icon-button delete-button">
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-tasks-message">
            No tasks available. Start adding tasks!
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
