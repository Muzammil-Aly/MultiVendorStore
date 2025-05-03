// services/authService.js

// Get current user info (protected route)
export const getCurrentUser = async () => {
  const res = await fetch("/api/v1/users/current-user", {
    credentials: "include", // sends cookies
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Unable to fetch current user");
  }

  return res.json(); // returns { user: { ... } }
};

// Login user
export const login = async (email, password) => {
  const res = await fetch("/api/v1/users/Login", {
    method: "POST",
    credentials: "include", // ensures cookies are included
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  return res.json(); // returns { user: { ... } }
};

export const logout = async () => {
  try {
    const res = await fetch("/api/v1/users/logout", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      //   setAccount("");
      navigate("/login");
    } else {
      toast.error(data.message || "Logout failed");
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
};

export const sellerOrders = async () => {
  try {
    const res = await fetch("/api/v1/product/sellerOrders", {
      method: "POST",
      credentials: "include", // send cookies for authentication
    });

    // Check if the response is not ok
    if (!res.ok) {
      const errorData = await res.json();
      if (res.status === 401) {
        // If unauthorized (status code 401), navigate to login page
        navigate("/login");
        toast.error("Please login to access your orders.");
      } else {
        // If other errors, show an error message
        toast.error(
          errorData.message || "An error occurred while fetching orders."
        );
      }
    } else {
      // Process the successful response
      const data = await res.json();
      console.log("Seller orders:", data); // You can handle the fetched orders here
    }
  } catch (err) {
    // Catch and log any other errors
    console.error("Error fetching seller orders:", err);
    toast.error("Something went wrong while fetching your orders.");
  }
};
