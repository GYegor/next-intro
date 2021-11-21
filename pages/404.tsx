import Link from 'next/link'
import { MainLayout } from '../layouts/MainLayout'

export default function ErrorPage() {
  return (
    <MainLayout>
      <h1 className={'error'}>404 - Page Not Found</h1>
      <p>Go <Link href={'/'}><a>Home</a></Link></p>
    </MainLayout>
  )
}
