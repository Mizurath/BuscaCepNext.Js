"use client";

import { useState } from "react";


export default function Form() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [cellPhone, setCellPhone] = useState("");
    const [cep, setCep] = useState("");
  
  
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
        <button type="submit">Cadastrar</button>
      </form>

    );
}
