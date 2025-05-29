TanStack Query 原先叫 React Query ，后来对其他UI框架也提供了支持，所以现在叫TanStack Query。总之，如果对于React项目来说，你可以叫他React Query 或者TanStack React Query，或者简称为TanStack Query。

React Query 通常被描述为React的data fetching库，它让React应用程序中的数据获取、缓存、同步和更新服务器状态变得轻而易举。

React 自身并没有开箱即用的获取和更新数据的方法，通常我们使用hook来实现fetching data。

如下代码虽然能用，但是实现缓存、错误后重试、避免重复请求会更加麻烦。
```
import { useEffect, useState } from "react"
const UsingFetchAPI = () => {
  const [user, setUsers] = useState()
  const fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) =>setUsers(json))
  }
  useEffect(() => {
    fetchData()
  }, [])
  return <></>
}
```

而React Query 不仅仅简化了data fetching的代码，而且能够轻松处理复杂的场景。比如：当用户离开网页后，再回到网页，我们可能想要重新发起请求，这时候我们只需要配置refetchOnWindowFoucs: true 即可; 如果想要实现无限滚动，可以使用它的useInfiniteQuery() API；而且我们可以使用它的开发者工具debug data fetching 逻辑。
```
import { QueryClient,QueryClientProvider,useQuery} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsingFetchAPI />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

function UsingFetchAPI() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['getUser'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/users').then(
        (res) => res.json(),
      ),
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return  <></>
}
```
