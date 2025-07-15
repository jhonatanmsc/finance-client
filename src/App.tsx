import React, { lazy, Suspense, useEffect } from 'react'
import {BrowserRouter, HashRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {Provider, useSelector} from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'
import Page401 from "@/views/pages/page401/Page401";
import store from "@/store";
import {ToastStackMessage} from "@/components/ToastMessage";

// Containers
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = lazy(() => import('./views/pages/login/Login'))
const Register = lazy(() => import('./views/pages/register/Register'))
const Page404 = lazy(() => import('./views/pages/page404/Page404'))
const Page500 = lazy(() => import('./views/pages/page500/Page500'))

const PrivateRoute = () => {
  const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  // @ts-ignore
  const storedTheme = useSelector((state ) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    // @ts-ignore
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Provider store={store}>
      <ToastStackMessage />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/401" element={<Page401 />} />
            <Route path="/404" element={<Page404 />} />
            <Route path="/500" element={<Page500 />} />
            <Route element={<PrivateRoute />}>
              <Route path="*" element={<DefaultLayout />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  )
}

export default App
