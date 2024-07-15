"use client"
import { FaArrowAltCircleUp } from "react-icons/fa"
import { useEffect, useState } from "react"

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <div className="w-full max-w-screen-2xl fixed bottom-0 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="text-tertiary z-50 opacity-60 m-10">
          <FaArrowAltCircleUp fontSize={50} />
        </button>
      )}
    </div>
  )
}

export default ScrollToTopButton
