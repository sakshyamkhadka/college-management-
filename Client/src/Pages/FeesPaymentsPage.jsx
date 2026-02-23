import React, { useEffect, useState } from "react";
import {
  getFees,
  createFee,
  updateFee,
  deleteFee,
  createPayment,
  getUsers,
} from "../config/Api";
import "../Styles/FeesPayments.css";
import esewa from "/Images/Esewa.png";
import khalti from "/Images/khalti.png";

const FeesPayments = () => {
  const [fees, setFees] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ student_id: "", fee_name: "", amount: "", due_date: "" });
  const [editingFeeId, setEditingFeeId] = useState(null);
  const [role, setRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setRole(user);
    fetchFeesData(user);
    if (user?.role_id === 1) fetchUsers();
  }, []);

  const isAdmin = role?.role_id === 1;

  const fetchFeesData = async (user) => {
    try {
      const data = await getFees();
      setFees(data);
    } catch (err) {
      console.error("Error fetching fees:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return alert("Not authorized");

    try {
      const payload = {
        student_id: Number(form.student_id),
        fee_name: form.fee_name,
        amount: Number(form.amount),
        due_date: form.due_date,
      };

      if (editingFeeId) {
        await updateFee(editingFeeId, payload);
        setEditingFeeId(null);
      } else {
        await createFee(payload);
      }

      setForm({ student_id: "", fee_name: "", amount: "", due_date: "" });
      fetchFeesData(role);
    } catch (err) {
      console.error("Error saving fee:", err);
    }
  };

  const handleEdit = (fee) => {
    setEditingFeeId(fee.fee_id);
    setForm({
      student_id: fee.user_id,
      fee_name: fee.fee_name,
      amount: fee.amount,
      due_date: fee.due_date,
    });
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteFee(deleteId);
      fetchFeesData(role);
    } catch (err) {
      console.error("Error deleting fee:", err);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const openPaymentModal = (fee) => {
    setSelectedFee(fee);
    setShowModal(true);
  };

  const handlePayment = async (mode) => {
    try {
      await createPayment({
        fee_id: selectedFee.fee_id,
        amount_paid: selectedFee.amount,
        payment_mode: mode,
      });
      alert(`Redirecting to ${mode.toUpperCase()} payment`);
      setShowModal(false);
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <div className="fees-container">
      <h2>Fees & Payments</h2>

      {isAdmin && (
        <form className="fee-form" onSubmit={handleSubmit}>
          <h3>{editingFeeId ? "Update Fee" : "Create Fee"}</h3>

          <select
            value={form.student_id}
            onChange={(e) => setForm({ ...form, student_id: e.target.value })}
            required
          >
            <option value="">Select Student</option>
            {users.map((u) => (
              <option key={u.user_id} value={u.user_id}>
                {u.first_name} {u.last_name} ({u.username})
              </option>
            ))}
          </select>

          <select
            value={form.fee_name}
            onChange={(e) => setForm({ ...form, fee_name: e.target.value })}
            required
          >
            <option value="">Select Fee Type</option>
            <option value="exam">Exam</option>
            <option value="viva">Viva</option>
            <option value="other">Other</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
          <input
            type="date"
            value={form.due_date}
            onChange={(e) => setForm({ ...form, due_date: e.target.value })}
            required
          />
          <button type="submit">{editingFeeId ? "Update" : "Create"}</button>
        </form>
      )}

      <table className="fees-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Fee Type</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.fee_id}>
              <td>{fee.first_name ? `${fee.first_name} ${fee.last_name}` : fee.user_id}</td>
              <td>{fee.fee_name}</td>
              <td>Rs. {fee.amount}</td>
              <td>{fee.due_date}</td>
              <td>
                {isAdmin ? (
                  <>
                    <button onClick={() => handleEdit(fee)}>Edit</button>
                    <button onClick={() => confirmDelete(fee.fee_id)}>Delete</button>
                  </>
                ) : (
                  <button onClick={() => openPaymentModal(fee)}>Pay Now</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedFee && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Pay Fee</h3>
            <p>
              Amount: <strong>Rs. {selectedFee.amount}</strong>
            </p>
            <div className="payment-options">
              <img src={esewa} alt="eSewa" onClick={() => handlePayment("esewa")} />
              <img src={khalti} alt="Khalti" onClick={() => handlePayment("khalti")} />
            </div>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this fee?</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={handleDelete}>Yes, Delete</button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesPayments;
