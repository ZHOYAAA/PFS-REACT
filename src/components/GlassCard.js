import React from "react";
import "./GlassCard.css";

function GlassCard({ onEnter, toggleDarkMode, darkMode }) {
  return (
    <div className="glass-container">
      <div className="glass-card">
        <h2>Welcome to To-Do List</h2>
        <p>Manage your tasks efficiently and stay organized.</p>
        <div className="button-group">
          <button onClick={onEnter}>Start Adding Tasks</button>
          <button onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GlassCard;
