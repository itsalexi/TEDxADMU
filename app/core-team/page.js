"use client";

import React from "react";
import Image from "next/image";
import coreTeamData from "./coreTeamMembers.json";
import CoreTeamCard from "./CoreTeamCard";

const CoreTeamPage = () => {
  return (
    <div>
      <div className="relative">
        {/* Core Team Section */}
        <div className="bg-gradient-to-b from-black to-gray-900 pt-56">
          {/* Background Image - Sticky within the Section */}
          <div className="absolute top-[45rem] left-0 w-full h-5/6 place-items-center">
            <div className="sticky top-80 w-full h-32">
              <Image
                src="/coreteam-bg3.png"
                alt="Core Team Background"
                fill
                objectFit="contain"
                className="opacity-70"
                priority
              />
            </div>
          </div>

          {/* Core Team Members */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Core Team Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl text-white font-light">
                Meet the
              </h2>
              <h1 className="text-4xl md:text-6xl text-center font-bold text-red-500">
                TEDx
                <span className="text-white font-thin">AteneoDeManilaU</span>
              </h1>
              <h1 className="text-4xl md:text-7xl font-bold text-red-500 mb-4">
                Core Team
              </h1>
              <p className="text-lg text-white">
                Meet the people who made this event possible.
              </p>
            </div>

            <div className="mx-8">
              {/* Leadership Team */}
              <div className="flex flex-wrap justify-center gap-12 mt-6 w-full">
                {coreTeamData.leadershipTeam.map((category) => (
                  <div
                    key={category.category}
                    className="flex flex-col items-center mb-10"
                  >
                    <h2 className="text-4xl font-bold text-white text-center">
                      {category.category}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 mt-6"> 
                      {category.members.map((member) => (
                        <CoreTeamCard
                          key={member.name}
                          name={member.name}
                          image={member.image}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Core Team */}
              {coreTeamData.coreTeam.map((department) => (
                <div
                  key={department.name}
                  className="flex flex-col items-center mb-10 w-full"
                >
                  <h2 className="text-5xl font-bold text-red-500 text-center">
                    {department.name}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-12 mt-6">
                    {department.committees.map((committee) => (
                      <div
                        key={committee.name}
                        className="text-center md:max-w-[50vw]"
                      >
                        <h3 className="text-2xl font-semibold text-gray-300">
                          {committee.name}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-6 mt-4">
                          {/* Heads */}
                          {committee.heads.map((head) => (
                            <CoreTeamCard
                              key={head.name}
                              name={head.name}
                              image={head.image}
                              role="Head"
                            />
                          ))}
                          {/* Deputies */}
                          {committee.deputies.map((deputy) => (
                            <CoreTeamCard
                              key={deputy.name}
                              name={deputy.name}
                              image={deputy.image}
                              role="Deputy"
                            />
                          ))}
                          {/* Associates */}
                          {committee.associates.map((associate) => (
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Group Photos */}
      <div className="w-full"></div>
    </div>
  );
};

export default CoreTeamPage;
