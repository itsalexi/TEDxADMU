"use client";

import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-8 sm:px-6 lg:px-16 py-20">
        <div className="flex flex-col justify-center items-center my-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-center text-red-500">
            About TEDx
          </h1>
          <span>x = independently organized event</span>
        </div>
        <section className="prose prose-lg mx-auto prose-invert">
          <p className="text-gray-300 leading-relaxed text-xl">
            In the spirit of discovering and spreading ideas, TEDx is a program
            of local, self-organized events that bring people together to share
            a TED-like experience. At a TEDx event, TED Talks video and live
            speakers combine to spark deep discussion and connection. These
            local, self-organized events are branded TEDx, where x =
            independently organized TED event. The TED Conference provides
            general guidance for the TEDx program, but individual TEDx events
            are self-organized. (Subject to certain rules and regulations.)
          </p>
        </section>
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
