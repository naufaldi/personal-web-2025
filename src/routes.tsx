import { createRoutesFromElements, Route } from 'react-router'
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

const Speaking = () => <div>Speaking</div>
const SpeakingDetail = () => <div>Speaking Detail</div>
const NotFound = () => <div>404 Not Found</div>

export const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/projects/:slug" element={<ProjectDetail />} />
    <Route path="/blogs" element={<Blogs />} />
    <Route path="/blogs/:slug" element={<BlogDetail />} />
    <Route path="/experience" element={<Experience />} />
    <Route path="/speaker" element={<Speaker />} />
    <Route path="/speaking" element={<Speaking />} />
    <Route path="/speaking/:slug" element={<SpeakingDetail />} />
    <Route path="/shorts" element={<Shorts />} />
    <Route path="/shorts/:slug" element={<ShortDetail />} />
    <Route path="/book" element={<Books />} />
    <Route path="/manhwa" element={<Manhwa />} />
    <Route path="*" element={<NotFound />} />
  </Route>
)

