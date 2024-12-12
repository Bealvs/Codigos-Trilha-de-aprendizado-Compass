import criptografia from 'crypto-js'

export class Bloco {
    constructor (index, nonce, data, hashBlocoAnterior, dados){
        this.index = index
        this.nonce = nonce
        this.data = data
        this.hashBlocoAnterior = hashBlocoAnterior
        this.dados = dados 
        this.hash = calcularHash(index, nonce, data, hashBlocoAnterior, dados)
    }
}

export function calcularHash(index, nonce, data, hashBlocoAnterior, transacao){
    return criptografia.SHA256(index + nonce + data + hashBlocoAnterior + JSON.stringify(transacao)).toString()
}
