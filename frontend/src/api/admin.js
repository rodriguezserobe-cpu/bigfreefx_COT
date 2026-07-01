import API from "./auth";

// ===============================
// Get Dashboard Statistics
// ===============================
export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/admin/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// ===============================
// Get All Users
// ===============================
export const getUsers = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// ===============================
// Approve User
// ===============================
export const approveUser = async (id) => {
  const token = localStorage.getItem("token");

  const res = await API.put(
    `/admin/approve/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

// ===============================
// Reject User
// ===============================
export const rejectUser = async (id) => {
  const token = localStorage.getItem("token");

  const res = await API.put(
    `/admin/reject/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
