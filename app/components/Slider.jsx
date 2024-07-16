"use client"
import React, { useState, useEffect, useRef } from "react"
import { urlFor } from "../lib/sanity"
import { IoMdArrowDropleft } from "react-icons/io"
import { IoMdArrowDropright } from "react-icons/io"

const Slider = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [])

  const startInterval = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.slideImages.length)
    }, 4000)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? content.slideImages.length - 1 : prevIndex - 1
    )
    startInterval()
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.slideImages.length)
    startInterval()
  }

  const goToIndex = (index) => {
    setCurrentIndex(index)
    startInterval()
  }

  return (
    <div className="relative w-full h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[30rem] xl:h-[35rem] 2xl:h-[40rem]  overflow-hidden">
      {content.slideImages.map((image, index) => (
        <div
          key={index}
          className={`absolute h-full bg-cover w-full bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${urlFor(image).url()})` }}></div>
      ))}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {content.slideImages.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 shadow-lg rounded-full cursor-pointer transition-opacity duration-300 ${
              index === currentIndex ? "bg-tertiary" : "bg-white"
            }`}
            onClick={() => goToIndex(index)}></span>
        ))}
      </div>
      <button
        className="absolute pl-1 left-0 top-1/2 transform -translate-y-1/2 md:flex hidden "
        onClick={goToPrevious}>
        <IoMdArrowDropleft
          fontSize={35}
          color="white"
        />
      </button>
      <button
        className="absolute pr-1 right-0 top-1/2 transform -translate-y-1/2 md:flex hidden"
        onClick={goToNext}>
        <IoMdArrowDropright
          fontSize={35}
          color="white"
        />
      </button>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-secondary w-[84%] h-5 rounded-t-2xl "></div>
    </div>
  )
}

export default Slider
