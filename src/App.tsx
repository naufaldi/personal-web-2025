import { BrowserRouter, Routes, Route } from 'react-router'

const Layout = () => <div>Layout</div>
const Home = () => <div>Home</div>
const About = () => <div>About</div>
const Projects = () => <div>Projects</div>
const ProjectDetail = () => <div>Project Detail</div>
const Speaking = () => <div>Speaking</div>
const SpeakingDetail = () => <div>Speaking Detail</div>
const Book = () => <div>Book</div>
const NotFound = () => <div>404 Not Found</div>

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/speaking/:slug" element={<SpeakingDetail />} />
          <Route path="/book" element={<Book />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
