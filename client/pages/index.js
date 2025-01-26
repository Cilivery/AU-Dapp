import { useContext } from 'react'
import Feed from '../components/home/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import Image from 'next/image'

const style = {
  wrapper: 'flex justify-center h-screen w-screen select-none bg-white text-black relative', // Changed to relative for positioning children
  content: 'max-w-[1400px] w-full flex justify-center',
  loginContainer: 'w-full h-full flex flex-col justify-center items-center pb-48',
}

export default function Home() {
  const app = () => {
    return userLoggedIn // Always show the logged-in UI
  }

  const userLoggedIn = (
    <div className={style.content}>
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  )

  return <div className={style.wrapper}>{app()}</div>
}
