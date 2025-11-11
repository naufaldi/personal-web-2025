import { hydrateRoot } from 'react-dom/client'
import { HydratedRouter } from 'react-router/dom'
import './index.css'

hydrateRoot(document.getElementById('root')!, <HydratedRouter />)

