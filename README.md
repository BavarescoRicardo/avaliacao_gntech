# Avaliação Técnica Gntech - Desenvolvedor de Sistemas

## Apresentação

Olá! Me chamo Ricardo Bavaresco, sou um desenvolvedor FullStack com formação em Engenharia de Computação pela Universidade do Oeste de Santa Catarina e pós-graduação em Desenvolvimento Web e Mobile. Possuo mais de quatro anos de experiência na criação de aplicações robustas e escaláveis. Minha principal expertise reside em linguagens como Java e PL/SQL, e em frameworks poderosos como Spring Boot e JPA para o desenvolvimento backend. Tenho paixão por construir soluções completas e eficientes, desde a concepção até a implantação.

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bavarescoricardo)
[![GitHub Badge](https://img.shields.io/badge/-GitHub-black?style=flat-square&logo=github&logoColor=white)](https://github.com/BavarescoRicardo)
[![Email Badge](https://img.shields.io/badge/-Email-red?style=flat-square&logo=gmail&logoColor=white)](mailto:bavaresco.ricardo@gmail.com)

## Como Rodar o Projeto com Docker

Este projeto pode ser facilmente executado utilizando Docker e Docker Compose. Siga as instruções abaixo:

### Pré-requisitos

* **Docker:** Certifique-se de ter o Docker instalado na sua máquina. Você pode baixá-lo em [https://www.docker.com/get-started](https://www.docker.com/get-started).
* **Docker Compose:** O Docker Compose geralmente é instalado junto com o Docker Desktop. Caso contrário, você pode seguir as instruções de instalação em [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/).

### Configuração do Arquivo `.env`

Antes de iniciar os containers, você precisa criar um arquivo `.env` na raiz do projeto e definir as seguintes variáveis de ambiente para configurar o banco de dados PostgreSQL e outras informações da aplicação:

DB_NAME=nome_do_seu_banco_de_dados
DB_USER=nome_do_usuario_do_banco
DB_PASSWORD=senha_do_banco_de_dados
DB_HOST=db # Este é o nome do serviço do banco de dados no Docker Compose
PORT=3000 # Porta em que a aplicação Node.js será executada (dentro do container)
GITHUB_TOKEN=seu_token_de_acesso_do_github # Opcional, mas recomendado para evitar rate limiting da API do GitHub


**Observações:**

* Substitua os valores de exemplo pelas suas credenciais reais do PostgreSQL.
* O `DB_HOST` deve ser `db` pois esse é o nome do serviço que definimos para o banco de dados no arquivo `docker-compose.yml`. O Docker fará a resolução interna desse nome para o endereço IP do container do banco.
* O `GITHUB_TOKEN` é opcional, mas altamente recomendado para evitar limites de taxa ao interagir com a API do GitHub, especialmente se você for buscar dados com frequência. Você pode gerar um token em [https://github.com/settings/tokens](https://github.com/settings/tokens).

### Iniciando os Containers

1.  Abra o seu terminal ou prompt de comando.
2.  Navegue até o diretório raiz do projeto (`avaliacao_gntech`).
3.  Execute o seguinte comando para construir as imagens Docker (caso ainda não tenham sido construídas) e iniciar os containers definidos no arquivo `docker-compose.yml`:

    ```bash
    docker-compose up -d --build
    ```

    * `-d`: Executa os containers em segundo plano (detached mode).
    * `--build`: Constrói as imagens Docker se houver alguma alteração nos `Dockerfile` ou se as imagens ainda não existirem.

4.  Aguarde alguns instantes para que os containers sejam criados e iniciados. Você pode verificar o status dos containers com o seguinte comando:

    ```bash
    docker-compose ps
    ```

    Você deverá ver pelo menos dois serviços rodando: `db` (o banco de dados PostgreSQL) e `app` (a sua aplicação Node.js).

### Acessando a Aplicação

* A sua aplicação Node.js estará acessível no seu navegador em: [http://localhost:3000](http://localhost:3000)
* A documentação da API (Swagger UI) estará acessível em: [http://localhost:3000/docs](http://localhost:3000/docs)

### Parando os Containers

Para parar os containers quando terminar de usar o projeto, execute o seguinte comando no mesmo diretório:

```bash
docker-compose down

Este comando irá parar e remover os containers criados pelo docker-compose up. Os dados do banco de dados serão preservados no volume nomeado db_data.

É isso! Seguindo estas instruções, você poderá rodar este projeto de forma fácil e consistente utilizando Docker.