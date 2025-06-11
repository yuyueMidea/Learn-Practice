import { useContext, useState } from "react";
import { LevelContext } from "./LevelContext";
function Heading({ ctitle}) {
  const level = useContext(LevelContext)
  switch(level) {
    case 1:
      return <h1>{ctitle}</h1>;
    case 2:
      return <h2>{ctitle}</h2>;
    case 3:
      return <h3>{ctitle}</h3>;
    case 4:
      return <h4>{ctitle}</h4>;
    case 5:
      return <h5>{ctitle}</h5>;
    case 6:
      return <h6>{ctitle}</h6>;
    default:
        throw Error('unknow level: ', level)
  }
}
function Section({level, children}) {
  return(
    <div className="perWrapper">
      <LevelContext value={level}>
        {children}
      </LevelContext>
    </div>
  )
}
export default function GrandSon() {
  const [count, setcount]=useState(1);
  return(
    <div className="perWrapper">
      <p>使用组件渲染多层级标题行
        <button onClick={()=>setcount(c=>c+1)}>加一({count})</button>
      </p>
      <Heading ctitle={'主标题h1'}></Heading>
      <Section level={2}>
        <Heading ctitle={'子标题h2'}></Heading>
        <Section level={3}>
          <Heading ctitle={count}></Heading>
          <Heading ctitle={'子子标题h3'}></Heading>
          <Section level={4}>
            <Heading ctitle={'子子子标题h4'}></Heading>
          </Section>
        </Section>
      </Section>
    </div>
  )
}