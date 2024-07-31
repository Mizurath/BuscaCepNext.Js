import Form from "@/components/forms/contact_form";
import Link from "next/link";


export default function Cadastro() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1>Faça seu cadastro</h1>
          <Form/>
        </main>
      );
}