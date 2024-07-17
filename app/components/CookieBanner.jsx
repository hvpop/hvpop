"use client"
import { useCookies } from "react-cookie"
import React, { useState, useEffect } from "react"
import { PortableText } from "next-sanity"

const CookieBanner = ({ content }) => {
  const [cookies, setCookie] = useCookies(["cookieConsent"])
  const [showModal, setShowModal] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const giveCookieConsent = () => {
    setCookie("cookieConsent", true, { path: "/" })
  }

  if (!isClient) {
    return null
  }

  return (
    <article className="fixed max-w-screen-2xl z-50 top-0">
      {!cookies.cookieConsent && (
        <div className="bg-white flex p-10">
          <p>
            Nosso site utiliza cookies para personalizar conteúdo e anúncios, fornecer recursos de
            mídia social e analisar nosso tráfego. Ao continuar navegando, você concorda com nossa{" "}
            <span
              className="underline underline-offset-4 text-tertiary cursor-pointer"
              onClick={() => setShowModal(true)}>
              Política de Cookies e Privacidade.
            </span>
          </p>
          <button
            onClick={giveCookieConsent}
            className="bg-tertiary font-lilita-one text-white px-4 py-2 rounded-3xl">
            Aceitar
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white p-8 h-[70%] w-[80%] rounded-3xl">
            <button
              className="sticky flex items-center justify-center top-0 left-[100%] font-lilita-one bg-tertiary text-white w-6 h-6 text-sm md:w-8 md:h-8 md:text-xl rounded-lg transform active:scale-75 transition-transform"
              onClick={() => setShowModal(false)}>
              X
            </button>
            <div className="overflow-y-auto max-w-full max-h-full prose text-senary hide-scroll-bar prose-h3:text-tertiary prose-h4:text-tertiary text-justify ">
              <PortableText value={content.privacy} />
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export default CookieBanner
