import { memo } from "react"


function PoliticianCard({ name = "", biography = "", position = "", image = "" }) {

    console.log("Card")

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

export default memo(PoliticianCard)