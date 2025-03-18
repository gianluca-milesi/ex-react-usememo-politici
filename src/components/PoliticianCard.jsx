function PoliticianCard({ name = "", biography = "", position = "", image = "" }) {

    return (
        <div className="card">
            <figure>
                <img src={image} />
            </figure>
            <div className="card-body">
                <h3>{name}</h3>
                <p>{biography}</p>
                <p>{position}</p>
            </div>
        </div>
    )
}

export default PoliticianCard