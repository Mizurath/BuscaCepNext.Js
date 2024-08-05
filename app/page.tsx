import Image from "next/image";
import Link from "next/link";
import { SlPeople } from "react-icons/sl";

export default function Home() {

const date = new Date();

  return (
    <main className="mainpage">
      <div className="mainheader"> <h1>Bem-vindo ao Busca Cep!</h1>
      <h2>{date.toLocaleDateString("pt-BR")}</h2>
      </div>
      <div className="flex flex-col min-h-[88vh] justify-center items-center"><Link href={"/cadastro"}><button className="mainbutton"><SlPeople/> Cadastro de Clientes</button></Link></div>
    </main>
  );
}
