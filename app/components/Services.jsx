"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { urlFor } from "../lib/sanity"
import Principles from "./Principles"
import ChipCanvas from "./ChipCanvas"
import ImagesPets from "./ImagesPets"

const Services = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const groupSize = 8
  const totalSlides = Math.ceil(content.services.length / groupSize)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + groupSize
      return nextIndex >= content.services.length ? 0 : nextIndex
    })
  }

  const handleBulletClick = (index) => {
    setCurrentIndex(index * groupSize)
  }

  useEffect(() => {
    if (totalSlides > 1) {
      const interval = setInterval(() => {
        handleNext()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [content.services.length, totalSlides])

  const servicesToDisplay = content.services.slice(currentIndex, currentIndex + groupSize)

  return (
    <section
      id={content.navlinks[1]}
      className="relative pt-24">
      <Principles content={content} />
      <div className="grid md:grid-cols-2 py-10 relative">
        {/* mobile */}
        <div className="md:hidden block absolute top-[-19%] right-0 transform ">
          <ChipCanvas scale={0.4} />
        </div>
        <div className="md:hidden block absolute bottom-[-16%] left-[-5%] transform -scale-x-100 z-10 ">
          <ChipCanvas scale={0.2} />
        </div>
        <div className="md:hidden block absolute bottom-[30%] right-0  ">
          <Image
            className="w-[40%]"
            src="/bone.png"
            alt="Bone"
            width={100}
            height={100}
            priority={true}
          />
        </div>
        <div className="md:hidden block absolute top-[10%] left-[-5%] rotate-90  ">
          <Image
            className="w-[50%]"
            src="/bone.png"
            alt="Bone"
            width={100}
            height={100}
            priority={true}
          />
        </div>
        <div className="md:hidden block absolute top-[30%] right-[13%] rotate-12 ">
          <Image
            className="w-[60%]"
            src="/heart.png"
            alt="Heart"
            width={100}
            height={100}
            priority={true}
          />
        </div>
        <div className="md:hidden block absolute bottom-[2%] right-[1%] -rotate-12 ">
          <Image
            className="w-[40%]"
            src="/heart.png"
            alt="Heart"
            width={100}
            height={100}
            priority={true}
          />
        </div>
        {/* desktop */}
        <div className="hidden md:block absolute top-[-10%] left-0 z-30">
          <ChipCanvas scale={0.4} />
        </div>
        <div className="hidden md:block absolute bottom-[-10%] right-[5%] z-30">
          <ChipCanvas scale={0.35} />
        </div>
        <div className="hidden md:block absolute top-[15%] right-0 transform -scale-x-100 ">
          <ChipCanvas scale={0.3} />
        </div>
        <div className="hidden md:block absolute bottom-[10%] left-[5%] transform -scale-x-100 z-30 ">
          <ChipCanvas scale={0.2} />
        </div>
        <div className="hidden md:block absolute bottom-[10%] left-0 rotate-90 ">
          <Image
            className="2xl:w-[70%] xl:w-[65%] lg:w-[60%] w-[55%]"
            src="/bone.png"
            alt="Bone"
            width={100}
            height={100}
            priority={true}
          />
        </div>
        <div className="hidden md:block absolute bottom-[40%] right-0 -z-10">
          <Image
            className="2xl:w-[55%] xl:w-[50%] lg:w-[45%] w-[40%]"
            src="/bone.png"
            alt="Bone"
            width={100}
            height={100}
            priority={true}
          />
        </div>
        <div className="hidden md:block absolute bottom-[25%] left-[40%] rotate-12">
          <Image
            className="2xl:w-[45%] xl:w-[40%] lg:w-[35%] w-[30%]"
            src="/heart.png"
            alt="Heart"
            width={100}
            height={100}
            priority={true}
          />
        </div>
        <div className="hidden md:block absolute top-[20%] left-[5%] -rotate-12">
          <Image
            className="2xl:w-[65%] xl:w-[60%] lg:w-[55%] w-[50%]"
            src="/heart.png"
            alt="Heart"
            width={100}
            height={100}
            priority={true}
          />
        </div>
        <div className="hidden md:block absolute top-[10%] right-[15%] -rotate-12 -z-10">
          <Image
            className="2xl:w-[50%] xl:w-[45%] lg:w-[40%] w-[35%]"
            src="/heart.png"
            alt="Heart"
            width={100}
            height={100}
            priority={true}
          />
        </div>
        <div className="md:flex items-center justify-center hidden">
          <Image
            className="max-w-[70%]"
            src={urlFor(content.servicesBg).url()}
            alt="Background"
            width={500}
            height={500}
            priority={true}
          />
        </div>
        <div className="flex items-center justify-center px-[8%] h-96">
          <ul className="flex items-start justify-start flex-col gap-2 w-full max-w-xl h-full pt-[10%] md:pt-[17%] ">
            {servicesToDisplay.map((service, index) => (
              <li
                key={index}
                className="flex items-center gap-5">
                <div>
                  <div className="bg-secondary w-2 h-2 rounded-full"></div>
                </div>
                <p className="font-lilita-one text-clamp-title text-tertiary drop-shadow-[0_1.2px_1.2px_rgba(21,24,104,0.4)]">
                  {service}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 py-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              onClick={() => handleBulletClick(index)}
              className={`w-4 h-4 rounded-full cursor-pointer ${index === Math.floor(currentIndex / groupSize) ? "bg-tertiary" : "bg-gray-300"}`}></div>
          ))}
        </div>
      )}
      <div className="absolute w-full z-20">
        <ImagesPets content={content} />
      </div>
    </section>
  )
}

export default Services
