import React from "react";
import Image from "next/image";

const CoreTeamCard = ({ name, role, image }) => {
  return (
    <div className="flex flex-col items-center bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      {image ? (
        <Image
          src={image}
          alt={name}
          width={96}
          height={96}
          className="object-cover rounded-full mb-2"
        />
      ) : (
        <div className="w-24 h-24 flex items-center justify-center bg-gray-700 rounded-full mb-2">
          <span className="text-sm text-gray-400">No Image</span>
        </div>
      )}
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-400">{role}</p>
    </div>
  );
};

export default CoreTeamCard;
