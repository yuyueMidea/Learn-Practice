import { useContext, useState } from "react"
import { ImageSizeContext } from "./LevelContext";
export default function ToggleSize() {
    const [isLarge, setisLarge] = useState(false);
    const imgSize = isLarge ? 300: 200;
    return(
        <div className="perWrapper">
            <ImageSizeContext value={imgSize}>
                <p>
                    在 Context.js 中创建并导出 ImageSizeContext。然后用 ImageSizeContext  包裹住整个列表来向下传递值，
                    最后在 PlaceImage 中使用 useContext(ImageSizeContext) 来读取它。
                </p>
                <label htmlFor="chk1">
                    <input type="checkbox" name="n1" id="chk1" checked={isLarge} onChange={e=>setisLarge(e.target.checked)} />setLarge: {isLarge?'T':'F'}
                </label>
                <hr />
                <List/>
            </ImageSizeContext>
        </div>
    )
}
const boxlist = [
    {id:0, name:'box1'},
    {id:1, name:'box2'},
    {id:2, name:'box3'},
]
function List() {
    return(
        <ul className="perWrapper flex-container">
            {boxlist.map(item=>
                <li key={item.id}>
                    <Box content={item.name} />
                </li>
            )}
        </ul>
    )
}
function Box({content}) {
    const boxSize = useContext(ImageSizeContext);
    return(
        <div className="boxContent border p-2 m-4" style={{width: boxSize, height: boxSize}}>{content}</div>
    )
}