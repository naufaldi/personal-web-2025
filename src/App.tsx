import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from '@/components/common/Layout'
import Home from '@/pages/Home'
import Experience from '@/pages/Experience'
import Speaker from '@/pages/Speaker'
import Manhwa from '@/pages/Manhwa'

const About = () => <div>About</div>
const Projects = () => <div>Projects</div>
const ProjectDetail = () => <div>Project Detail</div>
const Shorts = () => <div>Shorts</div>
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
          <Route path="/experience" element={<Experience />} />
          <Route path="/speaker" element={<Speaker />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/speaking/:slug" element={<SpeakingDetail />} />
          <Route path="/shorts" element={<Shorts />} />
          <Route path="/book" element={<Book />} />
          <Route path="/manhwa" element={<Manhwa />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
