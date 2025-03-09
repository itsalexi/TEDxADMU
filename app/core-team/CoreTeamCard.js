import React from "react";
import Image from "next/image";

const CoreTeamCard = ({ name, role, image }) => {
  return (
    <div className="flex-1 max-w-[25vw] aspect-square text-white bg-gray-900 bg-opacity-70 rounded-md flex flex-col items-center justify-center p-4 shadow-lg shadow-red-400 transition-transform transform hover:scale-105">
      {image && (
        <div className="relative w-24 h-24 mb-3">
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      )}
      <h3 className="text-lg text-center font-semibold">{name}</h3>
      {role && <p className="text-sm text-gray-400">{role}</p>}
    </div>
  );
};

export default CoreTeamCard;
