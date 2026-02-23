import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ================= AUTH =================
export const login = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const registerUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// users controller

// get all users
export const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`, { headers: getAuthHeader() });
  return res.data;
};

// create user
export const createUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/users`, data, { headers: getAuthHeader() });
  return res.data;
};

// update user
export const updateUser = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/users/${id}`, data, { headers: getAuthHeader() });
  return res.data;
};

// delete user
export const deleteUser = async (id) => {
  const res = await axios.delete(`${BASE_URL}/users/${id}`, { headers: getAuthHeader() });
  return res.data;
};


// ================= ROLES =================
export const getRoles = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/roles`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const createRole = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/roles`, data, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateRole = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/roles/${id}`, data, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deleteRole = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/roles/${id}`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ================= COURSES =================
export const getCourses = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/courses`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const createCourse = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/courses`, data, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateCourse = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/courses/${id}`, data, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deleteCourse = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/courses/${id}`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ================= ASSIGNMENTS =================
export const getAssignments = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/assignments`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const getAssignmentById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/assignments/${id}`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const downloadAssignmentFile = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/assignments/download/${id}`, {
      headers: getAuthHeader(),
      responseType: "blob",
    });
    return response;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const createAssignment = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/assignments`, data, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateAssignment = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/assignments/${id}`, data, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deleteAssignment = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/assignments/${id}`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};


// ================= ADMISSIONS =================

// Get all pending admissions (admin)
export const getAdmissions = async () => {
try {
const res = await axios.get(`${BASE_URL}/admissions/pending`, {
headers: getAuthHeader(),
});
return res.data;
} catch (err) {
throw err.response?.data || err;
}
};

// Get a single admission (admin)
export const getAdmission = async (admission_id) => {
try {
const res = await axios.get(`${BASE_URL}/admissions/${admission_id}`, {
headers: getAuthHeader(),
});
return res.data;
} catch (err) {
throw err.response?.data || err;
}
};

// Submit a new admission (public)
export const submitAdmission = async (data) => {
try {
const res = await axios.post(`${BASE_URL}/admissions`, data);
return res.data;
} catch (err) {
throw err.response?.data || err;
}
};

// Approve admission (admin)
export const approveAdmission = async ({ admission_id, role_id }) => {
try {
const res = await axios.post(
`${BASE_URL}/admissions/approve`,
{ admission_id, role_id },
{ headers: getAuthHeader() }
);
return res.data;
} catch (err) {
throw err.response?.data || err;
}
};

// Reject admission (admin)
export const rejectAdmission = async ({ admission_id }) => {
try {
const res = await axios.post(
`${BASE_URL}/admissions/reject`,
{ admission_id },
{ headers: getAuthHeader() }
);
return res.data;
} catch (err) {
throw err.response?.data || err;
}
};


// ================= FEES =================

// Get all fees
export const getFees = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/fee`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
  
// Get single fee with payments
export const getFeeById = async (fee_id) => {
  try {
    const res = await axios.get(`${BASE_URL}/fee/${fee_id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Create fee
export const createFee = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/fee`, data, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Update fee
export const updateFee = async (fee_id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/fee/${fee_id}`, data, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Delete fee (soft delete)
export const deleteFee = async (fee_id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/fee/${fee_id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ================= EXAMS =================
export const getExams = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/exams`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    console.log("first")
    throw err.response?.data || err;
  }
};

export const createExam = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/exams`, data, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateExam = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/exams/${id}`, data, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deleteExam = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/exams/${id}`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  } 
};


// ================= PAYMENTS =================


// Get all payments
export const getPayments = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/payments`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Get payments by fee ID
export const getPaymentsByFee = async (fee_id) => {
  try {
    const res = await axios.get(`${BASE_URL}/payments/fee/${fee_id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Create a new payment
export const createPayment = async (data) => {
  // data = { fee_id, amount_paid }
  try {
    const res = await axios.post(`${BASE_URL}/payments`, data, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Update payment status
export const updatePaymentStatus = async (data) => {
  // data = { payment_id, status }
  try {
    const res = await axios.put(`${BASE_URL}/payments/status`, data, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Delete payment (soft delete)
export const deletePayment = async (payment_id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/payments/${payment_id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};


// ================= ATTENDANCE =================
export const getAttendance = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/attendance`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const getMyAttendance = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/attendance/my-attendance`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const createAttendance = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/attendance`, data, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateAttendance = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/attendance/${id}`, data, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deleteAttendance = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/attendance/${id}`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ================= EXAM RESULTS =================
export const getExamResults = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/examsresult`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const createExamResult = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/examsresult`, data, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateExamResult = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/examsresult/${id}`, data, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deleteExamResult = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/examsresult/${id}`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }

};

// own result 
export const getMyExamResults = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/examsresult/my-results`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};




// ================= STUDENT PROFILE =================
export const getMyProfile = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/students/me`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};


/**
 * ================= enrollements =================
 */

// Get all enrollments
export const getEnrollments = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/enrollements`, {
      headers: getAuthHeader()
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Get single enrollment by ID
export const getEnrollmentById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/enrollements/${id}`, {
      headers: getAuthHeader()
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Create enrollment
export const createEnrollment = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/enrollements`, data, {
      headers: getAuthHeader()
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Update enrollment
export const updateEnrollment = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/enrollements/${id}`, data, {
      headers: getAuthHeader()
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Delete enrollment
export const deleteEnrollment = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/enrollements/${id}`, {
      headers: getAuthHeader()
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};


// ------------Event--------------------//

// Get all events
export const getEvents = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/event/event`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Get single event
export const getEventById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/event/${id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Create event
export const createEvent = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/event`, data, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Update event
export const updateEvent = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/event/${id}`, data, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Delete event
export const deleteEvent = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/event/${id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

//-------------------------Event Register----------------------// 

// Get all registrations
export const getRegistrations = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/eventregister`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Get single registration
export const getRegistrationById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/eventregister/${id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Get eventregister by event
export const geteventregisterByEvent = async (event_id) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/eventregister/event/${event_id}`,
      { headers: getAuthHeader() }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Create registration
export const createRegistration = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/eventregister`, data, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Update registration
export const updateRegistration = async (id, data) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/eventregister/${id}`,
      data,
      { headers: getAuthHeader() }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Delete registration
export const deleteRegistration = async (id) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/eventregister/${id}`,
      { headers: getAuthHeader() }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
