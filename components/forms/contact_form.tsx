"use client";

import { useEffect, useState } from "react";

interface Adress {logradouro: string, bairro: string, localidade: string, uf: string}

function fetchAdress(cep: string): Promise<Adress> {
  return fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .then((data) => {
      return {
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
      };
    });
}

export default function Form() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [cellPhone, setCellPhone] = useState("");
    const [number, setNumber] = useState("");
    const [cep, setCep] = useState("");
    const [adress, setAdress] = useState({} as Adress);
    const [showData, setShowData] = useState(false);
  
    function validateCep(cep: string) {
        if (cep.length === 8) {
          return true;
        }
    }

    function sendForm(e) {
      e.preventDefault()
      setShowData(true)
    }

    useEffect(() => {
        function handleCep(e: string) {
      
  
            fetchAdress(cep).then((data) => {
              setAdress(data);
            });
          }
        if (validateCep(cep)) {
          handleCep(cep);
        }
      }, [cep]);

    return (
      <form className="flex flex-col gap-3">
        
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="date"
          placeholder="Data de Nascimento"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Nº de Celular"
          value={cellPhone}
          onChange={(e) => setCellPhone(e.target.value)}
        />
        <input
          type="number"
          placeholder="CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        {validateCep(cep) && <><input
          type="string"
          placeholder="Endereço"
          value={adress?.logradouro}
          onChange={(e) => setAdress((prev) => ({ ...prev, logradouro: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Nº"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          type="string"
          placeholder="Bairro"
          value={adress?.bairro}
          onChange={(e) => setAdress((prev) => ({ ...prev, bairro: e.target.value }))}
        />
        <input
          type="string"
          placeholder="UF"
          value={adress?.uf}
          onChange={(e) => setAdress((prev) => ({ ...prev, uf: e.target.value }))}
        /> </>}
        
        <button type="submit" onClick={sendForm}>Cadastrar</button>

        {showData && <div>
          <p>Nome: {name}</p>
          <p>E-mail: {email}</p>
          <p>Data de Nascimento: {birthDate}</p>
          <p>Celular: {cellPhone}</p>
          <p>CEP: {cep}</p>
          <p>Endereço: {adress.logradouro}</p>
          <p>Nº: {number}</p>
          <p>Bairro: {adress.bairro}</p>
          <p>UF: {adress.uf}</p>
          </div>
        }

      </form>

    );
}
