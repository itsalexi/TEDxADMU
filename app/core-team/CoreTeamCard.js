import React from "react";
import Image from "next/image";

const CoreTeamCard = ({ name, role, image }) => {
  return (
    <div className="w-32 h-52 md:w-36 md:h-56 aspect-square text-white bg-gray-900 bg-opacity-70 rounded-md flex flex-col items-center justify-center p-4 shadow-lg shadow-red-400 transition-transform transform hover:scale-105">
      <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3">
        {/* Red circular frame always present */}
        <div className="absolute inset-0 rounded-full border-2 border-red-500 p-0.5">
          <div className="relative w-full h-full">
            {image ? (
              <Image
                src={image}
                alt={name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            ) : (
              /* White star placeholder when no image is available */
              <div className="w-full h-full rounded-full flex items-center justify-center text-center text-gray-300">
                Coming Soon
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-16 h-16 opacity-90"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <h3 className="text-lg h-14 w-full flex items-center justify-center text-center font-semibold">
        {name}
      </h3>
      {role && <p className="text-sm text-gray-400">{role}</p>}
    </div>
  );
};

export default CoreTeamCard;
