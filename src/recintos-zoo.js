class RecintosZoo {

    constructor() {
        this.recintos = [
          { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
          { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animais: [] },
          { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
          { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animais: [] },
          { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];
        
        this.animais = [
          { especie: 'LEAO', tamanho: 3, biomas: ['savana'] },
          { especie: 'LEOPARDO', tamanho: 2, biomas: ['savana'] },
          { especie: 'CROCODILO', tamanho: 3, biomas: ['rio'] },
          { especie: 'MACACO', tamanho: 1, biomas: ['savana', 'floresta'] },
          { especie: 'GAZELA', tamanho: 2, biomas: ['savana'] },
          { especie: 'HIPOPOTAMO', tamanho: 4, biomas: ['savana', 'rio'] }
        ];
      }

    analisaRecintos(animal, quantidade) {
        if(!this.validaAnimal(animal)){
            return { erro: 'Animal inválido' };
        }

        if(quantidade <= 0){
            return {erro: 'Quantidade inválida'}
        }

        const resultado = this.procuraBiomas(animal, quantidade)
        return resultado
    }

    validaAnimal(animal) {
        for(let i = 0; i < this.animais.length; i++) {
            if(this.animais[i].especie === animal){
                return true
            }
        }
        return false
    }

    validaBiomas(biomas,quantidade, animalRecebido){
        // Recebo os biomas disponiveis

        //Tamanho necessário
        const tamanhoNecessario = this.espaçoOcupado(animalRecebido,quantidade)

        // Recintos com os biomas possiveis
        let recintosPossiveis = []
        for(let i = 0; i < this.recintos.length; i++){
            for(let j = 0; j < biomas.length; j++){
                for(let k = 0; k < this.recintos[i].bioma.length; k++ ){
                    if(biomas[j] === this.recintos[i].bioma[k].toString()){
                        recintosPossiveis.push(this.recintos[i].numero);
                     }
                }
            }
        }

        // Verifico se o animal é carnivaro e filtro os recintos
        if(animalRecebido === "LEAO" || animalRecebido === "LEOPARDO" || animalRecebido === "CROCODILO" ){
            for(let i = 0; i < this.recintos.length; i++){
                for(let j = 0; j < recintosPossiveis.length; j++){
                    if(recintosPossiveis[j] === this.recintos[i].numero){
                        for(let k = 0; k < this.recintos[i].animais.length; k++){
                            if(this.recintos[i].animais[k].especie !== animalRecebido){
                                recintosPossiveis.splice(j, 1);
                                j--; 
                                break; 
                            }
                        }
                    }
                }
            }
        }
        else{ // Animal não é carnivaro, então não posso misturar
            for(let i = 0; i < this.recintos.length; i++){
                for(let j = 0; j < recintosPossiveis.length; j++){
                    if(recintosPossiveis[j] === this.recintos[i].numero){
                        for(let k = 0; k < this.recintos[i].animais.length; k++){
                            if(this.recintos[i].animais[k].especie === "LEAO" || this.recintos[i].animais[k].especie === "LEOPARDO" || this.recintos[i].animais[k].especie === "CROCODILO"){
                                recintosPossiveis.splice(j, 1);
                                j--; 
                                break; 
                            }
                        }
                    }
                }
            }
        }


        // verifico o tamanho de cada recinto
        // Calculo o espalo livre restante
        // Verifico a quantidade de espécies
        let tamanhoOcupadoPorRecintos = []
        let tamanhoLivrePorRecintos = []
        let recintosViaveis = [];
        let verificaEspecieDiferentes = false
        for(let i = 0; i < recintosPossiveis.length; i++){
            for(let j = 0; j < this.recintos.length; j++){
                if(recintosPossiveis[i] === this.recintos[j].numero){
                    let tamanhoOcupado = 0;
                    for (let k = 0; k < this.recintos[j].animais.length; k++) {
                        const animal = this.recintos[j].animais[k];
                        if(animal.especie !== animalRecebido){
                            verificaEspecieDiferentes = true;
                        }
                        tamanhoOcupado += this.espaçoOcupado(animal.especie, animal.quantidade);
                       
                    }
                    if(verificaEspecieDiferentes === true){
                        tamanhoOcupado = tamanhoOcupado + 1
                        verificaEspecieDiferentes = false
                    }
                    // console.log("Recinto:" + recintosPossiveis[i] + " - tamanho ocupado: " + tamanhoOcupado);
                    tamanhoOcupadoPorRecintos[i] = tamanhoOcupado
                    tamanhoLivrePorRecintos[i] = this.recintos[j].tamanhoTotal - tamanhoOcupadoPorRecintos[i] - tamanhoNecessario
                    recintosViaveis.push(`Recinto ${recintosPossiveis[i]} (espaço livre: ${tamanhoLivrePorRecintos[i]} total: ${this.recintos[j].tamanhoTotal})`);
                }
            }
        }
        
        // Se não houver recintos viáveis, retorna erro
        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        // Retorna recintos viáveis no formato solicitado
        console.log(recintosViaveis)
        return { recintosViaveis };
    }

    procuraBiomas(animal,quantidade){
        let biomasPossiveis 
        for(let i = 0; i < this.animais.length; i++) {
            if(this.animais[i].especie === animal){
               biomasPossiveis = this.animais[i].biomas
            }
        }
        
        return this.validaBiomas(biomasPossiveis, quantidade, animal)
    }

    espaçoOcupado(animal,quantidade){
        let tamanhoPorAnimal 
        for(let indice = 0; indice < this.animais.length; indice++){
            if(this.animais[indice].especie === animal){
                tamanhoPorAnimal = this.animais[indice].tamanho
            }
        }
        return tamanhoPorAnimal * quantidade
    }

    // Verificar se macaco está sozinho
    // Hipopotamo

}

new RecintosZoo().analisaRecintos('MACACO', 10)

export { RecintosZoo as RecintosZoo };
