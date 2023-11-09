import { useState } from "react";
import {FiSearch} from "react-icons/fi";
import "./estilo.css"
import api from "./services/api";
import { type } from "@testing-library/user-event/dist/type";

function App() {
  const [input, setInput] = useState("")

  const [resultado, setResultado] = useState({})
  

  async function handleSearch(){

    //01001000/json/
    if(input === ""){
      alert("insira um CEP")
      return
    }

    try {
      const response = await api.get(`${input}/json`);
      setResultado(response.data)

      
    } catch {
      alert("Ocorreu algum erro")
      
      
    }setInput("")
    console.log(resultado);

  }


  return (
    <div className="container">

      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">

        <input type="text" placeholder="Digite seu CEP"
        value={input}
        onChange={(evt) => setInput(evt.target.value)}
        />

        <button className="button" onClick={handleSearch}>
          <FiSearch size={25} color="fff"/>
        </button>
      </div>
        {Object.keys(resultado).length > 0 && (

          <main className="main">
        <h2>CEP: {resultado.cep}</h2>
        <span>{resultado.logradouro}</span>
        <span>Complemento: {resultado.complemento}</span>
        <span>Bairro: {resultado.bairro}</span>
        <span> {resultado.localidade} - {resultado.uf}</span>


      </main>
        )}

    </div>
    
  );
}

export default App;
