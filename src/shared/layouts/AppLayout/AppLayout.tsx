import { Outlet } from 'react-router-dom'

import Header from './components/Header'

export default function AppLayout (): JSX.Element {
  return (
    <div className='h-screen flex flex-col justify-start'>
      <Header />
      <Outlet />
    </div>
  )
}
