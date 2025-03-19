import { useState, useEffect, useMemo } from "react"
import PoliticianCard from "./components/PoliticianCard.jsx"


function App() {

  const [politicians, setPoliticians] = useState([])
  const [search, setSearch] = useState("")
  const [selectedPosition, setSelectedPosition] = useState("")

  async function fetchPoliticians() {
    try {
      const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/politicians`)
      if (!response.ok) {
        throw new Error("Errore API")
      }
      const politiciansData = await response.json()
      setPoliticians(politiciansData)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPoliticians()
  }, [])

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(p => (p.name.toLowerCase().includes(search.toLocaleLowerCase())
      || p.biography.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      && (selectedPosition === "" || p.position === selectedPosition))
  }, [politicians, search, selectedPosition])

  const positions = politicians.reduce((acc, p) => {
    if (!acc.includes(p.position)) {
      acc.push(p.position)
    }
    return acc
  }, [])


  return (
    <main>
      <section className="search-politicians">
        <h3>Cerca un politico</h3>
        <input type="text" placeholder="Cerca..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
          <option value="">-</option>
          {positions.map((position, i) => (
            <option key={i} value={position}>{position}</option>
          ))}
        </select>
      </section>

      <section className="list-politicians">
        <h1>Lista politici</h1>
        {politicians.length === 0 ? (
          <p>Caricamento...</p>
        ) : (
          <ul>
            {filteredPoliticians.map((p) => (
              <li key={p.id}>
                <PoliticianCard
                  name={p.name}
                  biography={p.biography}
                  position={p.position}
                  image={p.image}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App