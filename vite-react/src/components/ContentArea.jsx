import { Outlet } from 'react-router-dom'

export default function ContentArea() {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100 p-6 yy3container">
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </main>
  )
}