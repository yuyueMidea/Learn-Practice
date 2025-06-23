import { Link, useSearchParams } from "react-router-dom";

export default function NotFound() {

    const [searchParams] = useSearchParams();
    const cid = searchParams.get('id');
    console.log('cccid: ', cid )

    return (
      <div >
        <h2>404 - 页面未找到</h2>
        <p>您访问的页面不存在，请检查URL是否正确。
          
          <Link 
            to="/" 
          >
            Go to Home
          </Link>
        </p>
      </div>
    );
  }