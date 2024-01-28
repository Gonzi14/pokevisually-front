import { Link } from 'react-router-dom'

export default function HomePage (): JSX.Element {
  return (
    <>
      <h2>Home</h2>
      <Link to='rate'>Start rating</Link>
    </>
  )
}
