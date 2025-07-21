import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilCart,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink, cilGem,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar, cilTruck,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { Fragment } from 'react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Objetivos',
  },
  {
    component: CNavItem,
    name: 'Contribuições',
    to: '/contribuicoes',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Fornecedores',
    to: '/fornecedores',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Objetivos',
    to: '/objetivos',
    icon: <CIcon icon={cilGem} customClassName="nav-icon" />,
  },
]

export default _nav
