const criptografia = require ('crypto-js')
const { format } = require('date-fns')


 
class Bloco {
    constructor (index, nonce, data, hashBlocoAnterior, dados){
    this.index = index
    this.nonce = nonce
    this.data = data
    this.hashBlocoAnterior = hashBlocoAnterior
    this.dados = dados
    this.hash = calcularHash(index,nonce,data,hashBlocoAnterior,dados)
    }
    
}



class Transacao{
    constructor(remetente, valor, moeda, destinatario){
    this.remetente = remetente,
    this.valor = valor,
    this.moeda = moeda,
    this.destinatario = destinatario
        }
    }

    

function calcularHash(index, nonce, data, hashBlocoAnterior, transacao){
    return criptografia.SHA256(index + nonce + data + hashBlocoAnterior + JSON.stringify(transacao)).toString()
}



class Blockchain {
constructor(){
this.cadeia = [this.BlocoGenesis()]
this.dificuldade = 4
}

BlocoGenesis(){
    return new Bloco (
    0,
    0,
    format(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    '0',
    "Primeiro bloco!")
}


UltimoBloco(){

    return this.cadeia[this.cadeia.length - 1]
}


mineracao(transacao) {
    const ultimoBloco = this.UltimoBloco();
    let nonce = 0;
    let hash;

    while (!this.validandoHash(hash, this.dificuldade)) {
        nonce++;
        hash = calcularHash(
            ultimoBloco.index + 1,
            nonce,
            format(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
            ultimoBloco.hash,
            transacao
        );
    }

    const novoBloco = new Bloco(
        ultimoBloco.index + 1,
        nonce,
        format(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
        ultimoBloco.hash,
        transacao
    );

    if (this.validandoBloco()) {
        this.cadeia.push(novoBloco);
        console.log("Novo bloco minerado e adicionado à cadeia:", novoBloco)

    } else {
        console.error("Falha na validação do bloco. O bloco não foi adicionado.");
    }
}

validandoHash(hash, dificuldade) {
    if (!hash) return false; 
    for (let i = 0; i < dificuldade; i++) {
        if (hash[i] !== "0") {
            return false;
        }
    }
    return true;
}

validandoBloco() {
    for (let i = 1; i < this.cadeia.length; i++) {
        let blocoAtual = this.cadeia[i];
        let blocoAnterior = this.cadeia[i - 1];

        if (blocoAnterior.hash !== blocoAtual.hashBlocoAnterior) {
            return false;
        }

        if (blocoAtual.hash !== calcularHash(blocoAtual.index, blocoAtual.nonce, blocoAtual.data, blocoAtual.hashBlocoAnterior, blocoAtual.dados)) {
            return false;
        }
    }
    return true;
}
}


// Chamando
const blockchain = new Blockchain();

console.log(blockchain.cadeia);

blockchain.mineracao(new Transacao("Thuli", 10, "Bitcoins", "Bea"));

blockchain.mineracao([new Transacao("Matheus", 15, "Bitcoins", "Sayke"), new Transacao("Julio Cesar", 20, "Bitcoins", "Gabriel"), new Transacao("Guilherme", 12, "Bitcoins", "Samuel")]);

// Validação
console.log("Blockchain é válida?", blockchain.validandoBloco())