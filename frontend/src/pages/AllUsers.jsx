import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const sapphireBlue = "#2b48be"; // Sapphire Blue color
  const sapphireDark = "#1a3476"; // Dark Sapphire color
  const marroonColor = "#800000"; // Maroon color

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/v1/users/allVendors"); // 🔁 Update with your actual route
      console.log("Data is showing ", response);
      const data = await response.json();

      if (response.ok) {
        setUsers(data.data); // assuming your response is: { status: 200, data: [...], message: "" }
      } else {
        console.error("Failed to fetch users:", data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const loadingStyle = {
    textAlign: "center",
    color: sapphireBlue,
    border: `2px solid ${marroonColor}`, // Adding maroon border to the loading message
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#fff", // Adding background color to make sure the border stands out
  };

  const noUsersStyle = {
    textAlign: "center",
    color: sapphireDark,
    border: `2px solid ${marroonColor}`, // Adding maroon border to the no users found message
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#fff", // Adding background color to ensure clarity
  };

  const containerStyle = {
    padding: "1.5rem",
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    border: `2px solid ${marroonColor}`, // Adding maroon border to the grid container
    borderRadius: "10px",
    backgroundColor: "#fff", // Ensure background color contrasts with border
  };

  if (!loading && users.length === 0) {
    return <p style={noUsersStyle}>No users found.</p>;
  }

  if (loading) return <p style={loadingStyle}>Loading users...</p>;

  return (
    <div style={containerStyle}>
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default AllUsers;
