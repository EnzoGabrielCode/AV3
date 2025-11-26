# Projeto AeroCode

## 🎯 Sobre o Projeto

O AeroCode é um sistema de gerenciamento projetado para facilitar o controle e a padronização dos processos de criação de aeronaves. A plataforma permite que empresas registrem e acompanhem todo o ciclo de implementação de uma aeronave, desde o cadastro de peças até os testes e a aprovação final .

## 📄 Documentação

Consulte o relatório técnico detalhado do projeto:

- [Relatório AeroCode (PDF)](./relatorio/relatorio_aerocode.pdf)

## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para executar o projeto localmente:

1.  **Clone o repositório**

    ```bash
    git clone https://github.com/EnzoGabrielCode/AV2
    cd AV2
    ```

2.  **Instale as dependências**
    Execute o comando abaixo na raiz do projeto para instalar todos os pacotes necessários:

    ```bash
    npm install
    ```

3.  **Execute a aplicação**
    Para iniciar o servidor de desenvolvimento (usando o Vite, como visto no seu `vite.config.js`), rode:

    ```bash
    npm run dev
    ```

4.  **Acesse no navegador**
    Após o comando anterior, o terminal mostrará o endereço local. Geralmente, é o `http://localhost:5173`. Abra este link no seu navegador.

## 🚀 Como Usar o Sistema

O uso da plataforma é baseado no seu nível de acesso. O fluxo principal é o seguinte:

1.  **Acesso (Login)**: O primeiro passo é acessar a **Tela de Login**.
2.  **Painel Principal**: Após o login, você será redirecionado para o \*_Painel Principal_/. Este painel é personalizado e mostrará os módulos e funcionalidades disponíveis especificamente para o seu tipo de perfil (Operário, Engenheiro ou Administrador).
3.  **Navegação pelos Módulos**: A partir do painel, você pode navegar para as seções específicas para realizar seu trabalho, tais como:
        - Cadastro de Aeronaves
        - Controle de Peças ,
        - Gerenciamento de Testes ,
        - Gerenciamento de Usuários ,
        - Geração de Relatórios ,
4.  **Execução de Tarefas**: Dentro de cada módulo, você utilizará formulários para registrar, editar e atualizar dados, como registrar a execução de uma tarefa ou aprovar uma etapa técnic.

## 👥 Perfis de Usuário e Permissões

O sistema possui três tipos de usuários, cada um com responsabilidades claras :

- ### **Administrador (Admin)**

- **O que faz?** Gerencia todo o sistema, define papéis e monitora as atividade.
    - **Como usar?** O Admin é o único que pode acessar o módulo de **Usuários** para cadastrar, editar ou remover Operários e Engenheiros.

- ### **Engenheiro (Eng)**

- **O que faz?** Supervisiona as etapas técnicas, valida informações e libera processos para a próxima fase.
    - **Como usar?** O Engenheiro deve acessar os módulos de **Etapas** e **Testes** para revisar o trabalho feito pelo Operário, validar os dados e aprovar a conclusão de um processo.

- ### **Operário (Ope)**
  - **O que faz?** É o responsável pela execução. Ele registra as tarefas que realizou e atualiza o status dos processos.
      - **Como usar?** O Operário utiliza o sistema para acessar suas tarefas designadas (ex: "Montagem da Fuselagem", "Instalação de Peça X") e, ao concluí-las, atualiza o **status** do processo (ex: de "Pendente" para "Em Andamento" ou "Concluído").
