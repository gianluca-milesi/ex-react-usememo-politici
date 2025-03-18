import { useState, useEffect } from "react"
import PoliticianCard from "./components/PoliticianCard.jsx"


function App() {

  const [politicians, setPoliticians] = useState([])
  const [search, setSearch] = useState("")

  async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
  }

  async function fetchPoliticians() {
    const data = await fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/politicians`)
    setPoliticians(data)
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