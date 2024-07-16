"use client"
import Image from "next/image"
import React, { useState } from "react"
import { urlFor } from "../lib/sanity"
import { BiExpandAlt } from "react-icons/bi"

const ImagesPets = ({ content }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageClick = (url) => {
    setSelectedImage(url)
  }

  const handleCloseImage = () => {
    setSelectedImage(null)
  }

  const [hoveredIndex, setHoveredIndex] = useState(-1)

  return (
    <div className="relative">
      <div className="md:grid hidden grid-cols-6 grid-rows-3 gap-[5px] 2xl:h-[650px] xl:h-[550px] lg:h-[450px] h-[350px]">
        {content?.imagesPets.map((image, index) => (
          <div
            key={index}
            className={`relative w-full h-full ${index === 0 || index === 4 ? "row-span-3" : ""} ${
              index === 1 || index === 7 ? "col-span-2" : ""
            } ${index === 5 || index === 6 ? "row-span-2" : ""} ${
              index === 7 ? "row-span-2" : ""
            } cursor-pointer `}
            onClick={() => handleImageClick(urlFor(image).url())}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}>
            <Image
              className="w-full h-full object-cover"
              src={urlFor(image).url()}
              alt={`Pet ${index}`}
              width={500}
              height={500}
              priority={true}
            />
            {hoveredIndex === index && (
              <div className="md:flex hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-75 transition-opacity duration-300 ease-in-out"></div>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                  <BiExpandAlt fontSize={100} />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="md:hidden grid grid-cols-3 grid-rows-4 gap-[3px] h-[550px]">
        {content?.imagesPets.map((image, index) => (
          <div
            key={index}
            className={`relative w-full h-full ${index === 0 || index === 3 ? "col-span-2" : ""} ${
              index === 4 || index === 6 ? "row-span-2" : ""
            } cursor-pointer `}
            onClick={() => handleImageClick(urlFor(image).url())}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}>
            <Image
              className="w-full h-full object-cover"
              src={urlFor(image).url()}
              alt={`Pet ${index}`}
              width={500}
              height={500}
              priority={true}
            />
            {hoveredIndex === index && (
              <div className="md:flex hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-75 transition-opacity duration-300 ease-in-out"></div>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                  <BiExpandAlt fontSize={100} />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseImage}>
          <div className="relative mx-[5%]">
            <Image
              className="max-h-full max-w-full mx-auto rounded-lg"
              src={urlFor(selectedImage).url()}
              alt="Enlarged"
              width={500}
              height={500}
              priority={true}
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

export default ImagesPets
