import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProjectContextProvider from './contexts/ProjectContext.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.jsx'
import NoProjectSelected from './pages/NoProjectSelected.jsx'
import NewProject from './pages/NewProject.jsx'
import DetailProject from './pages/DetailProfject.jsx'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <NoProjectSelected />
      },
      {
        path: 'createproject',
        element: <NewProject />
      },
      {
        path: '/detailproject/:id',
        element: <DetailProject />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProjectContextProvider>
        <RouterProvider router={router} />
      </ProjectContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
