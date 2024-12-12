import readline from 'readline' 
import { Transacao } from './Transacao.js'
import { Nos } from './Nos.js'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export async function menu (){
    const cadeiaNos = new Nos ()
    function perguntar(pergunta) {
        return new Promise(resolve => rl.question(pergunta, resposta => resolve(resposta)))
    }
    let continuar = true

    console.log("Em qual nó da rede você quer ser inserido(a)? ")
    const escolhaNo = await perguntar("Digite um nó [1, 2 ou 3]: ")

    if (parseInt(escolhaNo) === 1|| parseInt(escolhaNo) === 2|| parseInt(escolhaNo) === 3){
        switch (escolhaNo){
            case '1': cadeiaNos.no1.estadoConta[cadeiaNos.usuario.chave] = cadeiaNos.usuario.saldo
            console.log("Sua chave é: ", cadeiaNos.usuario.chave)
            break
            case '2': cadeiaNos.no2.estadoConta[cadeiaNos.usuario.chave] = cadeiaNos.usuario.saldo
            console.log("Sua chave é: ", cadeiaNos.usuario.chave)
            break
            case '3': cadeiaNos.no3.estadoConta[cadeiaNos.usuario.chave] = cadeiaNos.usuario.saldo
            console.log("Sua chave é: ", cadeiaNos.usuario.chave)
            break
            default:
            console.log("Opção inválida.")
        }
    while (continuar) {
    console.log("\nMenu\n\nDigite algum número que representa as opções abaixo:\n\n1 - Consultar seu saldo (OBS.: Ao criar uma conta ganhas R$ 50,00)\n2 - Fazer uma transação\n3 - Ver as cadeias\n4 - Checar o registro de um usuário\n5 - Sair")
    let escolha = await perguntar("Digite: ")
    
    
    
 
    
        if (escolha === '1') {
            switch (escolhaNo) {
                case '1': 
                    console.log("\n************************** Saldos **************************\n")
                    console.log("Seu saldo:", cadeiaNos.no1.saldoEndereco(cadeiaNos.usuario.chave))
                    console.log("Usuário 1:", cadeiaNos.no1.saldoEndereco(cadeiaNos.usuario1.chave))
                    console.log("Usuário 2:", cadeiaNos.no1.saldoEndereco(cadeiaNos.usuario2.chave))
                    console.log("Usuário 3:", cadeiaNos.no1.saldoEndereco(cadeiaNos.usuario3.chave))
                    console.log("Saldo do minerador:", cadeiaNos.no1.saldoEndereco(cadeiaNos.no1.enderecoMinerador))
                    break
                case '2': 
                    console.log("\n************************** Saldos **************************\n")
                    console.log("Seu saldo:", cadeiaNos.no2.saldoEndereco(cadeiaNos.usuario.chave))
                    console.log("Usuário 1:", cadeiaNos.no2.saldoEndereco(cadeiaNos.usuario1.chave))
                    console.log("Usuário 2:", cadeiaNos.no2.saldoEndereco(cadeiaNos.usuario2.chave))
                    console.log("Usuário 3:", cadeiaNos.no2.saldoEndereco(cadeiaNos.usuario3.chave))
                    console.log("Saldo do minerador:", cadeiaNos.no2.saldoEndereco(cadeiaNos.no2.enderecoMinerador))
                    break
                case '3':
                    console.log("\n************************** Saldos **************************\n")
                    console.log("Seu saldo:", cadeiaNos.no3.saldoEndereco(cadeiaNos.usuario.chave))
                    console.log("Usuário 1:", cadeiaNos.no3.saldoEndereco(cadeiaNos.usuario1.chave))
                    console.log("Usuário 2:", cadeiaNos.no3.saldoEndereco(cadeiaNos.usuario2.chave))
                    console.log("Usuário 3:", cadeiaNos.no3.saldoEndereco(cadeiaNos.usuario3.chave))
                    console.log("Saldo do minerador:", cadeiaNos.no3.saldoEndereco(cadeiaNos.no3.enderecoMinerador))
                    break
                default:
                    console.log("Opção inválida.")
            }
        }
        
    
    else if (escolha === '2'){
        let valor = await perguntar("Digite o valor da transação: ")
        let destino = await perguntar(" O destinatário é o usuário 1, 2 ou 3: ")
        switch (destino){
            case '1': 
                const transacao1 = new Transacao(cadeiaNos.usuario.chave, parseInt(valor), "Bitcoins", cadeiaNos.usuario1.chave, 3)
                    switch(parseInt(escolhaNo)){
                        case 1:
                            if(cadeiaNos.no1.mineracao([transacao1], cadeiaNos.no1.estadoConta[cadeiaNos.usuario.chave])===true){
                                cadeiaNos.no1.propagacaoDados(cadeiaNos.ConjuntoNos, 'transacao', transacao1)}
                            else{
                                console.log("Não foi possível!")
                            }
                            break
                        case 2:
                            if(cadeiaNos.no2.mineracao([transacao1], cadeiaNos.no2.estadoConta[cadeiaNos.usuario.chave])===true){
                                cadeiaNos.no2.propagacaoDados(cadeiaNos.ConjuntoNos, 'transacao', transacao1)}
                            else{
                                console.log("Não foi possível!")
                            }
                            break
                        case 3:
                            if(cadeiaNos.no3.mineracao([transacao1], cadeiaNos.no3.estadoConta[cadeiaNos.usuario.chave])===true){
                                cadeiaNos.no3.propagacaoDados(cadeiaNos.ConjuntoNos, 'transacao', transacao1)}
                            else{
                                console.log("Não foi possível!")
                            }
                            break
                    }
            break
            case '2': 
                const transacao2 = new Transacao(cadeiaNos.usuario.chave, parseInt(valor), "Bitcoins", cadeiaNos.usuario2.chave, 3)
            switch(parseInt(escolhaNo)){
                case 1:
                    if(cadeiaNos.no1.mineracao([transacao2], cadeiaNos.no1.estadoConta[cadeiaNos.usuario.chave])===true)
                        cadeiaNos.no1.propagacaoDados(cadeiaNos.ConjuntoNos, 'transacao', transacao2)
                    else{
                        console.log("Não foi possível!")
                    }
                    break
                case 2:
                    if(cadeiaNos.no2.mineracao([transacao2], cadeiaNos.no2.estadoConta[cadeiaNos.usuario.chave])===true)
                        cadeiaNos.no2.propagacaoDados(cadeiaNos.ConjuntoNos, 'transacao', transacao2)
                    else{
                        console.log("Não foi possível!")
                    }
                    break
                case 3:
                    if(cadeiaNos.no3.mineracao([transacao2], cadeiaNos.no3.estadoConta[cadeiaNos.usuario.chave])===true)
                        cadeiaNos.no3.propagacaoDados(cadeiaNos.ConjuntoNos, 'transacao', transacao2)
                    else{
                        console.log("Não foi possível!")
                    }
                    break
            }
            break
            case '3':
                const transacao3 = new Transacao(cadeiaNos.usuario.chave, parseInt(valor), "Bitcoins", cadeiaNos.usuario3.chave, 3)
                switch(parseInt(escolhaNo)){
                    case 1:
                        if(cadeiaNos.no1.mineracao([transacao3], cadeiaNos.no1.estadoConta[cadeiaNos.usuario.chave])===true)
                            cadeiaNos.no1.propagacaoDados(cadeiaNos.ConjuntoNos, 'transacao', transacao3)
                        else{
                            console.log("Não foi possível!")
                        }
                        break
                    case 2:
                        if(cadeiaNos.no2.mineracao([transacao3], cadeiaNos.no2.estadoConta[cadeiaNos.usuario.chave])===true)
                            cadeiaNos.no2.propagacaoDados(cadeiaNos.ConjuntoNos, 'transacao', transacao3)
                        else{
                            console.log("Não foi possível!")
                        }
                        break
                    case 3:
                        if(cadeiaNos.no3.mineracao([transacao3], cadeiaNos.no3.estadoConta[cadeiaNos.usuario.chave])===true)
                            cadeiaNos.no3.propagacaoDados(cadeiaNos.ConjuntoNos, 'transacao', transacao3)
                        else{
                            console.log("Não foi possível!")
                        }
                        break
 }
            break

            default:
            console.log("Opção inválida.")
    }
    }
    
    else if (escolha === '3'){
    
        console.log("\n************************** Cadeias **************************\n")
        console.log("Cadeia no Nó 1: ", cadeiaNos.no1.cadeia)
        console.log("Cadeia no Nó 2: ", cadeiaNos.no2.cadeia)
        console.log("Cadeia no Nó 3: ", cadeiaNos.no3.cadeia)
        console.log("\n************************** Cadeias após a resolução dos conflitos **************************\n")
        cadeiaNos.no1.resolucaoConflito(cadeiaNos.ConjuntoNos)
        cadeiaNos.no2.resolucaoConflito(cadeiaNos.ConjuntoNos)
        cadeiaNos.no3.resolucaoConflito(cadeiaNos.ConjuntoNos)
        console.log("Cadeia no Nó 1: ", cadeiaNos.no1.cadeia)
        console.log("Cadeia no Nó 2: ", cadeiaNos.no2.cadeia)
        console.log("Cadeia no Nó 3: ", cadeiaNos.no3.cadeia)

        console.log("Blockchain no Nó 1 é válida?", cadeiaNos.no1.validandoBloco())
        console.log("Blockchain no Nó 2 é válida?", cadeiaNos.no2.validandoBloco())
        console.log("Blockchain no Nó 3 é válida?", cadeiaNos.no3.validandoBloco())
    
    }
    
    else if (escolha === '4'){
    
        console.log("\n************************** Registros dos usuários **************************\n")
        console.log("\nRegistro do usuário 1 no Nó 1: ", cadeiaNos.no1.mostraRegistroEndereco(cadeiaNos.usuario1.chave))
        console.log("\nRegistro do usuário 1 no Nó 2: ", cadeiaNos.no2.mostraRegistroEndereco(cadeiaNos.usuario1.chave))
        console.log("\nRegistro do usuário 1 no Nó 3: ", cadeiaNos.no3.mostraRegistroEndereco(cadeiaNos.usuario1.chave))
    
        console.log("\nRegistro do usuário 2 no Nó 1: ", cadeiaNos.no1.mostraRegistroEndereco(cadeiaNos.usuario2.chave))
        console.log("\nRegistro do usuário 2 no Nó 2: ", cadeiaNos.no2.mostraRegistroEndereco(cadeiaNos.usuario2.chave))
        console.log("\nRegistro do usuário 2 no Nó 3: ", cadeiaNos.no3.mostraRegistroEndereco(cadeiaNos.usuario2.chave))
    
        console.log("\nRegistro do usuário 3 no Nó 1: ", cadeiaNos.no1.mostraRegistroEndereco(cadeiaNos.usuario3.chave))
        console.log("\nRegistro do usuário 3 no Nó 2: ", cadeiaNos.no2.mostraRegistroEndereco(cadeiaNos.usuario3.chave))
        console.log("\nRegistro do usuário 3 no Nó 3: ", cadeiaNos.no3.mostraRegistroEndereco(cadeiaNos.usuario3.chave))
        
        console.log("\nSeu registro no Nó 1: ", cadeiaNos.no1.mostraRegistroEndereco(cadeiaNos.usuario.chave))
        console.log("\nSeu registro no Nó 2: ", cadeiaNos.no2.mostraRegistroEndereco(cadeiaNos.usuario.chave))
        console.log("\nSeu registro no Nó 3: ", cadeiaNos.no3.mostraRegistroEndereco(cadeiaNos.usuario.chave))

        
        
    }
    
    else if (escolha === '5'){
        continuar = false
    }
    else{
        console.log("Opção inválida!")
    }
    }
    }
    else{
        console.log("Opção inválida!")
    }

    rl.close()
}