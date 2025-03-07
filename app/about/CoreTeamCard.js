import React from "react";
import Image from "next/image";

const CoreTeamCard = ({ name, role, image }) => {
  return (
    <div className="w-full aspect-square bg-gray-900 bg-opacity-50 rounded-md flex flex-col items-center justify-center p-4">
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
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-400">{role}</p>
    </div>
  );
};

export default CoreTeamCard;
