import { Link } from "react-router"
import { getFetch } from "../../utils/getFetch"

export default function Analyze() {
  const handleClick = async () => {
    const res = await getFetch('/new', { private: true })
    console.log(res)
  }

  return (
    <div>
      <button onClick={handleClick}>Fetch Private Data</button>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  )
}