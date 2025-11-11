import { createBrowserRouter, RouterProvider } from 'react-router'
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

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/projects', element: <Projects /> },
      { path: '/projects/:slug', element: <ProjectDetail /> },
      { path: '/blogs', element: <Blogs /> },
      { path: '/blogs/:slug', element: <BlogDetail /> },
      { path: '/experience', element: <Experience /> },
      { path: '/speaker', element: <Speaker /> },
      { path: '/speaking', element: <Speaking /> },
      { path: '/speaking/:slug', element: <SpeakingDetail /> },
      { path: '/shorts', element: <Shorts /> },
      { path: '/shorts/:slug', element: <ShortDetail /> },
      { path: '/book', element: <Books /> },
      { path: '/manhwa', element: <Manhwa /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
