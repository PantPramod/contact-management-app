// import { Counter } from "./features/counter/count"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import CreateContact from "./pages/CreateContact"
import EditContact from "./pages/EditContact"
import ChartsAndMaps from "./pages/ChartsAndMaps"
import DetailedContact from "./pages/DetailedContact"



const App = () => {
 
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create-contact" element={<CreateContact />} />
      <Route path="/edit-contact/:id" element={<EditContact />} />
      <Route path="/detailed-contact/:id" element={<DetailedContact />} />
      <Route path="/charts-and-maps" element={<ChartsAndMaps />} />


    </Routes>
  )
}

export default App
