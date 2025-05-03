import React from "react";

function Logo({ width = "120px" }) {
  return (
    <div
      className="font-bold text-xl tracking-wide flex items-center gap-1"
      style={{ width }}
    >
      <span className="text-black">Multi</span>
      <span className="text-yellow-500">Vendor</span>
      <span className="text-black">Store</span>
    </div>
  );
}

export default Logo;
