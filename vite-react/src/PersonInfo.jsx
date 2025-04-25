export default function PersonObj({name, age, gender}) {
    function alertAge(cage) {
        console.warn(age)
        // alert(cage)
    }
    return(
        <div className="perWrapper">
            <span className="name">{name}</span>
            <span className="gender">{gender}</span>
            <span className="age" onClick={alertAge}>{age}</span>
        </div>
    )
}