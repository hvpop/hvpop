"use client"

import { useEffect, useRef, useState } from "react"
import { urlFor } from "../lib/sanity"
import Image from "next/image"
import { IoMdArrowDropleft } from "react-icons/io"
import { IoMdArrowDropright } from "react-icons/io"
import { PortableText } from "next-sanity"

const Testimonials = ({ content }) => {
  const carouselRef = useRef(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const checkOverflow = () => {
      if (carouselRef.current) {
        setIsOverflowing(carouselRef.current.scrollWidth > carouselRef.current.clientWidth)
      }
    }

    checkOverflow()
    window.addEventListener("resize", checkOverflow)

    return () => {
      window.removeEventListener("resize", checkOverflow)
    }
  }, [])

  const handleScroll = (scrollOffset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += scrollOffset
    }
  }

  const handleScrollLeft = () => {
    handleScroll(-200)
  }

  const handleScrollRight = () => {
    handleScroll(200)
  }

  const backgroundImageUrl = urlFor(content.testemonialsBg).url()

  return (
    <section
      id={content?.navlinks[4]}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      className="bg-cover bg-center pt-7">
      <div className="relative w-[80%]  mx-auto">
        {isOverflowing && (
          <>
            {/* Left Arrow Button */}
            <div className="absolute top-[300px]  left-[-60px] sm:block hidden">
              <button
                onClick={handleScrollLeft}
                className="bg-tertiary text-white p-[1px] rounded-3xl shadow-md transform active:scale-75 transition-transform flex items-center justify-center">
                <IoMdArrowDropleft fontSize={40} />
              </button>
            </div>

            {/* Right Arrow Button */}
            <div className="absolute top-[300px] right-[-60px] sm:block hidden">
              <button
                onClick={handleScrollRight}
                className="bg-tertiary text-white p-[1px] rounded-3xl shadow-md transform active:scale-75 transition-transform flex items-center justify-center">
                <IoMdArrowDropright fontSize={40} />
              </button>
            </div>
          </>
        )}
        <div
          ref={carouselRef}
          className={
            isOverflowing
              ? "flex gap-8 overflow-x-scroll hide-scroll-bar px-4 py-16  "
              : "flex overflow-x-scroll hide-scroll-bar gap-8 px-4 py-16 "
          }
          style={{ scrollBehavior: "smooth" }}>
          {content.testemonials.map((test, index) => (
            <div
              className="relative flex flex-col min-w-[300px] h-[400px] md:min-w-[450px] md:h-[500px] bg-white bg-opacity-85 p-7 rounded-lg border-t-[15px] border-primary shadow-lg"
              key={test._key}>
              <div className="self-start">
                <Image
                  className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] rotate-180"
                  src="/ap.png"
                  alt="ap"
                  width={200}
                  height={200}
                  priority={true}
                />
              </div>
              <div className="absolute transform left-1/2 -translate-x-1/2 top-[-50px]">
                <Image
                  className="w-[90px] h-[90px] md:w-[120px] md:h-[120px]  rounded-full border-4 border-white  object-cover object-center shadow-lg"
                  src={urlFor(test.image).url()}
                  alt={`Slide ${index}`}
                  width={500}
                  height={500}
                  priority={true}
                />
              </div>
              <div className="leading-7 text-justify text-senary overflow-y-scroll min-h-[160px] hide-scroll-bar">
                <PortableText value={test.text} />
              </div>
              <div className="flex items-end justify-between">
                <div className="text-primary overflow-hidden">
                  <p className="font-bold text-nowrap">{test.name}</p>
                  <p>{test.petText}</p>
                </div>
                <div className="self-end">
                  <Image
                    className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] rotate-180"
                    src="/ap.png"
                    alt="ap"
                    width={200}
                    height={200}
                    priority={true}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
