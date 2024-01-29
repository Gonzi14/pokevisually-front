import { cn } from '@/shared/utils'
import { NavLink, Link } from 'react-router-dom'

export default function Header (): JSX.Element {
  return (
    <header className='sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full flex justify-between items-center px-4 lg:px-14 py-4'>
      <Link to='/'>
        <h1 className='font-semibold'>PokeVisually</h1>
      </Link>
      <nav className='flex gap-6 text-sm'>
        <NavLink
          to='rate'
          className={({ isActive }) => {
            return cn(
              'transition-colors hover:text-foreground/80',
              isActive ? 'text-foreground' : 'text-foreground/60'
            )
          }}
        >
          <span>Rate</span>
        </NavLink>
        <NavLink
          to='stats'
          className={({ isActive }) => {
            return cn(
              'transition-colors hover:text-foreground/80',
              isActive ? 'text-foreground' : 'text-foreground/60'
            )
          }}
        >
          <span>Statistics</span>
        </NavLink>
      </nav>
    </header>
  )
}
