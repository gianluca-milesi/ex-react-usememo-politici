import { useState, useEffect } from "react"
import PoliticianCard from "./components/PoliticianCard.jsx"


function App() {

  const [politicians, setPoliticians] = useState([])

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


  return (
    <main>
      <section>
        <h1>Lista politici</h1>
        <ul>
          {politicians.map((p, i) => (
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