import Nav from './components/Nav'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Work from './components/sections/Work'
import Process from './components/sections/Process'
import Stats from './components/sections/Stats'

export default function App() {
  return (
    <>
      <div className="scroll-progress" />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Work />
      <Process />
      <Stats />
    </>
  )
}
