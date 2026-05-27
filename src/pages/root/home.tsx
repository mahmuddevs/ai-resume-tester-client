import { getFetch } from "../../utils/getFetch"
import useAuthStore from "../../store/authStore"
import { Link } from "react-router"

export default function Home() {
  const { isAuthenticated, setUser } = useAuthStore()

  const handleClick = async () => {
    const res = await getFetch('/new', { private: true })
    console.log(res)
  }

  const handleLogout = async () => {
    try {
      await getFetch('/auth/logout', { method: 'POST', private: true })
    } catch (err) {
      console.warn("Logout request failed:", err)
    } finally {
      setUser(null)
    }
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <button onClick={handleClick}>Fetch Private Data</button>
      {
        isAuthenticated && <button onClick={handleLogout}>logout</button>
      }
      <Link to="/auth/login">login</Link>

    </div>
  )
}