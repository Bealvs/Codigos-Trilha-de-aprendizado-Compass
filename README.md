# Atividade individual Final - Implementação da Blockchain 
O objetivo da atividade é desenvolver uma "rede blockchain" com funcionalidades básicas. O projeto foi desenvolvido em Javascript e consiste numa blockchain simples que permite a criação de transações, que são colocadas nos blocos e estes são colocados na rede. Trata-se de uma atividade individual proposta durante o programa de bolsas de Blockchain da empresa Compass UOL.

Os arquivos se encontram na branch: Atividade_Final

## É necessário ter: 

:triangular_flag_on_post: [Node.js](https://nodejs.org/en/download/package-manager/current)

## Passo-a-passo:

- Primeiro deve-se clonar o repositório:
```
git clone https://github.com/Bealvs/Codigos-Trilha-de-aprendizado-Compass.git
```
- Após realizar o passo anterior, abra os arquivos clonados no terminal e digite:

```
git checkout Atividade_Final
```

- Depois deve-se digitar no terminal:
```
npm install
```
- Caso apareça um erro, digite:
```
npm install crypto-js date-fns readline elliptic
```
- Existem algumas bibliotecas que serão instaladas:
  - crypto-js
    - Usada para auxiliar nos cálculos do hash.
  - date-fns
    - Usada para deixar as datas personalizadas, ou seja, esteticamente mais bonitas.
  - readline
    - É usada para ler entradas do usuário em uma aplicação de linha de comando.
  - elliptic
    - Gera e valida chaves de curva elíptica. Neste caso, a curva secp256k1 para criar pares de chaves.
  
- Após isso, basta executar o arquivo através do comando:

```
npm run start
```
ou
```
node .\src\Atividade.js
```

---

## Estrutura do código:

Existem as seguintes classes e arquivos:
- :black_square_button: Bloco.js
  - Apresenta a estrutura básica que é composta por: 
    - Índice: Identificação do bloco na cadeia. 
    - Nonce: Número utilizado para realizar a mineração e encontrar um hash válido para que o bloco seja inserido na cadeia.
    - Data de criação: Em que momento o bloco foi criado.
    - Hash do bloco anterior: São informações criptografadas que são baseadas nas demais estruturas mencionadas, mas neste caso, do bloco anterior. 
    - Hash: São informações criptografadas que são baseadas nas demais estruturas mencionadas, mas neste caso, do atual bloco.
    - Dados: Neste caso o foco seriam as transações.
  - Tabém apresenta a função calcularHash que é responsável por gerar o hash do bloco. Ela utiliza o algoritmo SHA-256 da biblioteca crypto-js para criar o hash. 

- :money_with_wings: Transação.js
  - É composta pelo(a):
    - Remetente: A pessoa ou entidade que está enviando a transação.
    - Moeda: O tipo de moeda (por exemplo, Bitcoin, Ether, etc.).
    - Valor (no sentido de quantidade): O valor que está sendo transferido.
    - Destinatário: A pessoa ou entidade que está recebendo a transação.
    - taxa: A taxa associada à transação, neste caso é um valor pago como comissão para mineradores.

    - O método gerarId é responsável por criar um ID único para cada transação. O ID é criado utilizando o algoritmo SHA-256 da biblioteca crypto-js para gerar um hash único através do remetente, valor, moeda, destinatario e com relação ao uso do randomBytes() foi para garantir que ao fazer uma transação com o mesmo valor para o mesmo destinatário, esta não teria o mesmo id que a outra, garantindo que seria colocada no registro e que o saldo seria debitado corretamente. 
  
- :link: Nos.js
  - Seu construtor inicializa a classe com 4 usuários (usuario, usuario1, usuario2, usuario3), são instanciados a partir da classe Usuario. Além disso, apresenta três nós de blockchain, onde cada nó é uma instância da classe Blockchain.
  - Para cada nó, é atribuído um estado de conta para cada um dos quatro usuários, incluindo o minerador. O saldo de cada usuário é armazenado na propriedade estadoConta.
  - A chave enderecoMinerador é usada para armazenar o saldo do minerador no nó.
  - E apresenta um array chamado ConjuntoNos que armazena os três nós (no1, no2, no3). Como se fossem parte de uma rede blockchain.

- :bust_in_silhouette: Usuario.js
  - Cada instância de Usuario começa com um saldo de 50.
  - Com o método gerarChave a chave pública do usuário é gerada automaticamente no momento em que o objeto Usuario é criado.
  - A chave pública gerada é convertida em uma representação hexadecimal e depois é cortada para manter apenas os primeiros 50 caracteres da chave. O prefixo "x" é adicionado ao início da chave.


- :scroll: Menu.js
  - É exibido um menu com as seguintes opções:
    - Consultar saldo: É possível ver o saldo de sua conta, bem como o saldo de outros usuários e do minerador.
    - Fazer uma transação: É possível transferir um valor para outro usuário na rede.
    - Ver as cadeias: É possível visualizar a cadeia de blocos de cada nó.
    - Checar o registro de um usuário: É possível verificar o registro de outros usuários no blockchain.
    - Sair: Encerra o programa.

- :chains: Blockchain.js
  - Composta pelos seguintes métodos:
  
    - BlocoGenesis (): É o primeiro bloco da cadeia e já está com os valores inseridos.
    
    - UltimoBloco (): Retorna o último bloco da cadeia.
    
    - mineracao (transacoes, saldoAtual): Realiza a mineração de um novo bloco. Este método valida as transações, garantindo que o saldo do remetente seja suficiente para cobrir o valor e as taxas da transação. Em seguida, tenta calcular um hash válido para o bloco com base na dificuldade definida. O processo de mineração continua até que o hash satisfaça a dificuldade. Caso a mineração seja bem-sucedida, o novo bloco é adicionado à cadeia e as transações são registradas.

    - validandoEndereco(endereco): Valida se um endereço de carteira segue o formato correto. O endereço deve começar com a letra "x" e ter exatamente 51 caracteres. Este método é utilizado para garantir que as transações envolvam endereços válidos.
    
    - validandoHash (hash, dificuldade): Este método percorre a string do hash com base na dificuldade passada como parâmetro, através de um laço *for*. Mas antes, deve ser feita a verificação se o hash é nulo ou indefinido.
      
    - validandoBloco (): Através de um laço que verifica bloco por bloco, é feita a análise caso o hash do bloco anterior não coincida com o hash do bloco anterior que se encontra no bloco atual ou o hash do bloco atual não coincida com o que foi calculado.
  
    - adicionandoRegistro(transacao): Este método registra as transações realizadas, associando-as aos remetentes e destinatários. Ele também atualiza o estado da conta de cada participante da transação. Se a transação ainda não estiver registrada para um usuário, ela é adicionada ao registro de transações desse usuário.

    - mostraRegistroEndereco(endereco): Retorna o histórico de transações associadas a um endereço específico. Se o endereço não tiver transações, o método retorna uma lista vazia.
  
    - resolucaoConflito(nos): Resolve conflitos entre diferentes nós da rede, escolhendo a cadeia mais longa como a cadeia válida. Este processo é usado para garantir que todos os nós da rede possuam a mesma versão da blockchain.
  
    - saldoEndereco(endereco): Retorna o saldo atual de um endereço. Caso o endereço não tenha saldo registrado, o método retorna 0.
  
    - propagacaoDados(nos, tipo, dados): Este método propaga dados (principalmente transações) entre diferentes nós na rede. Ele garante que as transações sejam adicionadas à lista de transações pendentes de cada nó e propagadas para a rede. As transações são validadas antes de serem propagadas, e os saldos dos endereços envolvidos são atualizados após a propagação.
  
- Em atividade.js haverá a exibição das chaves dos usuários 1, 2 e 3, além da chamada do menu. 

Caso surja alguma dúvida, por favor submeta uma nova *Issue*.
