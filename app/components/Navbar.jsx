"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { urlFor } from "../lib/sanity"
import { RiInstagramFill } from "react-icons/ri"
import { RiWhatsappFill } from "react-icons/ri"
import { FaArrowAltCircleUp } from "react-icons/fa"

const Navbar = ({ content }) => {
  const [activeSection, setActiveSection] = useState("Home")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(`#${sectionId}`)
    if (element) {
      const marginTop = window.innerWidth >= 640 ? 110 : 65
      const scrollToY = element.getBoundingClientRect().top + window.scrollY - marginTop
      window.scrollTo({ top: scrollToY, behavior: "smooth" })
    }
  }

  const determineActiveSection = () => {
    for (let i = content.navlinks.length - 1; i >= 0; i--) {
      const section = document.getElementById(content.navlinks[i])
      if (section) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(content.navlinks[i])
          break
        }
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
      determineActiveSection()
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [content.navlinks])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  return (
    <nav className="bg-primary max-w-screen-2xl pt-3 w-full px-[8%] z-40 fixed border-b-4 h-[65px] sm:h-[110px] flex flex-col justify-between border-tertiary shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <Image
          className="rounded w-[120px] object-cover object-center"
          src={urlFor(content.logo).url()}
          alt="Logo"
          width={500}
          height={500}
          priority={true}
        />
        <div className="gap-2 text-xs text-white hidden sm:flex">
          <div className="flex items-center justify-center gap-1">
            <RiWhatsappFill fontSize={20} />
            <p className="text-[0.8rem]">{content.contact.whatsapp}</p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <RiInstagramFill fontSize={20} />
            <p className="text-[0.8rem]">{content.contact.instagram}</p>
          </div>
        </div>
        <div
          className="sm:hidden flex flex-col gap-[0.3rem] cursor-pointer transform transition-transform"
          onClick={() => setMenuOpen(!menuOpen)}>
          <div
            className={`w-[1.4rem] h-[0.2rem] bg-white rounded transition-transform duration-300 ${
              menuOpen ? "transform rotate-45 translate-y-[0.5rem]" : ""
            }`}></div>
          <div
            className={`w-[1.4rem] h-[0.2rem] bg-white rounded transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}></div>
          <div
            className={`w-[1.4rem] h-[0.2rem] bg-white rounded transition-transform duration-300 ${
              menuOpen ? "transform -rotate-45 -translate-y-[0.5rem]" : ""
            }`}></div>
        </div>
      </div>
      <ul className="hidden sm:flex text-[0.875rem] items-center gap-[0.3%]">
        {content.navlinks?.map((link) => (
          <li
            key={link}
            onClick={() => {
              scrollToSection(link)
            }}
            className={`${
              activeSection === link
                ? "bg-secondary text-white "
                : "bg-white text-quaternary hover:text-secondary"
            } w-full p-1 flex items-center justify-center h-10 cursor-pointer rounded-t-2xl `}>
            <p className="transform active:scale-90 transition-transform">{link}</p>
          </li>
        ))}
      </ul>
      <div
        className={`absolute top-0 left-0 w-full mt-[3.7rem] pt-5 border-tertiary border-b-4 shadow-lg bg-primary text-white sm:hidden flex flex-col items-center ease-in-out justify-center transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <ul className="text-center text-lg flex flex-col gap-2 w-full">
          {content.navlinks?.map((link) => (
            <li
              key={link}
              onClick={() => {
                scrollToSection(link)
                setMenuOpen(false)
              }}
              className={`${
                activeSection === link
                  ? "text-tertiary border-tertiary"
                  : "text-white border-white border-opacity-10"
              } flex w-full items-center pb-2 border-b justify-center h-10 cursor-pointer `}>
              <p className="transform active:scale-95 transition-transform">{link}</p>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
