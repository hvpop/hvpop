"use client"
import React, { useRef, useState, useEffect } from "react"
import { BiExpandAlt } from "react-icons/bi"
import { IoMdArrowDropleft } from "react-icons/io"
import { IoMdArrowDropright } from "react-icons/io"
import { urlFor } from "../lib/sanity"
import Image from "next/image"

const StoryMedia = ({ content }) => {
  const carouselRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
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

  const handleImageClick = (index) => {
    setSelectedImage(urlFor(content.storyImages[index]).url())
  }

  const handleCloseImage = () => {
    setSelectedImage(null)
  }

  return (
    <div className="relative w-[80%] mx-auto rounded-lg">
      {isOverflowing && (
        <>
          {/* Left Arrow Button */}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-[-40px] sm:block hidden">
            <button
              onClick={handleScrollLeft}
              className="bg-tertiary text-white p-[1px] rounded-2xl shadow-md transform active:scale-75 transition-transform flex item justify-center">
              <IoMdArrowDropleft fontSize={25} />
            </button>
          </div>

          {/* Right Arrow Button */}
          <div className="absolute top-1/2 transform -translate-y-1/2 right-[-40px] sm:block hidden">
            <button
              onClick={handleScrollRight}
              className="bg-tertiary text-white p-[1px] rounded-2xl shadow-md transform active:scale-75 transition-transform flex item justify-center">
              <IoMdArrowDropright fontSize={25} />
            </button>
          </div>
        </>
      )}
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className={
          isOverflowing
            ? "flex overflow-x-scroll hide-scroll-bar space-x-3 py-4 px-1 "
            : "flex justify-center overflow-x-scroll hide-scroll-bar space-x-3 p-4"
        }
        style={{ scrollBehavior: "smooth" }}>
        {content.storyImages.map((src, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            className="relative flex-shrink-0 md:w-[160px] md:h-[140px] w-[140px] h-[120px] shadow-md rounded-3xl cursor-pointer">
            <Image
              className="w-full h-full rounded-3xl object-cover object-center"
              src={urlFor(src).url()}
              alt={`Slide ${index}`}
              width={500}
              height={500}
              priority={true}
            />
            <div className="absolute inset-0 sm:bg-gradient-to-t from-primary to-transparent opacity-0 hover:opacity-75 rounded-3xl flex items-center justify-center">
              <span className="text-white sm:block hidden">
                <BiExpandAlt fontSize={40} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-40"
          onClick={handleCloseImage}>
          <div className="relative mx-[5%]">
            <img
              src={selectedImage}
              alt="Enlarged"
              className="max-h-full max-w-full mx-auto rounded-lg"
            />
            <button
              className="absolute flex items-center justify-center top-3 right-3 font-lilita-one bg-tertiary text-white w-6 h-6 text-sm md:w-8 md:h-8 md:text-xl rounded-lg transform active:scale-75 transition-transform"
              onClick={handleCloseImage}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default StoryMedia
