import React from "react";
import AddToBag from "./addToBag";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const { _id, title, productImage, tagline, price } = post;

  return (
    <Link to={`/post/${_id}`} className="no-underline text-inherit">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl flex flex-col gap-2 pb-4 w-[50vh]">
        <div className="w-full h-[450px] bg-white overflow-hidden">
          <img
            src={productImage}
            alt={title.shortTitle}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>

        {/* Updated: Use flex row to align info and AddToBag side by side */}
        <div className="flex justify-between items-start flex-wrap px-4 gap-3 min-w-[250px]">
          <div className="flex flex-col max-w-[60%]">
            <p className="text-[1.1rem] font-medium text-[#333] whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px]">
              {title.shortTitle}
            </p>
            <p className="text-[1rem] text-[#666]">{title.longTitle}</p>
            <p className="text-[1rem] font-bold text-black">Rs {price.mrp}</p>
            <p className="text-[0.9rem] text-[#999]">{tagline}</p>
          </div>

          {/* Moved AddToBag to the right side */}
          <div className="self-end">
            <AddToBag post={post} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
