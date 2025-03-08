"use client";

import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Image from "next/image";
import coreTeamData from "./coreTeamMembers.json";
import CoreTeamCard from "./CoreTeamCard";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="absolute inset-0 z-0">
        <Image
          src="/about-bg3.png"
          alt="About Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 opacity-50"
          priority
        />
      </div>
      <main className="container mx-auto px-8 sm:px-6 lg:px-16 py-20 relative">
        {/*About TEDxAteneoDeManilaU */}
        <div>
          <div className="flex xl:flex-row my-[10rem]  gap-10 flex-col">
            <h1 className="text-4xl md:text-6xl text-center font-bold text-red-500">
              About TEDx
              <span className="text-white font-thin">AteneoDeManilaU</span>
            </h1>
            <section className="prose prose-lg mx-auto prose-invert border-l-2 pl-2">
              <p className="text-gray-300 leading-relaxed text-xl">
                Since 2024, TEDxAteneoDeManilaU has been under the Ateneo
                Management Association (AMA). Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
            </section>
          </div>
        </div>
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

        {/*About TEDx */}
        <div className="flex xl:flex-row mt-52 gap-10 flex-col">
          <div className="xl:order-2 my-12 xl:px-[10rem] text-nowrap text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-center text-red-500">
              About TEDx
            </h1>
            <span>x = independently organized event</span>
          </div>
          <section className="prose prose-lg mx-auto prose-invert border-r-2 pr-2">
            <p className="text-gray-300 leading-relaxed text-xl">
              In the spirit of discovering and spreading ideas, TEDx is a
              program of local, self-organized events that bring people together
              to share a TED-like experience. At a TEDx event, TED Talks video
              and live speakers combine to spark deep discussion and connection.
              These local, self-organized events are branded TEDx, where x =
              independently organized TED event. The TED Conference provides
              general guidance for the TEDx program, but individual TEDx events
              are self-organized. (Subject to certain rules and regulations.)
            </p>
          </section>
        </div>
        <div className="flex flex-col justify-center items-center my-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-center text-red-500">
            About TED
          </h1>
          <span>x = independently organized event</span>
        </div>
        <section className="prose prose-lg mx-auto prose-invert">
          <p className="text-gray-300 leading-relaxed text-xl mb-6">
            TED is a nonprofit, nonpartisan organization dedicated to
            discovering, debating and spreading ideas that spark conversation,
            deepen understanding and drive meaningful change. Our organization
            is devoted to curiosity, reason, wonder and the pursuit of knowledge
            — without an agenda. We welcome people from every discipline and
            culture who seek a deeper understanding of the world and connection
            with others, and we invite everyone to engage with ideas and
            activate them in your community.
          </p>
          <p className="text-gray-300 leading-relaxed text-xl mb-6">
            TED began in 1984 as a conference where Technology, Entertainment
            and Design converged, but today it spans a multitude of worldwide
            communities and initiatives exploring everything from science and
            business to education, arts and global issues. In addition to the
            TED Talks curated from our annual conferences and published on
            TED.com, we produce{" "}
            <a href="https://audiocollective.ted.com" className="underline">
              original podcasts
            </a>
            ,{" "}
            <a href="https://www.ted.com/series" className="underline">
              short video series
            </a>
            ,{" "}
            <a href="https://ed.ted.com/" className="underline">
              animated educational lessons (TED-Ed)
            </a>{" "}
            and TV programs that are translated into more than 100 languages and
            distributed via partnerships around the world. Each year, thousands
            of independently run{" "}
            <a
              href="https://www.ted.com/about/programs-initiatives/tedx-program"
              className="underline"
            >
              TEDx events
            </a>{" "}
            bring people together to share ideas and bridge divides in
            communities on every continent. Through the{" "}
            <a href="https://www.audaciousproject.org/" className="underline">
              Audacious Project
            </a>
            , TED has helped catalyze more than $3 billion in funding for
            projects that seek to make the world more beautiful, sustainable and
            just. In 2020, TED launched{" "}
            <a href="https://countdown.ted.com/" className="underline">
              Countdown
            </a>
            , an initiative to accelerate solutions to the climate crisis and
            mobilize a movement for a net-zero future, and in 2023 TED launched{" "}
            <a
              href="https://www.ted.com/about/programs-initiatives/teddemocracy"
              className="underline"
            >
              TED Democracy
            </a>{" "}
            to spark a new kind of conversation focused on realistic pathways
            towards a more vibrant and equitable future. View a full list of{" "}
            <a
              href="https://www.ted.com/about/programs-initiatives"
              className="underline"
            >
              TED’s many programs and initiatives
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
