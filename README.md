# Minha API em Node.js

Olá! Bem-vindo à documentação da minha API desenvolvida em Node.js, utilizando TypeScript. Este projeto foi construído seguindo as melhores práticas e padrões, e para garantir a consistência do código, utilizamos o ESLint.

## Configurações do Banco de Dados

1. Utilizando Postgres local.
  Utilizamos o TypeORM para atender às demandas de banco de dados. Atualmente, está configurado para usar o PostgreSQL, mas isso pode ser facilmente alterado se necessário. 

  Para fazer alterações nas configurações do banco de dados (como host, nome do banco ou tipo de banco), você pode ir para o arquivo de configurações de ambiente em: 

  src\main\config\env.ts

  ## Como Começar

  1. Clone o repositório.
  2. Execute `npm install` ou `yarn install` para instalar as dependências.
  3. Configure o banco de dados de acordo com suas necessidades no arquivo `src\main\config\env.ts`.
  4. Execute o servidor usando `npm run start` ou `yarn start`.
  5. Será mostrada no terminal onde esta rodando o projeto a url onde está rodando padrão: `http://localhost:3001`
  6. Abra essa url em seu navegador e acrecente o caminho `/docs` para ir ate o Swagger padrão: `http://localhost:3001/docs`


2. Utilizando Docker
  
  Mantenha no arquivo `src\main\config\env.ts` o export da constante devDocker.

  1. Clone o repositório.
  2. Suba o Container use `docker-compose up`. para derrubar o container use `docker-compose down` 
  3. Será mostrada no terminal onde esta rodando o projeto a url onde está rodando padrão: `http://localhost:3001`
  4. Abra essa url em seu navegador e acrecente o caminho `/docs` para ir ate o Swagger padrão: `http://localhost:3001/docs`


## Autenticação e Segurança

Para a autenticação de usuários externos em nossa API, foi adotado o JWT (JSON Web Token). Além disso, para garantir a segurança das senhas dos usuários, elas foram criptografadas utilizando o bcrypt.

**Nota Importante:** As rotas de tarefas e consulta de usuário estão protegidas, garantindo que somente usuários autenticados possam acessá-las.

## explicações sobre dependencias

Bcrypt
O bcrypt é uma biblioteca utilizada para ajudar os desenvolvedores a criptografar senhas. Ele é especialmente projetado para criar hashes de senhas de uma maneira que torna o processo deliberadamente lento e computacionalmente intenso. Esta característica, chamada de "custo", é ajustável, permitindo que os desenvolvedores determinem quão demorado é o processo de hashing. À medida que os computadores se tornam mais potentes, este custo pode ser aumentado para garantir que o hashing permaneça resistente a ataques ao longo do tempo.

O bcrypt funciona da seguinte forma:

Salting: Ele adiciona um "sal" à senha antes de criptografá-la. Um sal é uma sequência aleatória de caracteres que é combinada com a senha original. Isso garante que duas senhas idênticas não resultem no mesmo hash e protege contra ataques de tabela rainbow (uma técnica utilizada para descobrir senhas a partir de hashes precomputados).

Hashing: Após adicionar o sal, a senha é então passada por uma função de hashing. Esta função transforma a senha em uma string aparentemente aleatória de caracteres, de comprimento fixo.

Comparação: Quando um usuário tenta fazer login, a senha fornecida é novamente saltada e hasheada, e o resultado é comparado ao hash armazenado no banco de dados. Se eles corresponderem, a senha é considerada correta.

Uma das grandes vantagens do bcrypt é que ele é resistente a ataques de força bruta, graças ao seu mecanismo de "custo". Mesmo que um invasor obtenha um hash de senha, será muito difícil (e demorado) tentar adivinhar qual senha original produziu esse hash, graças à forma como o bcrypt funciona.

Em resumo, o bcrypt é uma ferramenta essencial para qualquer desenvolvedor que queira armazenar senhas de forma segura, protegendo as informações do usuário contra possíveis ameaças e ataques.

TypeORM
O TypeORM é um ORM (Object-Relational Mapper) para JavaScript e TypeScript. Ele permite que os desenvolvedores interajam com bancos de dados usando objetos e classes em vez de SQL puro. Ao fazer isso, o TypeORM abstrai muitos dos detalhes específicos do banco de dados e proporciona um modelo de desenvolvimento mais consistente e orientado a objetos. Vamos destacar algumas de suas vantagens para o desenvolvimento de uma API em Node:

Independência de Banco de Dados: Uma das principais vantagens do TypeORM é que ele suporta diversos bancos de dados (como MySQL, MariaDB, PostgreSQL, SQLite, etc.). Isso significa que você pode começar a desenvolver em um banco de dados e mudar para outro com mínimas alterações no código, proporcionando flexibilidade no desenvolvimento.

Desenvolvimento Orientado a Objetos: Com o TypeORM, você pode definir entidades como classes em TypeScript, que serão automaticamente mapeadas para tabelas no banco de dados. Isso torna o código mais legível e fácil de manter.

Migrações: O TypeORM possui um sistema de migrações robusto que permite que os desenvolvedores gerenciem mudanças no esquema do banco de dados de maneira programática e versionada. Isso é crucial para projetos em evolução, garantindo que as alterações no banco de dados sejam aplicadas de forma controlada e consistente.

