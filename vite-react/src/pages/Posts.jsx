// src/components/PaginatedPosts.jsx
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const fetchPaginatedPosts = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
  )
  return {
    data: await response.json(),
    nextPage: pageParam < 5 ? pageParam + 1 : undefined // 假设总共有5页
  }
}

function PaginatedPosts() {
  const [page, setPage] = useState(1)
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['paginated-posts', page],
    queryFn: () => fetchPaginatedPosts({ pageParam: page }),
    keepPreviousData: true // 保持上一页数据直到新数据加载完成
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {data.data.map(post => (
          <li key={post.id} className="p-3 border rounded">
            <h3 className="font-medium">{post.id}---{post.title}</h3>
          </li>
        ))}
      </ul>
      
      <div className="flex justify-between">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          上一页
        </button>
        <span className="py-2">当前页: {page}</span>
        <button
          onClick={() => setPage(p => (!data.nextPage ? p : p + 1))}
          disabled={!data.nextPage}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          下一页
        </button>
      </div>
    </div>
  )
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 数据5分钟后过期
      cacheTime: 10 * 60 * 1000, // 缓存10分钟
      retry: 2, // 失败后重试2次
    }
  }
})

export default function PostsList() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 你的应用组件 */}
      <PaginatedPosts />
    </QueryClientProvider>
  )
}