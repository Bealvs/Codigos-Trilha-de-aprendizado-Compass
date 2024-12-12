import { Usuario } from './Usuario.js'
import { Bloco } from './Bloco.js'
import { format } from 'date-fns'
import { calcularHash } from './Bloco.js'


export class Blockchain {
    constructor(){
        this.cadeia = [this.BlocoGenesis()]
        this.dificuldade = 4
        this.registroTransacoes = {}
        this.estadoConta = {}
        this.minerador = new Usuario()
        this.enderecoMinerador = this.minerador.chave
        this.recompensaMinerador = 20
    }

    BlocoGenesis(){
        return new Bloco (
            0,
            0,
            format(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
            '0',
            [] 
        )
    }

    UltimoBloco(){
        return this.cadeia[this.cadeia.length - 1]
    }

    mineracao(transacoes, saldoAtual) {
  
        for (const transacao of transacoes) {
            const { remetente, valor, taxa } = transacao
            
            if((saldoAtual) < (valor + taxa)) {
                console.log(`${remetente} possui saldo insuficiente!`)
                return false
            }
             if(saldoAtual < 0){
                console.log(`${remetente} possui saldo insuficiente!`)
                return false
             }
            
            if (!this.validandoEndereco(transacao.remetente) || !this.validandoEndereco(transacao.destinatario)) {
                    console.log('Transação inválida! Endereços inválidos. Aqui está ela: ', transacao)
                return false
                }
        }

        const ultimoBloco = this.UltimoBloco()
        let nonce = 0
        let hash

        while (!this.validandoHash(hash, this.dificuldade)) {
            nonce++
            hash = calcularHash(
                ultimoBloco.index + 1,
                nonce,
                format(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
                ultimoBloco.hash,
                transacoes
            )
        }

        const novoBloco = new Bloco(
            ultimoBloco.index + 1,
            nonce,
            format(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
            ultimoBloco.hash,
            transacoes 
        )

        if (this.validandoBloco()) {
            this.cadeia.push(novoBloco)
            transacoes.forEach(transacao => this.adicionandoRegistro(transacao))
            console.log("\nNovo bloco minerado e adicionado à cadeia:", novoBloco)

            console.log("\n\nTransações no novo bloco:")
            novoBloco.dados.forEach((transacao, index) => {
                console.log(`Transação ${index + 1}:`)
                console.log(`    * Remetente: ${transacao.remetente}`)
                console.log(`    * Valor: ${transacao.valor} ${transacao.moeda}`)
                console.log(`    * Destinatário: ${transacao.destinatario}`)
            
            })
        } else {
            console.error("Falha na validação do bloco. O bloco não foi adicionado.")
        }
        return true
    }

    validandoEndereco(endereco){
        return endereco && endereco[0]==='x' && endereco.length===51
    }

    validandoHash(hash, dificuldade) {
        if (!hash) return false
        for (let i = 0; i < dificuldade; i++) {
            if (hash[i] !== "0") {
                return false
            }
        }
        return true
    }

    validandoBloco() {
        for (let i = 1; i < this.cadeia.length; i++) {
            let blocoAtual = this.cadeia[i]
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
        
        if (!this.registroTransacoes[transacao.remetente]) {
            this.registroTransacoes[transacao.remetente] = []
        }
        if (!this.registroTransacoes[transacao.destinatario]) {
            this.registroTransacoes[transacao.destinatario] = []
        }
        if (!this.estadoConta[transacao.remetente]) {
            this.estadoConta[transacao.remetente] = 0
        }
        if (!this.estadoConta[transacao.destinatario]) {
            this.estadoConta[transacao.destinatario] = 0
        }
        if (!this.registroTransacoes[transacao.remetente].some(t => t.id === transacao.id)) {
            this.registroTransacoes[transacao.remetente].push(transacao)
        }
        if (!this.registroTransacoes[transacao.destinatario].some(t => t.id === transacao.id)) {
            this.registroTransacoes[transacao.destinatario].push(transacao)
            }
    }
    

    mostraRegistroEndereco(endereco){
        return this.registroTransacoes[endereco] || []
    }

    resolucaoConflito(nos){

        let maiorCadeia = this.cadeia

        for(const no of nos){
            
            if (no.cadeia.length>maiorCadeia.length){
               maiorCadeia = no.cadeia
            }
        }

        if (maiorCadeia !== this.cadeia){
            this.cadeia = maiorCadeia
        }
    }

    saldoEndereco (endereco){

        return this.estadoConta [endereco] || 0
    }


propagacaoDados(nos, tipo, dados) {
    for (const no of nos) {
        if (!no.transacoesPropagadas) {
            no.transacoesPropagadas = []
        }

        if (tipo === "transacao") {
            const transacao = dados
          
            if (no.validandoEndereco(transacao.remetente) && no.validandoEndereco(transacao.destinatario)) {
                if (!no.transacoesPendentes) {
                    no.transacoesPendentes = []
                }
                
                if (!no.transacoesPendentes.some(t => t.id === transacao.id)) {
                    no.transacoesPendentes.push(transacao)
                    console.log("Transação adicionada às transações pendentes.")
                }

                no.adicionandoRegistro(transacao)
                no.transacoesPropagadas.push(transacao.id)
                console.log("Transação propagada com sucesso!")
               
                no.estadoConta[transacao.remetente] = no.estadoConta[transacao.remetente] - (transacao.valor + transacao.taxa)
                no.estadoConta[transacao.destinatario] = (no.estadoConta[transacao.destinatario] || 0) + transacao.valor
                no.estadoConta[no.enderecoMinerador] = (no.estadoConta[no.enderecoMinerador] || 0) + no.recompensaMinerador + transacao.taxa
                
            } else {
                return console.error("A transação não foi propagada (endereços inválidos):", transacao)
                
                }
            } 
        }
    }
}

