"use client"
import { useState, useEffect } from "react"

const Stats = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const itemsPerPage = 3

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSliding(true)
      } else {
        setIsSliding(false)
        setCurrentIndex(0)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isSliding) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % content.stats.length)
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [isSliding])

  const visibleStats = isSliding
    ? content.stats.slice(currentIndex, currentIndex + itemsPerPage)
    : content.stats

  return (
    <div className="flex justify-center">
      <div className="mx-[8%] px-[5%] w-full rounded-b-lg text-white font-lilita-one bg-secondary gap-2 whitespace-nowrap pb-4 shadow-lg flex justify-around overflow-hidden lg:overflow-visible">
        {visibleStats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-full lg:w-auto">
            <p className="text-clamp-title">{stat.count}</p>
            <p className="text-clamp-text">{stat.stat}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stats
