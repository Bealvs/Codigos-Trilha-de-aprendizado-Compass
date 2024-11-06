const criptografia = require ('crypto-js')
const { format } = require('date-fns')
const EC = require ('elliptic').ec
const ec = new EC('secp256k1')

 
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
this.registroTransacoes = {}
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


mineracao(transacoes) {
    for (const transacao of transacoes) {
        if (!this.validandoEndereco(transacao.remetente) || !this.validandoEndereco(transacao.destinatario)) {
            console.log('Transação inválida! Endereços inválidos. Aqui está ela: ', transacao)
            return 
        }
    }

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
            transacoes
        );
    }

    const novoBloco = new Bloco(
        ultimoBloco.index + 1,
        nonce,
        format(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
        ultimoBloco.hash,
        transacoes
    );

    if (this.validandoBloco()) {
        this.cadeia.push(novoBloco);
        transacoes.forEach(transacao => this.adicionandoRegistro(transacao));
        console.log("Novo bloco minerado e adicionado à cadeia:", novoBloco)

    } else {
        console.error("Falha na validação do bloco. O bloco não foi adicionado.");
    }
}

validandoEndereco(endereco){
    return endereco && endereco[0]==='x' && endereco.length===51
   
}

validandoHash(hash, dificuldade) {
    if (!hash) return false; 
    for (let i = 0; i < dificuldade; i++) {
        if (hash[i] !== "0") {
            return false
        }
    }
    return true
}

validandoBloco() {
    for (let i = 1; i < this.cadeia.length; i++) {
        let blocoAtual = this.cadeia[i];
        let blocoAnterior = this.cadeia[i - 1]

        if (blocoAnterior.hash !== blocoAtual.hashBlocoAnterior) {
            return false
        }

        if (blocoAtual.hash !== calcularHash(blocoAtual.index, blocoAtual.nonce, blocoAtual.data, blocoAtual.hashBlocoAnterior, blocoAtual.dados)) {
            return false
        }
    }
    return true
}

adicionandoRegistro(transacao){

    if (!this.registroTransacoes[transacao.remetente]){this.registroTransacoes[transacao.remetente] = []}
    if (!this.registroTransacoes[transacao.destinatario]){this.registroTransacoes[transacao.destinatario] = []}
    this.registroTransacoes[transacao.remetente].push(transacao)
    this.registroTransacoes[transacao.destinatario].push(transacao)
}
mostraRegistroEndereco(endereco){
    return this.registroTransacoes[endereco] || []

}
}

function gerarChave (){
    const chave = ec.genKeyPair()
    return "x" + chave.getPublic('hex').slice(0,50)
}


// Chamando
const blockchain = new Blockchain()

const usuario1 = gerarChave()
const usuario2 = gerarChave()
const usuario3 = gerarChave()

console.log("Usuário 1 é: ", usuario1)
console.log("Usuário 2 é: ", usuario2)
console.log("Usuário 3 é: ", usuario3)

console.log(blockchain.cadeia)

blockchain.mineracao([new Transacao(usuario1, 10, "Bitcoins", usuario2)])
blockchain.mineracao([new Transacao("Usuário-Inválido", 10, "Bitcoins", usuario2)])
blockchain.mineracao([new Transacao(usuario2, 15, "Bitcoins", usuario3), new Transacao(usuario2, 12, "Bitcoins", usuario1)])

console.log("Registro do usuário 1: ", blockchain.mostraRegistroEndereco(usuario1))
console.log("Registro do usuário 2: ", blockchain.mostraRegistroEndereco(usuario2))
console.log("Registro do usuário 3: ", blockchain.mostraRegistroEndereco(usuario3))

// Validação
console.log("Blockchain é válida?", blockchain.validandoBloco())