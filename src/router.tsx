import { createBrowserRouter } from 'react-router-dom'

import { HomePage } from '@modules/Home'
import { RatePage } from '@modules/Rate'
import { AppLayout } from '@shared/layouts/AppLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'rate',
        element: <RatePage />
      }
    ]
  }
])
