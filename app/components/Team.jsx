"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { urlFor } from "../lib/sanity"
import { PortableText } from "next-sanity"
import { IoMdArrowDropleft } from "react-icons/io"
import { IoMdArrowDropright } from "react-icons/io"

const Team = ({ content }) => {
  const [selectedMember, setSelectedMember] = useState(null)
  const [selectedUnit, setSelectedUnit] = useState("brotas")
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

  const handleImageClick = (member) => {
    setSelectedMember(member)
  }

  const closePopup = () => {
    setSelectedMember(null)
  }

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit)
  }

  const filteredTeam = content.team.filter((member) => member.unit === selectedUnit)
  console.log(selectedMember)
  return (
    <section
      id={content?.navlinks[2]}
      className="relative px-[8%] pb-[100px] pt-7">
      <div className="absolute inset-0 bg-[url('/teamBg.png')] bg-cover -z-10"></div>
      <div className="flex items-center sm:justify-between justify-center gap-3 mb-7">
        <p className=" font-lilita-one text-primary text-clamp-title text-nowrap">Nosso Time</p>
        <div className=" h-1 w-full flex bg-tertiary"></div>
      </div>
      <div className="flex items-center justify-center flex-col">
        <div className="flex gap-3 mb-16">
          <button
            className={` border-2 border-primary rounded-2xl px-4 py-2 font-lilita-one text md:active:scale-95  ${selectedUnit === "brotas" ? "bg-primary text-white" : " bg-none text-primary"}`}
            onClick={() => handleUnitClick("brotas")}>
            Brotas
          </button>
          <button
            className={` border-2 border-primary rounded-2xl px-4 py-2 font-lilita-one text md:active:scale-95  ${selectedUnit === "rv" ? "bg-primary text-white" : " bg-none text-primary"}`}
            onClick={() => handleUnitClick("rv")}>
            Rio Vermelho
          </button>
        </div>
        <div className="relative w-[95%] mx-auto">
          {isOverflowing && (
            <>
              {/* Left Arrow Button */}
              <div className="absolute top-[120px]  left-[-40px] sm:block hidden">
                <button
                  onClick={handleScrollLeft}
                  className="bg-primary text-white p-[1px] rounded-2xl shadow-md transform active:scale-75 transition-transform flex items-center justify-center">
                  <IoMdArrowDropleft fontSize={25} />
                </button>
              </div>

              {/* Right Arrow Button */}
              <div className="absolute top-[120px] right-[-40px] sm:block hidden">
                <button
                  onClick={handleScrollRight}
                  className="bg-primary text-white p-[1px] rounded-2xl shadow-md transform active:scale-75 transition-transform flex items-center justify-center">
                  <IoMdArrowDropright fontSize={25} />
                </button>
              </div>
            </>
          )}
          <div
            ref={carouselRef}
            className={
              isOverflowing
                ? "flex gap-8 overflow-x-scroll hide-scroll-bar pt-2 px-4 pb-10 sm:border-x-2 border-primary "
                : "flex justify-center overflow-x-scroll hide-scroll-bar space-x-3 p-2 pb-10 sm:border-x-2 border-primary"
            }
            style={{ scrollBehavior: "smooth" }}>
            {filteredTeam.map((member, index) => (
              <div
                className="relative flex-shrink-0 items-center justify-center cursor-pointer"
                key={member._key}
                onClick={() => handleImageClick(member)}>
                <div>
                  <Image
                    className="w-[170px] h-[170px] sm:w-[210px] sm:h-[210px] rounded-lg object-cover object-center shadow-lg"
                    src={urlFor(member.image).url()}
                    alt={`Slide ${index}`}
                    width={500}
                    height={500}
                    priority={true}
                  />
                </div>
                <div>
                  <p className="absolute left-[-10px]  -mt-5 w-[190px] sm:w-[230px] text-center text-nowrap bg-tertiary overflow-hidden px-4 py-2 rounded-2xl shadow-lg text-white">
                    {member.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white max-w-[900px] overflow-x-hidden w-[98%] max-h-[98%] overflow-y-auto p-5 md:p-8 rounded-lg mx-auto my-4 shadow-lg relative border-b-8 border-primary">
            <button
              className="sticky flex items-center justify-center top-0 left-[100%] font-lilita-one bg-tertiary text-white w-6 h-6 text-sm md:w-8 md:h-8 md:text-xl rounded-lg transform active:scale-75 transition-transform"
              onClick={closePopup}>
              X
            </button>
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 text-senary">
              <div className="flex items-center gap-4 flex-shrink-0">
                <Image
                  className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full object-cover object-center"
                  src={urlFor(selectedMember.image).url()}
                  alt={selectedMember.name}
                  width={500}
                  height={500}
                  priority={true}
                />
              </div>
              <div className="text-center md:text-start">
                <div className="mb-5 md:bm-8">
                  <h2 className="text-xl font-bold text-primary ">{selectedMember.name}</h2>
                  <h3 className="mb-2  text-nowrap">{selectedMember.code}</h3>
                  <div className="w-full h-[2px] bg-tertiary"></div>
                </div>
                <div className="leading-7 text-justify">
                  <PortableText value={selectedMember.text} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Team
