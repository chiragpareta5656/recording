import Image from 'next/image'
import { Inter } from 'next/font/google'
import Recording from './component/Recording'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Recording/>
    </>
  )
}


