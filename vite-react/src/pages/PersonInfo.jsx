export default function PersonObj({name, age, gender}) {
    function alertAge(cage) {
        console.warn(age)
        // alert(cage)
    }
    return(
        <div className="perWrapper p-2 m-4 border-b-1">
            <span className="name m-4">{name}</span>
            <span className="gender m-4">{gender}</span>
            <span className="age" onClick={alertAge}>{age}</span>
        </div>
    )
}