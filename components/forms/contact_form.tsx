"use client";

import { useEffect, useState } from "react";
import { SlActionUndo, SlActionRedo, SlUserFollowing, SlControlForward} from "react-icons/sl";

interface Adress {logradouro: string, bairro: string, localidade: string, uf: string, erro:boolean}

function fetchAdress(cep: string): Promise<Adress> {
  return fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .then((data) => {
      return {
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        erro: data.erro,
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
    const [screen, setScreen] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [cepError, setCepError] = useState(false);
  
    function validateCep(cep: string) {
        if (cep.length === 8) {
          return true;
        }
    }

    useEffect(() => {
        function handleCep(e: string) {
      
  
            fetchAdress(cep).then((data) => {
           
              setAdress(data);
            }).catch((error) => {
              setCepError(true);
            });}
        if (validateCep(cep)) {
          handleCep(cep);
        }
      }, [cep]);

      useEffect(() => {
        if (adress.erro) {
          setCepError(true);}
        else if (adress.erro === undefined && adress.localidade !== undefined) {
          setCepError(false);
        }
        }, [adress]);

      useEffect(() => {
        if (name && email && birthDate && cellPhone && number && adress.localidade) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }
      }  
      , [name, email, birthDate, cellPhone, number,  adress.localidade, setButtonDisabled]);

    

    function clientData() {
      return (<div className="boxshowdata"><p>Nome: {name}</p>
          <p>E-mail: {email}</p>
          <p>Data de Nascimento: {birthDate}</p>
          <p>Celular: {cellPhone}</p>
          <p>CEP: {cep}</p>
          <p>Endereço: {adress.logradouro}</p>
          <p>Nº: {number}</p>
          <p>Bairro: {adress.bairro}</p>
          <p>UF: {adress.uf}</p> </div>)
    }

    function fillForm() {
      return (
        <>
        <div className="flex flex-col gap-3 w-full border-black">
        <input className="inputform"
          required
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input className="inputform"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="inputform"
          type="date"
          placeholder="Data de Nascimento"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <input className="inputform"
          type="tel"
          placeholder="Nº de Celular"
          value={cellPhone}
          onChange={(e) => setCellPhone(e.target.value)}
        /><div className="relative flex min-h-6"><input className="inputform w-full absolute left-0"
        type="number"
        placeholder="CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />
      {cepError && <p className="text-red-500 absolute right-2">CEP inválido.</p>}
      </div >
        
        {adress.localidade !== undefined && !cepError && <><input className="inputform"
          type="string"
          placeholder="Endereço"
          value={adress?.logradouro}
          onChange={(e) => setAdress((prev) => ({ ...prev, logradouro: e.target.value }))}
        />
        <input className="inputform"
          type="number"
          placeholder="Nº"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input className="inputform"
          type="string"
          placeholder="Bairro"
          value={adress?.bairro}
          onChange={(e) => setAdress((prev) => ({ ...prev, bairro: e.target.value }))}
        />
        <input className="inputform"
          type="string"
          placeholder="UF"
          value={adress?.uf}
          onChange={(e) => setAdress((prev) => ({ ...prev, uf: e.target.value }))}
        /> </>}
        </div>
        <button className={`${buttonDisabled ? "mainbuttondisabled" : "mainbutton"}`} disabled={buttonDisabled} type="submit" onClick={
          (e) => {
            e.preventDefault();
            setScreen(1);}
        }>Avançar<SlActionRedo/></button> 
        </>
      )
    }

    function checkForm(){
      return (
        <div className="w-full flex flex-col gap-4">
          {clientData()}
          <div className="flex justify-between">
          <button className="mainbutton" type="submit" onClick={
          (e) => {
            e.preventDefault();
            setScreen(0);}}
          ><SlActionUndo/>Voltar</button>
          <button className="mainbutton" type="submit" onClick={
          (e) => {
            e.preventDefault();
            setScreen(2);}} 
          >Enviar<SlControlForward/></button>
          </div>
          
          </div>
      )
    }

    function sentForm() {
      return(
       <div className="flex justify-center gap-2 items-center font-semibold">
        <SlUserFollowing/> Contato enviado!
       </div>
      )
    }

    let content;
  switch (screen) {
    case 0:
      content = fillForm();
      break;
    case 1:
      content = checkForm();
      break;
      case 2:
      content = sentForm();
      break;
    default:
      content = fillForm();
  }
  
  return (
    <form className="flex flex-col gap-3 min-h-[87vh] justify-between py-32">
      <div className="boxform">{content}</div>
      {screen === 2 && <div>{clientData()}</div>}
    </form>
  );
}
