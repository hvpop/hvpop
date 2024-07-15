"use client"
import { FaHandshakeSimple } from "react-icons/fa6"
import { FaScaleBalanced } from "react-icons/fa6"
import { FaFileCircleCheck } from "react-icons/fa6"

const Principles = ({ content }) => {
  return (
    <section className="relative bg-primary overflow-hidden text-white py-[4%] px-4">
      <div className="absolute inset-0 bg-[url('/principlesBg.png')] bg-contain opacity-10"></div>
      <div className="relative flex flex-col justify-center items-center z-10">
        <h2 className="font-lilita-one text-clamp-title text-center mb-[2%] leading-none">
          Princípios Pop
        </h2>
        <div className=" grid md:grid-cols-3 grid-cols-1 text-clamp-text">
          <div className="flex max-w-[450px] p-4 items-center justify-center gap-5 md:border-r-[2px] ">
            <div className="bg-white rounded-full p-3 text-tertiary">
              <FaHandshakeSimple fontSize={50} />
            </div>
            <div>
              <h3 className=" font-bold ">Compromisso</h3>
              <p>{content.principles.compromisso}</p>
            </div>
          </div>
          <div className="flex max-w-[450px] p-4 items-center justify-center gap-5 md:border-r-[2px] ">
            <div className="bg-white rounded-full p-3 text-tertiary">
              <FaScaleBalanced fontSize={50} />
            </div>
            <div>
              <h3 className=" font-bold ">Ética</h3>
              <p>{content.principles.etica}</p>
            </div>
          </div>
          <div className="flex max-w-[450px] p-4 items-center justify-center gap-5">
            <div className="bg-white rounded-full p-3 text-tertiary">
              <FaFileCircleCheck fontSize={50} />
            </div>
            <div>
              <h3 className=" font-bold ">Transparência</h3>
              <p>{content.principles.transparencia}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Principles
