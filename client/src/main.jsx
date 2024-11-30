import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import MainRoute from './router/MainRoute'
import { Toaster } from 'sonner'
import store, { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
// import { SidebarProvider } from './components/ui/sidebar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <SidebarProvider> */}
      <Provider store={store} >
        <PersistGate loading={<div>Loading...</div>} persistor={persistor} >
          <RouterProvider router={MainRoute} />
          <Toaster richColors position="top-center" />
        </PersistGate>
      </Provider>
    {/* </SidebarProvider> */}
  </StrictMode>,
)