import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  if (!user)
    return (
      <p className="text-center text-gray-400 text-base italic">
        No users found.
      </p>
    );

  const { _id, avatar, email, phone, fullName } = user;

  return (
    <Link
      to={`/userPost/${_id}`}
      className="w-full max-w-md bg-white rounded-3xl shadow-lg hover:shadow-xl transition transform hover:scale-105 border-4 border-orange-500 p-6"
    >
      {/* Full-width Cover Image */}
      <div className="w-full h-48 mb-6">
        {/* Cover Image */}
        <img
          src={avatar} // Using avatar as cover image
          alt="Cover"
          className="w-full h-full object-contain rounded-t-3xl" // Changed to object-contain to prevent cropping
        />
      </div>

      {/* Name Section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
      </div>

      {/* Info Section */}
      <div className="space-y-3 text-md text-gray-700 font-medium">
        <p>
          <span className="text-orange-600 font-semibold">📧 Email:</span>{" "}
          {email}
        </p>
        <p>
          <span className="text-orange-600 font-semibold">📱 Phone:</span>{" "}
          {phone}
        </p>
      </div>
    </Link>
  );
};

export default UserCard;
