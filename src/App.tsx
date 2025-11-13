import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from '@/components/common/Layout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Experience from '@/pages/Experience'
import Speaker from '@/pages/Speaker'
import Manhwa from '@/pages/Manhwa'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import Blogs from '@/pages/Blogs'
import BlogDetail from '@/pages/BlogDetail'
import Books from '@/pages/Books'
import Shorts from '@/pages/Shorts'
import ShortDetail from '@/pages/ShortDetail'
import NotFound from '@/pages/NotFound'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:slug" element={<BlogDetail />} />
          <Route path="experience" element={<Experience />} />
          <Route path="speaker" element={<Speaker />} />

          <Route path="shorts" element={<Shorts />} />
          <Route path="shorts/:slug" element={<ShortDetail />} />
          <Route path="book" element={<Books />} />
          <Route path="manhwa" element={<Manhwa />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
