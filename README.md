Este é um projeto Next.Js com a finalidade de retornar dados pelo CEP do usuário com a API ViaCEP, tudo isso é feito num formato de formulário como para realizar o cadastro de um contato.

Para entender as escolhas utilizadas neste projeto leia os tópicos a seguir:

Next.Js - A escolha dessa Framework foi feita pensando no "server-side rendering"(SSR), permitindo que as páginas sejam renderizadas no servidor antes de serem enviadas para o cliente, o que resulta em performance alta e tempo de carregamento menor. Além disso o Next.Js já conta com um Hook de Fetch dispensando biblioteca de terceiros. Ainda assim, como é necessário receber os dados do cliente, o Next permite a escolha dos componentes que vão ser executados do lado do client por meio do "use client".

Switch - A escolha dos switchs foi devido ao uso de muitos statements de if/else que poderiam confundir ou até gerar uma má performance no código, dessa forma também evitamos validações desnecessárias.

Interface - Utilizamos a obtenção dos dados da API por meio delas para evitar erros, o uso de interfaces permite a tipagem dos dados recebidos. Isso garante que eles vão estar no formato esperado, o que facilita o desenvolvimento.

TailWind - Prático e intuitivo.
