import { Blockchain } from "./Blockchain.js"
import { Usuario } from "./Usuario.js"


export class Nos{

constructor(){

    this.usuario = new Usuario()
    this.usuario1 = new Usuario()
    this.usuario2 = new Usuario()
    this.usuario3 = new Usuario()
    

    this.no1 = new Blockchain()
    this.no1.estadoConta[this.usuario.chave] = this.usuario.saldo
    this.no1.estadoConta[this.usuario1.chave] = this.usuario1.saldo
    this.no1.estadoConta[this.usuario2.chave] = this.usuario2.saldo
    this.no1.estadoConta[this.usuario3.chave] = this.usuario3.saldo
    this.no1.estadoConta[this.no1.enderecoMinerador] = this.no1.minerador.saldo

    this.no2 = new Blockchain()
    this.no2.estadoConta[this.usuario.chave] = this.usuario.saldo
    this.no2.estadoConta[this.usuario1.chave] = this.usuario1.saldo
    this.no2.estadoConta[this.usuario2.chave] = this.usuario2.saldo
    this.no2.estadoConta[this.usuario3.chave] = this.usuario3.saldo
    this.no2.estadoConta[this.no2.enderecoMinerador] = this.no2.minerador.saldo

    this.no3 = new Blockchain()
    this.no3.estadoConta[this.usuario.chave] = this.usuario.saldo
    this.no3.estadoConta[this.usuario1.chave] = this.usuario1.saldo
    this.no3.estadoConta[this.usuario2.chave] = this.usuario2.saldo
    this.no3.estadoConta[this.usuario3.chave] = this.usuario3.saldo
    this.no3.estadoConta[this.no3.enderecoMinerador] = this.no3.minerador.saldo

    this.ConjuntoNos = [this.no1, this.no2, this.no3]
    }
}