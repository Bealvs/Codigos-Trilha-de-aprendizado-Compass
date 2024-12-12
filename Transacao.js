import { randomBytes } from 'crypto'
import criptografia from 'crypto-js'

export class Transacao {
    constructor(remetente, valor, moeda, destinatario, taxa){
        this.remetente = remetente
        this.valor = valor
        this.moeda = moeda
        this.destinatario = destinatario
        this.taxa = taxa
        this.id = this.gerarId()
    }

    gerarId() {
        return criptografia.SHA256(this.remetente + this.valor + this.moeda + this.destinatario + randomBytes(256)).toString()
    }
}