"use client"

import Image from "next/image"
import { useState } from "react"
import { urlFor } from "../lib/sanity"
import { IoMdArrowDropup } from "react-icons/io"
import { IoMdArrowDropdown } from "react-icons/io"
import { BiExpandAlt } from "react-icons/bi"

const Units = ({ content }) => {
  const [selectedUnit, setSelectedUnit] = useState("brotas")
  const [selectedImage, setSelectedImage] = useState(null)

  const handleCloseImage = () => {
    setSelectedImage(null)
  }

  const handleUnitClick = (unit) => {
    setSelectedUnit((prevSelectedUnit) =>
      prevSelectedUnit === unit ? (unit === "brotas" ? "rv" : "brotas") : unit
    )
  }

  const handleImageClick = (index) => {
    setSelectedImage(
      urlFor(
        selectedUnit === "brotas" ? content.units[0].images[index] : content.units[1].images[index]
      ).url()
    )
  }

  const filteredUnit = content.units.filter((unit) => unit.unit === selectedUnit)

  return (
    <section
      id={content?.navlinks[3]}
      className="mx-[8%] pt-7 pb-12">
      <div className="flex items-center sm:justify-between justify-center gap-3 mb-7">
        <p className=" font-lilita-one text-primary text-clamp-title text-nowrap">Unidades</p>
        <div className=" h-1 w-full flex bg-tertiary"></div>
      </div>
      <div className="lg:flex w-full block flex-col lg:items-start items-center lg:flex-row gap-10 ">
        <div className="basis-1/2">
          <div className="flex flex-col gap-3 w-[100%] mx-auto  ">
            <div className="flex items-center gap-2">
              <div
                className={`border-2 border-primary flex-shrink-0 rounded-full flex items-center justify-center w-10 h-10 ${selectedUnit === "brotas" ? "bg-primary text-white" : "bg-white text-primary"}`}>
                {selectedUnit === "brotas" ? (
                  <IoMdArrowDropdown fontSize={30} />
                ) : (
                  <IoMdArrowDropup fontSize={30} />
                )}
              </div>
              <button
                className={`w-full border-2 border-primary rounded-3xl px-4 py-2 font-lilita-one text md:active:scale-95  ${selectedUnit === "brotas" ? "bg-primary text-white" : " bg-none text-primary"}`}
                onClick={() => handleUnitClick("brotas")}>
                Brotas
              </button>
            </div>
            <div className="block lg:hidden">
              {selectedUnit === "brotas" && (
                <iframe
                  width="100%"
                  height="250"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Rua%20Engenheiro%20Jos%C3%A9%20Muccini,%20112%20-%20Brotas,%20Salvador%20-%20BA,%2040285-470,%20Brasilien+(HVPop%20-%20Hospital%20Veterin%C3%A1rio%20Popular%20de%20Brotas)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
              )}
            </div>
            {selectedUnit === "brotas"
              ? filteredUnit.map((unit, index) => (
                  <div
                    key={index}
                    className=" mx-auto text-justify text-senary">
                    <p className=" font-bold">{unit.adress}</p>
                    <p>{unit.reference}</p>
                    <div className="w-full max-h-[300px] mx-auto flex flex-wrap items-center justify-center gap-2 overflow-y-scroll hide-scroll-bar p-2">
                      {unit.images.map((image, index) => (
                        <div
                          className="relative"
                          onClick={() => handleImageClick(index)}
                          key={index}>
                          <Image
                            key={index}
                            className="md:w-[100px] md:h-[100px] w-[70px] h-[70px] object-cover object-center shadow-md"
                            src={urlFor(image).url()}
                            alt={`Image ${index}`}
                            width={500}
                            height={500}
                            priority={true}
                          />
                          <div className="absolute inset-0 sm:bg-gradient-to-t from-primary to-transparent opacity-0 hover:opacity-75  flex items-center justify-center">
                            <span className="text-white sm:block hidden">
                              <BiExpandAlt fontSize={35} />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              : ""}
            <div className="flex items-center gap-2">
              <div
                className={`border-2 border-primary flex-shrink-0 rounded-full flex items-center justify-center w-10 h-10 ${selectedUnit === "rv" ? "bg-primary text-white" : "bg-white text-primary"}`}>
                {selectedUnit === "rv" ? (
                  <IoMdArrowDropdown fontSize={30} />
                ) : (
                  <IoMdArrowDropup fontSize={30} />
                )}
              </div>
              <button
                className={`w-full border-2 border-primary rounded-3xl px-4 py-2 font-lilita-one text md:active:scale-95  ${selectedUnit === "rv" ? "bg-primary text-white" : " bg-none text-primary"}`}
                onClick={() => handleUnitClick("rv")}>
                Rio Vermelho
              </button>
            </div>
            <div className="block lg:hidden">
              {selectedUnit === "rv" && (
                <iframe
                  width="100%"
                  height="250"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=R.%20Marqu%C3%AAs%20de%20Monte%20Santo,%20364%20-%20Rio%20Vermelho,%20Salvador%20-%20BA,%2041940-330,%20Brasilien+(MHVpop%20-%20Hospital%20Veterin%C3%A1rio%20Popular%20do%20Rio%20Vermelhoy%20Business%20Name)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
              )}
            </div>
            {selectedUnit === "rv"
              ? filteredUnit.map((unit, index) => (
                  <div
                    key={index}
                    className=" mx-auto text-justify text-senary">
                    <p className=" font-bold">{unit.adress}</p>
                    <p>{unit.reference}</p>
                    <div className="w-full mx-auto flex flex-wrap items-center justify-center gap-2 overflow-y-scroll hide-scroll-bar p-2">
                      {unit.images.map((image, index) => (
                        <div
                          className="relative"
                          onClick={() => handleImageClick(index)}
                          key={index}>
                          <Image
                            key={index}
                            className="md:w-[100px] md:h-[100px] w-[70px] h-[70px] object-cover object-center shadow-md"
                            src={urlFor(image).url()}
                            alt={`Image ${index}`}
                            width={500}
                            height={500}
                            priority={true}
                          />
                          <div className="absolute inset-0 sm:bg-gradient-to-t from-primary to-transparent opacity-0 hover:opacity-75  flex items-center justify-center">
                            <span className="text-white sm:block hidden">
                              <BiExpandAlt fontSize={35} />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className="basis-1/2 p-2 hidden lg:block">
          {selectedUnit === "brotas" ? (
            <iframe
              width="100%"
              height="520"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Rua%20Engenheiro%20Jos%C3%A9%20Muccini,%20112%20-%20Brotas,%20Salvador%20-%20BA,%2040285-470,%20Brasilien+(HVPop%20-%20Hospital%20Veterin%C3%A1rio%20Popular%20de%20Brotas)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
          ) : (
            <iframe
              width="100%"
              height="520"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=R.%20Marqu%C3%AAs%20de%20Monte%20Santo,%20364%20-%20Rio%20Vermelho,%20Salvador%20-%20BA,%2041940-330,%20Brasilien+(MHVpop%20-%20Hospital%20Veterin%C3%A1rio%20Popular%20do%20Rio%20Vermelhoy%20Business%20Name)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
          )}
        </div>
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
              width={600}
              height={600}
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
    </section>
  )
}

export default Units
