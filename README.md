# Atividade individual - Implementação da Blockchain 
O objetivo da atividade é desenvolver uma "rede blockchain" com funcionalidades básicas. O projeto foi desenvolvido em Javascript e consiste numa blockchain simples que permite a criação de transações, que são colocadas nos blocos e estes são colocados na rede. Trata-se de uma atividade individual proposta durante o programa de bolsas de Blockchain da empresa Compass UOL.

Os arquivos se encontram na branch: Atividade_01

## É necessário ter: 

:triangular_flag_on_post: [Node.js](https://nodejs.org/en/download/package-manager/current)

## Passo-a-passo:

- Primeiro deve-se clonar o repositório:
```
git clone https://github.com/Bealvs/Codigos-Trilha-de-aprendizado-Compass.git
```
- Após realizar o passo anterior, abra os arquivos clonados no terminal e digite:

```
git checkout Atividade_01
```

- Depois deve-se digitar no terminal:
```
npm install
```
- Caso apareça um erro, digite:
```
npm install crypto-js date-fns
```
- Exitem duas bibliotecas que serão instaladas:
  - crypto-js
    - Usada para auxiliar nos cálculos do hash.
  - date-fns
    - Usada para deixar as datas personalizadas, ou seja, esteticamente mais bonitas.
- Após isso, basta executar o arquivo através do comando:

```
node .\Atividade.js
```
- OBS.: A fim de facilitar, utilize o comando `node` e aperte *TAB*.

---

## Estrutura do código:

Existem as seguintes classes:
- :black_square_button: Bloco
  - Apresenta a estrutura básica que é composta por: 
    - Índice: Identificação do bloco na cadeia. 
    - Nonce: Número utilizado para realizar a mineração e encontrar um hash válido para que o bloco seja inserido na cadeia.
    - Data de criação: Em que momento o bloco foi criado.
    - Hash do bloco anterior: São informações criptografadas que são baseadas nas demais estruturas mencionadas, mas neste caso, do bloco anterior. 
    - Hash: São informações criptografadas que são baseadas nas demais estruturas mencionadas, mas neste caso, do atual bloco.
    - Dados:
      - Neste caso o foco seriam as transações, mas também é possível colocar da seguinte forma:
        
      ```
      blockchain.mineracao("Informações...");
      ```
    
- :money_with_wings: Transação
  - É composta pelo(a):
    - Remetente
      
    - Moeda
      
    - Valor (no sentido de quantidade)
      
    - Destinatário.

  - Essas informações podem ser inseridas da seguinte forma:
  
  ```
  blockchain.mineracao(new Transacao("Geisy", 10, "Bitcoins", "Gabriel"));
  ```
  
  - Também podem ser inseridas mais de uma transação:
  
  ```
  blockchain.mineracao([new Transacao("Gabriel", 9, "Bitcoins", "Geisy"),
  new Transacao("Gabriel", 34, "Bitcoins", "Juliana"),
  new Transacao("Guilherme", 12, "Bitcoins", "Thuli")]);
  ```
    
- :chains: Blockchain 
  - Composta pelos seguintes métodos:
    - BlocoGenesis (): É o primeiro bloco da cadeia e já está com os valores inseridos.
    
    - UltimoBloco (): Retorna o último bloco da cadeia.
    
    - mineracao (transacao): Vai realizar a mineração até encontrar um hash que satisfaça a dificuldade previamente estabelecida. Possui como parâmetro a transação que é necessária para o cáculo da hash.
    
    - validandoHash (hash, dificuldade): Este método percorre a string do hash com base na dificuldade passada como parâmetro, através de um laço *for*. Mas antes, deve ser feita a verificação se o hash é nulo ou indefinido.
      
    - validandoBloco (): Através de um laço que verifica bloco por bloco, é feita a análise caso o hash do bloco anterior não coincida com o hash do bloco anterior que se encontra no bloco atual ou o hash do bloco atual não coincida com o que foi calculado.

- :round_pushpin: Há por fora das classes, a função calcularHash (index, nonce, data, hashBlocoAnterior, transacao): Seu papel é exatamente este, calcular o hash com base nos parâmetros.
  
Caso surja alguma dúvida, por favor submeta uma nova *Issue*.
