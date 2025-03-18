import { useState, useEffect } from "react"
import PoliticianCard from "./components/PoliticianCard.jsx"


function App() {

  const [politicians, setPoliticians] = useState([])
  const [search, setSearch] = useState("")

  async function fetchPoliticians() {
    const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/politicians`)
    const politiciansData = await response.json()
    setPoliticians(politiciansData)
  }

  useEffect(() => {
    fetchPoliticians()
  }, [])

  const filteredPoliticians = politicians.filter(p => p.name.toLowerCase().includes(search.toLocaleLowerCase())
    || p.biography.toLocaleLowerCase().includes(search.toLocaleLowerCase()))


  return (
    <main>
      <section className="search-politicians">
        <h3>Cerca un politico</h3>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      </section>

      <section className="list-politicians">
        <h1>Lista politici</h1>
        <ul>
          {filteredPoliticians.map((p, i) => (
            <li key={i}><PoliticianCard
              name={p.name}
              biography={p.biography}
              position={p.position}
              image={p.image}
            />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App