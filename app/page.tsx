import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Bem-vindo ao Busca Cep! 31/07/2024</h1>
      <Link href={"/cadastro"}><button>Cadastro de Clientes</button></Link>
    </main>
  );
}
