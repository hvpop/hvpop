"use client"

import { PortableText } from "next-sanity"
import Partners from "./Partners"

// import Owners from "./Owners"
// import StoryMedia from "./StoryMedia"

const Story = ({ content }) => {
  return (
    <div className="px-[8%] py-8 flex flex-col gap-8">
      <div className="flex items-center sm:justify-between justify-center gap-3">
        <p className=" font-lilita-one text-primary text-clamp-title text-nowrap">Nossa História</p>
        <div className=" h-1 w-full flex bg-tertiary"></div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <Partners content={content} />
        <div className="text-clamp-text text-senary text-justify leading-6">
          <PortableText value={content.story} />
        </div>
        {/* <StoryMedia /> */}
      </div>
    </div>
  )
}

export default Story
