export default function Card({name, image, types}){
    return <div>
        <h3>{name}</h3>
        <img src={image} alt={name}/>
        <div>
            <h4>Tipos:</h4>
            {
                types.map((types, index) => <h4 key={index}>{types}</h4>)
            }
        </div>
    </div>
}