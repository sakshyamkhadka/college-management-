import { useState, useEffect } from "react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  createRegistration
} from "../config/Api";
import "../Styles/EventPnc.css";
import EventModel from "./EventModel";

export default function EventsPnc() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    tag: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [role, setRole] = useState({});
  const [registerEventId, setRegisterEventId] = useState(null);
  const [registerForm, setRegisterForm] = useState({
    email: "",
    phone: "",
    address: "",
    semester: ""
  });
  const [showModel, setShowModel] = useState(false);






  const tags = ["sports", "webinar", "exam", "course", "workshop", "cultural"];

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (userDetails) setRole(userDetails);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role || role.role_id !== 1) return;

    if (editingId) {
      await updateEvent(editingId, form);
      setEditingId(null);
    } else {
      await createEvent(form);
    }

    setForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      tag: ""
    });

    fetchEvents();
  };

  const handleEdit = (event) => {
    if (!role || role.role_id !== 1) return;
    setForm({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      tag: event.tag
    });
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    if (!role || role.role_id !== 1) return;
    await deleteEvent(id);
    fetchEvents();
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!role || role.role_id === 1) return;
    console.log("INside handle submit")

    await createRegistration({
      event_id: registerEventId,
      ...registerForm
    });

    setRegisterForm({
      email: "",
      phone: "",
      address: "",
      semester: ""
    });

    setRegisterEventId(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  return (
    <div className="events-page">
      <h1 className="page-title">Events</h1>

      {role.role_id === 1 && (
        <div className="event-form-card">
          <h2>{editingId ? "Edit Event" : "Add Event"}</h2>
          <form onSubmit={handleSubmit} className="event-form">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
            <input
              type="date"
              value={form.startDate}
              onChange={(e) =>
                setForm({ ...form, startDate: e.target.value })
              }
              required
            />

            <input
              type="date"
              value={form.endDate}
              onChange={(e) =>
                setForm({ ...form, endDate: e.target.value })
              }
              required
            />
            <select
              value={form.tag}
              onChange={(e) =>
                setForm({ ...form, tag: e.target.value })
              }
              required
            >
              <option value="">Select Tag</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Update Event" : "Add Event"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      title: "",
                      description: "",
                      startDate: "",
                      endDate: "",
                      tag: ""
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="events-grid">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Start</th>
              <th>End</th>
              <th>View </th>
              {/* <th>Tag</th> */}
              {role.role_id === 1 ? <th>Actions</th> : <th>Register</th>}
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{formatDate(event.startDate)}</td>
                <td>{formatDate(event.endDate)}</td>
                <td><button onClick={() => setShowModel(prev => !prev)}>View</button></td>

                {role.role_id === 1 ? (
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      className="btn-primary"
                      onClick={() => setRegisterEventId(event.id)}
                    >
                      Register
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {registerEventId && role.role_id !== 1 && (
        <div className="register-form-card">
          <h2>Register for Event</h2>
          <form onSubmit={handleRegisterSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, email: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={registerForm.phone}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, phone: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={registerForm.address}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, address: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Semester"
              value={registerForm.semester}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, semester: e.target.value })
              }
              required
            />

            <div className="form-actions">
              <button type="submit" className="btn-primary"
              >
                Submit
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setRegisterEventId(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showModel && <EventModel />}
    </div>
  );
}
