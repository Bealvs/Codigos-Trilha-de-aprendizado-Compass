import { Nos } from "./Nos.js"
import { menu } from "./Menu.js"

const cadeiaNos = new Nos ()

async function main() {

console.log("Usuário 1 é: ", cadeiaNos.usuario1.chave)
console.log("Usuário 2 é: ", cadeiaNos.usuario2.chave)
console.log("Usuário 3 é: ", cadeiaNos.usuario3.chave)

menu()
}
main()