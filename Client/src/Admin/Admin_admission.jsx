import React, { useEffect, useState, useCallback } from "react";
import {
  getAdmissions,
  approveAdmission,
  rejectAdmission,
} from "../config/Api";
import "../Styles/AdminAdmissionPage.css";

const AdminAdmissionPage = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [notification, setNotification] = useState(null);

  const showMessage = (text, type = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 1500);
  };

  const loadAdmissions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAdmissions();
      setAdmissions(data.filter(a => a.status === "pending"));
    } catch (err) {
      alert(err.message || "Failed to load admissions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAdmissions();
  }, [loadAdmissions]);

  const handleAction = async (admission, action) => {
    const confirmText =
      action === "approve"
        ? "Approve this admission?"
        : "Reject this admission?";

    if (!window.confirm(confirmText)) return;

    // Optimistic update
    setAdmissions(prev =>
      prev.filter(a => a.admission_id !== admission.admission_id)
    );
    setActionLoading(admission.admission_id);

    try {
      const apiCall =
        action === "approve"
          ? approveAdmission({
              admission_id: admission.admission_id,
              role_id: 5,
            })
          : rejectAdmission({
              admission_id: admission.admission_id,
            });

      const res = await apiCall;

      showMessage(
        `Admission ${action}d for ${res.email}`,
        action === "approve" ? "success" : "error"
      );
    } catch (err) {
      // Rollback if API fails
      setAdmissions(prev => [...prev, admission]);
      alert(err.message || `Failed to ${action} admission`);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <p>Loading admissions...</p>;

  return (
    <div className="admin-admissions-container">
      <h2>Pending Admissions</h2>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.text}
        </div>
      )}

      <table className="admissions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {admissions.length === 0 && (
            <tr>
              <td colSpan="10" align="center">
                No pending admissions
              </td>
            </tr>
          )}

          {admissions.map(adm => (
            <tr key={adm.admission_id}>
              <td>{adm.admission_id}</td>
              <td>{adm.first_name}</td>
              <td>{adm.last_name}</td>
              <td>{adm.username}</td>
              <td>{adm.email || "-"}</td>
              <td>{adm.phone_number}</td>
              <td>{adm.gender}</td>
              <td>{adm.department}</td>
              <td>{adm.status.toUpperCase()}</td>
              <td>
                <button
                  className="approve-btn"
                  disabled={actionLoading === adm.admission_id}
                  onClick={() => handleAction(adm, "approve")}
                >
                  {actionLoading === adm.admission_id
                    ? "Processing..."
                    : "Approve"}
                </button>

                <button
                  className="reject-btn"
                  disabled={actionLoading === adm.admission_id}
                  onClick={() => handleAction(adm, "reject")}
                >
                  {actionLoading === adm.admission_id
                    ? "Processing..."
                    : "Reject"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAdmissionPage;
    