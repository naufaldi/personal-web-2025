import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from '@/components/common/Layout'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Speaker = lazy(() => import('@/pages/Speaker'))
const Manhwa = lazy(() => import('@/pages/Manhwa'))
const Projects = lazy(() => import('@/pages/Projects'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const Blogs = lazy(() => import('@/pages/Blogs'))
const BlogDetail = lazy(() => import('@/pages/BlogDetail'))
const Books = lazy(() => import('@/pages/Books'))
const Shorts = lazy(() => import('@/pages/Shorts'))
const ShortDetail = lazy(() => import('@/pages/ShortDetail'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const routeFallback = (
  <div className="min-h-screen bg-[var(--paper)]" aria-label="Loading page" />
)

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={routeFallback}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:slug" element={<BlogDetail />} />
            <Route path="speaker" element={<Speaker />} />

            <Route path="shorts" element={<Shorts />} />
            <Route path="shorts/:slug" element={<ShortDetail />} />
            <Route path="book" element={<Books />} />
            <Route path="manhwa" element={<Manhwa />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