Relações: Lidar com relações entre tabelas (como OneToMany, ManyToOne, etc.) é simplificado com o TypeORM. Ele oferece uma sintaxe intuitiva para definir e consultar relações entre entidades.

Suporte a TypeScript: Como o TypeORM é construído para TypeScript, ele tira proveito de recursos como tipos estáticos e decoradores para oferecer um ambiente de desenvolvimento robusto e seguro. Isso ajuda a prevenir erros comuns e melhora a eficiência do desenvolvimento.

Em resumo, o TypeORM oferece uma abordagem de alto nível para o gerenciamento de bancos de dados em projetos Node, abstraindo muita complexidade e permitindo que os desenvolvedores se concentrem na lógica de negócios. Ele facilita a criação, manutenção e escalação de APIs, tornando-se uma ferramenta valiosa para muitos desenvolvedores de Node e TypeScript.


Express.js
Express.js, ou simplesmente Express, é um framework minimalista para Node.js que facilita a criação de aplicações web e APIs. Ele oferece uma série de recursos para desenvolver aplicações eficientemente, mantendo uma estrutura simples e flexível. Aqui estão algumas razões pelas quais o Express é útil para o desenvolvimento de uma API em Node:

Simplicidade: Uma das maiores vantagens do Express é sua abordagem minimalista. Com apenas algumas linhas de código, você pode configurar um servidor web funcional. Esta simplicidade torna fácil para os desenvolvedores começarem rapidamente, especialmente aqueles novos em Node.js.

Middleware: O Express utiliza um sistema de middleware, que são funções que têm acesso ao objeto de solicitação (request), ao objeto de resposta (response) e à próxima função middleware no ciclo de solicitação/resposta da aplicação. Isso permite que os desenvolvedores construam aplicações modulares, onde cada middleware executa uma tarefa específica, como logging, autenticação ou parsing de body.

Roteamento: O Express oferece um sistema de roteamento robusto. Os desenvolvedores podem definir endpoints para diferentes métodos HTTP (como GET, POST, PUT) de maneira organizada e intuitiva.

Performance: Sendo construído em cima do Node.js, o Express é non-blocking e orientado a eventos, o que o torna adequado para aplicações que precisam de alto desempenho e podem enfrentar muitas solicitações simultâneas.

Flexibilidade: O Express não é opinativo sobre como você deve estruturar sua aplicação ou quais bibliotecas deve usar. Isso dá aos desenvolvedores a liberdade de escolher as melhores ferramentas para suas necessidades específicas.

Integração: Devido à sua popularidade e ampla adoção, muitas bibliotecas e middlewares foram construídos especificamente para integrar facilmente com o Express, tornando mais simples adicionar funcionalidades como autenticação, segurança, conexão com bancos de dados, entre outros.

Documentação e Comunidade: O Express possui uma documentação extensa e uma grande comunidade de desenvolvedores. Isso facilita encontrar soluções para problemas comuns, tutoriais e melhores práticas para desenvolver aplicações.

Em resumo, o Express.js é uma ferramenta poderosa e flexível para criar aplicações web e APIs em Node.js. Ele combina simplicidade, eficiência e flexibilidade, tornando-se uma das escolhas mais populares entre os desenvolvedores de Node.


Validator
Validator é uma biblioteca popular para validação de strings e saneamento em JavaScript. Ela é muitas vezes usada em conjunção com Node.js e frameworks, como o Express, para validar a entrada do usuário ou dados recebidos via API. Aqui estão algumas das razões pelas quais o Validator é útil e vantajoso:

Ampla Gama de Validações: A biblioteca oferece uma variedade de funções de validação para casos comuns, como verificar se uma string é um email válido, uma data, um número de telefone, um UUID, entre outros.

Saneamento: Além da validação, o Validator também fornece funções para "limpar" ou "sanear" strings, como remover caracteres indesejados ou escapar strings que serão inseridas em HTML.

Simplicidade: Usar o Validator é direto. As funções são intuitivas e geralmente fazem exatamente o que você espera, tornando o código mais legível e fácil de manter.

Independente de Framework: Apesar de muitas vezes ser usado com Express, o Validator é uma biblioteca independente. Isso significa que você pode utilizá-lo em qualquer projeto JavaScript, seja no backend com Node.js ou no frontend.

Segurança: Validar e sanear entradas são etapas cruciais para garantir a segurança de aplicações web. Ataques comuns, como Cross-Site Scripting (XSS) e SQL Injection, muitas vezes se aproveitam de entradas não validadas. Usar uma biblioteca como o Validator ajuda a mitigar tais riscos.

Performance: O Validator é leve e otimizado para desempenho, garantindo que as operações de validação não se tornem um gargalo na sua aplicação.

Comunidade e Suporte: Sendo uma biblioteca popular, o Validator tem uma comunidade ativa. Isso garante que bugs sejam corrigidos, novas funcionalidades sejam adicionadas e que haja uma variedade de recursos online para ajudar os desenvolvedores a utilizá-lo.

Em resumo, o Validator é uma ferramenta essencial para qualquer desenvolvedor que queira garantir que as entradas em sua aplicação ou API sejam válidas e seguras. Ele combina simplicidade com uma ampla gama de funcionalidades, tornando a tarefa de validação mais fácil e robusta.


Espero que esta documentação seja útil e, se tiver alguma dúvida, sinta-se à vontade para abrir uma issue ou entrar em contato.

