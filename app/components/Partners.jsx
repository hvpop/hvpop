"use client"
import React, { useState } from "react"
import { urlFor } from "../lib/sanity"
import Image from "next/image"
import { PortableText } from "next-sanity"

const Partners = ({ content }) => {
  const [selectedPartner, setSelectedPartner] = useState(null)

  const handleImageClick = (partner) => {
    setSelectedPartner(partner)
  }

  const closePopup = () => {
    setSelectedPartner(null)
  }

  console.log(content)

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-[2%] mb-3">
        {content.partners.map((partner, index) => (
          <div
            key={index}
            className="relative md:w-[120px] md:h-[120px] w-[70px] h-[70px] rounded-full shadow-lg overflow-hidden cursor-pointer"
            onClick={() => handleImageClick(partner)}>
            <Image
              className="w-full h-full object-cover object-center"
              src={urlFor(partner.image).url()}
              alt="Sócio"
              width={500}
              height={500}
              priority={true}
            />
            <div className="absolute inset-0 sm:bg-gradient-to-t from-primary opacity-0 hover:opacity-75 transition-opacity duration-300 ease-in-out flex items-center justify-center">
              <span className="sm:flex hidden justify-center items-center whitespace-nowrap font-lilita-one text-white text-clamp-text">
                Ver mais
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white max-w-[800px] overflow-x-hidden w-10/12 max-h-svh overflow-y-auto p-5 md:p-8 rounded-lg mx-auto my-4 shadow-lg relative border-b-8 border-primary">
            <button
              className="absolute flex items-center justify-center top-3 right-3 font-lilita-one bg-tertiary text-white w-6 h-6 text-sm md:w-8 md:h-8 md:text-xl rounded-lg transform active:scale-75 transition-transform"
              onClick={closePopup}>
              X
            </button>
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 text-senary">
              <div className="flex items-center gap-4 flex-shrink-0">
                <Image
                  className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full object-cover object-center"
                  src={urlFor(selectedPartner.image).url()}
                  alt={selectedPartner.name}
                  width={500}
                  height={500}
                  priority={true}
                />
              </div>
              <div className="text-center md:text-start">
                <div className="mb-5 md:bm-8">
                  <h2 className="text-xl font-bold text-primary  text-nowrap">
                    {selectedPartner.name}
                  </h2>
                  <h3 className="mb-2  text-nowrap">{selectedPartner.code}</h3>
                  <div className="w-full h-[2px] bg-tertiary"></div>
                </div>
                <div className="leading-7 text-justify">
                  <PortableText value={selectedPartner.text} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Partners
