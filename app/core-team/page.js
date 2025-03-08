"use client";

import React from "react";
import Footer from "../Footer";
import Image from "next/image";
import coreTeamData from "./coreTeamMembers.json";
import CoreTeamCard from "./CoreTeamCard";

const CoreTeamPage = () => {
  return (
    <div>
      {/* Core Team Section */}
      <div className="relative">
        {/* Background Image - Sticky within the Section */}
        <div className="absolute top-48 left-0 w-full h-full ">
          <div className="sticky top-0 h-screen">
            <Image
              src="/coreteam-bg2.png" // sample image
              alt="Core Team Background"
              width={1920}
              height={1000}
              layout="responsive"
              className="opacity-70 w-[screen]"
              priority
            />
          </div>
        </div>

        {/* Core Team Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Core Team Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl text-center font-bold text-red-500">
              TEDx
              <span className="text-white font-thin">AteneoDeManilaU</span>
            </h1>
            <h1 className="text-4xl md:text-7xl font-bold text-red-500 mb-4">
              Core Team
            </h1>
            <p className="text-lg">
              Meet the people who made this event possible.
            </p>
          </div>

          {coreTeamData.map((department) => (
            <div
              key={department.name}
              className="flex flex-col items-center mb-10"
            >
              <h2 className="text-4xl font-bold text-white">
                {department.name}
              </h2>

              {department.committees.map((committee) => (
                <div key={committee.name} className="text-center mt-6">
                  <h3 className="text-2xl font-semibold text-gray-300">
                    {committee.name}
                  </h3>

                  <div className="flex gap-6 justify-center items-center mt-4">
                    {/* Render Heads */}
                    {committee.heads.map((head) => (
                      <CoreTeamCard
                        key={head.name}
                        name={head.name}
                        image={head.image}
                        role="Head"
                      />
                    ))}

                    {/* Render Deputies */}
                    {committee.deputies.length > 0 &&
                      committee.deputies.map((deputy) => (
                        <CoreTeamCard
                          key={deputy.name}
                          name={deputy.name}
                          image={deputy.image}
                          role="Deputy"
                        />
                      ))}

                    {/* Render Associates */}
                    {committee.associates.length > 0 &&
                      committee.associates.map((associate) => (
                        <CoreTeamCard
                          key={associate}
                          name={associate}
                          role="Associate"
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoreTeamPage;
