import { Outlet } from 'react-router-dom'

export default function AppLayout (): JSX.Element {
  return (
    <>
      <header>
        <h1>Pokegg Stats</h1>
      </header>
      <Outlet />
    </>
  )
}
