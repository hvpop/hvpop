import CookieBanner from "./components/CookieBanner"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import ScrollToTopButton from "./components/ScrollToTopButton"
import Services from "./components/Services"
import Team from "./components/Team"
import Testemonials from "./components/Testemonials"
import Units from "./components/Units"
import { client } from "./lib/sanity"

export const revalidate = 0

const fetchData = async () => {
  const query = `*[_type == "content"] {
    contact,
    logo,
    navlinks,
    slideImages,
    stats,
    story,
    storyImages,
    partners,
    principles,
    services,
    servicesBg,
    imagesPets,
    team,
    units,
    testemonials,
    testemonialsBg,
    footerText,
    privacy,
    sponsors
  }`

  const data = await client.fetch(query)
  return data[0]
}

const Page = async () => {
  const data = await fetchData()

  return (
    <div className="pt-[65px] sm:pt-[110px] relative">
      <ScrollToTopButton />
      <div className="absolute top-0">
        {/* <CookieBanner content={data} /> */}
        <Navbar content={data} />
      </div>
      <main>
        <Home content={data} />
        <Services content={data} />
        <Team content={data} />
        <Units content={data} />
        <Testemonials content={data} />
      </main>
      <Footer content={data} />
    </div>
  )
}

export default Page
