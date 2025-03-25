import React from 'react'
import { Typewriter } from "@/components/typeWriter";
import { TextShimmer } from "@/components/textShimmer";

function WebdevSection() {
  return (
    <section id="webdev-section">
        <div>
          <div className="w-full h-full md:text-4xl lg:text-5xl sm:text-3xl text-2xl flex flex-row items-start justify-start bg-background font-normal overflow-hidden p-16 pt-48">
            <div className="whitespace-pre-wrap z-50 text-white">
              <span>{"Special thanks to our "}</span>
              <Typewriter
                text={[
                  "Website Development",
                  "GOAT",
                  "hard carry",
                  "insanely handsome",
                  "infinite aura",
                ]}
                speed={70}
                className="text-[#eb0028]"
                waitTime={1500}
                deleteSpeed={40}
                cursorChar={"_"}
              />
              <span>team</span>
            </div>
          </div>
          <div className="flex flex-col">
            <TextShimmer
              duration={1.2}
              className="text-xl font-medium [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
            >
              Alexi Roth Canamo
            </TextShimmer>
            <TextShimmer
              duration={1.2}
              className="text-xl font-medium [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
            >
              Carl Washington Siy
            </TextShimmer>
            <TextShimmer
              duration={1.2}
              className="text-xl font-medium [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
            >
              John Jerome Pardo
            </TextShimmer>
          </div>
        </div>
      </section>
  )
}

export default WebdevSection