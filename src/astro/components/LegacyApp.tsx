import App from '@/App'
import { ThemeProvider } from '@/components/common/ThemeProvider'

export default function LegacyApp() {
  return <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"><App /></ThemeProvider>
}
