import pkg from 'elliptic'
const { ec: EC } = pkg
const ec = new EC('secp256k1')

export class Usuario {

    constructor(){
        this.saldo = 50
        this.chave = this.gerarChave()
    }
    
    gerarChave (){
        const chave = ec.genKeyPair()
        return "x" + chave.getPublic('hex').slice(0,50)
    }
}