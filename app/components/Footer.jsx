"use client"
import { RiInstagramFill } from "react-icons/ri"
import { RiWhatsappFill } from "react-icons/ri"
import { MdEmail } from "react-icons/md"
import { IoCall } from "react-icons/io5"
import { PortableText } from "next-sanity"
import { useEffect, useState } from "react"
import emailjs from "@emailjs/browser"
import { urlFor } from "../lib/sanity"
import Image from "next/image"

const Footer = ({ content }) => {
  const [showModal, setShowModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSliding, setIsSliding] = useState(true) // Start sliding by default
  const itemsPerPage = 4

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_PUBLIC_KEY)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(process.env.NEXT_PUBLIC_SERVICE_KEY, process.env.NEXT_PUBLIC_TEMPLATE_KEY, e.target)
      .then(
        () => {
          console.log("SUCCESS!")
        },
        (error) => {
          console.log("FAILED...", error)
        }
      )

    e.target.reset()
  }

  useEffect(() => {
    if (isSliding) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = prevIndex + itemsPerPage
          return newIndex >= content.sponsors.length ? 0 : newIndex
        })
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [isSliding, content.sponsors.length])

  const visiblesponsors =
    content.sponsors.length <= itemsPerPage
      ? content.sponsors
      : isSliding
        ? content.sponsors.slice(currentIndex, currentIndex + itemsPerPage)
        : content.sponsors

  return (
    <footer
      id={content?.navlinks[5]}
      className="pt-7">
      <div className="flex flex-col md:flex-row justify-between pb-5">
        <div className="p-4 flex flex-col gap-3">
          <h2 className="text-primary font-lilita-one text-clamp-title">Contatos</h2>
          <p className="flex gap-2 items-center text-senary">
            <span className="text-tertiary">
              <RiWhatsappFill fontSize={20} />
            </span>
            {content.contact.whatsapp}
          </p>
          <p className="flex gap-2 items-center text-senary">
            <span className="text-tertiary">
              <IoCall fontSize={20} />
            </span>
            {content.contact.telBrotas}
          </p>
          <p className="flex gap-2 items-center text-senary">
            <span className="text-tertiary">
              <IoCall fontSize={20} />
            </span>
            {content.contact.telRV}
          </p>
          <p className="flex gap-2 items-center text-senary">
            <span className="text-tertiary">
              <RiInstagramFill fontSize={20} />
            </span>
            {content.contact.instagram}
          </p>
          <p className="flex gap-2 items-center text-senary">
            <span className="text-tertiary">
              <MdEmail fontSize={20} />
            </span>
            {content.contact.email}
          </p>
        </div>
        <div className="basis-3/4 p-4">
          <div className="leading-7 text-justify text-senary overflow-y-scroll min-h-[160px] hide-scroll-bar">
            <PortableText value={content.footerText} />
            <form
              id="contact_form"
              onSubmit={sendEmail}
              className="flex flex-col items-center gap-4 mt-4">
              <input
                type="text"
                name="user_name"
                className="w-full p-2 border rounded-2xl border-senary placeholder:text-primary text-secondary bg-quinary"
                placeholder="Nome*"
                required
              />
              <input
                type="email"
                name="user_email"
                className="w-full p-2 border rounded-2xl border-senary placeholder:text-primary text-secondary bg-quinary"
                placeholder="Email*"
                required
              />
              <textarea
                name="message"
                className="w-full p-2 border rounded-2xl border-senary placeholder:text-primary text-secondary bg-quinary"
                rows="4"
                placeholder="Mensagem*"
                required></textarea>
              <input
                type="submit"
                value="Enviar Mensagem"
                className="py-2 px-4 self-center md:self-start bg-primary text-white rounded-2xl font-lilita-one"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-[150px] flex items-center justify-center bg-quinary">
        <div className="flex items-center justify-center">
          {visiblesponsors.map((sponsor, index) => (
            <div key={index}>
              <Image
                className="w-[200px] p-5 object-cover object-center"
                src={urlFor(sponsor).url()}
                alt={`Sponsor ${index}`}
                width={500}
                height={500}
                priority={true}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-36 bg-primary flex items-end">
        <p className="text-white p-2">
          HVPOP | Hospital Veterinário Popular.{" "}
          <span
            className="underline underline-offset-4 text-tertiary cursor-pointer"
            onClick={() => setShowModal(true)}>
            Política de Cookies e Privacidade
          </span>
        </p>
      </div>
      {showModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white p-8 h-[70%] w-[80%] rounded-3xl">
            <button
              className="sticky flex items-center justify-center top-0 left-[100%] font-lilita-one bg-tertiary text-white w-6 h-6 text-sm md:w-8 md:h-8 md:text-xl rounded-lg transform active:scale-75 transition-transform"
              onClick={() => setShowModal(false)}>
              X
            </button>
            <div className="overflow-y-auto max-w-full max-h-full prose text-senary hide-scroll-bar prose-h3:text-tertiary prose-h4:text-tertiary text-justify">
              <PortableText value={content.privacy} />
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
