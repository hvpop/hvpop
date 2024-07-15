import Footer from "./components/Footer"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import ScrollToTopButton from "./components/ScrollToTopButton"
import Services from "./components/Services"
import Team from "./components/Team"
import Testemonials from "./components/Testemonials"
import Units from "./components/Units"
import { client } from "./lib/sanity"

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
  }`

  const data = await client.fetch(query)
  return data[0]
}

const Page = async () => {
  const data = await fetchData()
  return (
    <>
      <ScrollToTopButton />
      <Navbar content={data} />
      <main>
        <Home content={data} />
        <Services content={data} />
        <Team content={data} />
        <Units content={data} />
        <Testemonials content={data} />
      </main>
      <Footer content={data} />
    </>
  )
}

export default Page
