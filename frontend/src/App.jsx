import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const notesListRef = useRef(null);

  // Fetch all tasks from the backend on component mount
  useEffect(() => {
    fetchAllTasks();
  }, []);

  // Scroll to bottom when new notes are added
  useEffect(() => {
    if (notesListRef.current) {
      notesListRef.current.scrollTop = notesListRef.current.scrollHeight;
    }
  }, [notes]);

  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/fetchAllTasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setNotes(data.tasks || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newNote }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      // Refresh the task list
      await fetchAllTasks();
      setNewNote("");
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task. Please try again.");
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="container">
      <div className="note-app">
        {/* Header */}
        <div className="header">
          <div className="header-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" fill="#8B4513" />
              <rect x="5" y="5" width="14" height="3" rx="1" fill="#F5F5DC" />
              <rect x="5" y="9" width="14" height="3" rx="1" fill="#F5F5DC" />
              <rect x="5" y="13" width="14" height="3" rx="1" fill="#F5F5DC" />
            </svg>
          </div>
          <span className="header-title">Task Master</span>
        </div>

        {/* Input Form */}
        <form className="input-container" onSubmit={handleAddNote}>
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="New Task..."
            className="note-input"
          />
          <button type="submit" className="add-button">
            Add
          </button>
        </form>

        {/* Notes List */}
        <div>
          <div className="notes-label">Tasks</div>
          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <div className="notes-list" ref={notesListRef}>
              {notes.map((note, index) => (
                <div key={index} className="note-item">
                  <div className="note-content">{note}</div>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteNote(index)}
                    aria-label="Delete note"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {notes.length === 0 && (
                <div className="empty-notes">No tasks yet. Add one above!</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
