import Slider from "./Slider"
import Stats from "./Stats"
import Story from "./Story"
import StoryMedia from "./StoryMedia"

const Home = ({ content }) => {
  return (
    <section
      id={content?.navlinks[0]}
      className="min-h-svh pt-[65px] sm:pt-[110px]">
      <Slider content={content} />
      <Stats content={content} />
      <Story content={content} />
      <StoryMedia content={content} />
    </section>
  )
}

export default Home
