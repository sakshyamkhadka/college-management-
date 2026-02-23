import React, { useState } from "react";
import "../Styles/Paymentstu.css";

// Import images of eSewa and Khalti
import eSewaLogo from "../Assets/esewa.png";
import KhaltiLogo from "../Assets/khalti.png";

const StudentPayment = () => {
    const [formData, setFormData] = useState({
        paymentType: "",
        studentId: "",
        amount: "",
        email: "",
    });

    const [paymentStatus, setPaymentStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to call eSewa payment
    const payWithESewa = async () => {
        if (!formData.amount) return alert("Enter an amount");

        const esewaData = {
            amt: formData.amount,
            psc: "0",
            pdc: "0",
            tAmt: formData.amount,
            pid: `STU${Date.now()}`,
            scd: "YOUR_ESEWA_MERCHANT_CODE",
            su: "http://localhost:3000/payment-success",
            fu: "http://localhost:3000/payment-failure",
        };

        // Open eSewa payment page
        const query = new URLSearchParams(esewaData).toString();
        window.open(`https://esewa.com.np/epay/main?${query}`, "_blank");
    };

    // Function to call Khalti payment
    const payWithKhalti = () => {
        if (!formData.amount) return alert("Enter an amount");

        // Khalti Payment config (using Khalti Checkout JS)
        const khaltiConfig = {
            publicKey: "YOUR_KHALTI_PUBLIC_KEY",
            productIdentity: `STU${Date.now()}`,
            productName: formData.paymentType,
            productUrl: "http://localhost:3000",
            eventHandler: {
                onSuccess(payload) {
                    setPaymentStatus(
                        `Payment of Rs ${formData.amount} via Khalti successful! Reference: ${payload.idx}`
                    );
                },
                onError(error) {
                    alert("Payment failed: " + error.message);
                },
                onClose() {
                    console.log("Payment popup closed");
                },
            },
            paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
        };

        const khalti = new window.KhaltiCheckout(khaltiConfig);
        khalti.show({ amount: formData.amount * 100 }); // Khalti amount in paisa
    };

    const handlePayNow = (e) => {
        e.preventDefault();
        if (!formData.paymentType || !formData.studentId || !formData.amount) {
            alert("Please fill all required fields");
            return;
        }
        // Show payment options
        setPaymentStatus(null);
        const proceed = window.confirm(
            "Choose OK to pay with eSewa, Cancel to pay with Khalti"
        );
        if (proceed) payWithESewa();
        else payWithKhalti();
    };

    return (
        <div className="payment-container">
            <h1>Bill & Fee Payments</h1>

            <form className="payment-form" onSubmit={handlePayNow}>
                <label>
                    Payment Type:
                    <select
                        name="paymentType"
                        value={formData.paymentType}
                        onChange={handleChange}
                    >
                        <option value="">-- Select Payment --</option>
                        <option value="College Fee">College Fee</option>
                        <option value="Viva Fee">Viva Fee</option>
                        <option value="Exam Fee">Exam Fee</option>
                    </select>
                </label>

                <label>
                    Student/Account ID:
                    <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        placeholder="Enter your ID or account number"
                    />
                </label>

                <label>
                    Amount (Rs):
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                    />
                </label>

                <label>
                    Email (optional):
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email for receipt"
                    />
                </label>

                <button type="submit">Pay Now</button>
            </form>

            <div className="payment-methods">
                <h3>Or select payment method directly:</h3>
                <button onClick={payWithESewa}>
                    <img src={eSewaLogo} alt="eSewa" className="gateway-logo" />
                    Pay with eSewa
                </button>
                <button onClick={payWithKhalti}>
                    <img src={KhaltiLogo} alt="Khalti" className="gateway-logo" />
                    Pay with Khalti
                </button>
            </div>

            {paymentStatus && <p className="payment-success">{paymentStatus}</p>}
        </div>
    );
};

export default StudentPayment;
