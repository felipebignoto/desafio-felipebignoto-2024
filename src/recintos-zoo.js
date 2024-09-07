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

        this.procuraBiomas(animal, quantidade)
    }

    validaAnimal(animal) {
        for(let i = 0; i < this.animais.length; i++) {
            if(this.animais[i].especie === animal){
                return true
            }
        }
        return false
    }

    validaBiomas(biomas,quantidade, animal){
        // Recebo os biomas disponiveis

        //Tamanho necessário
        const tamanhoNecessario = this.espaçoOcupado(animal,quantidade)

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
        console.log("Recintos possiveis: " + recintosPossiveis)

        // verifico o tamanho de cada recinto
        for(let i = 0; i < recintosPossiveis.length; i++){
            for(let j = 0; j < this.recintos.length; j++){
                if(recintosPossiveis[i] === this.recintos[j].numero){
                    let tamanhoOcupado = 0;
                    for (let k = 0; k < this.recintos[j].animais.length; k++) {
                        if(this.recintos[j].animais.length > 1 && k === 0){
                            tamanhoOcupado ++;
                        }
                        const animal = this.recintos[j].animais[k];
                        tamanhoOcupado += this.espaçoOcupado(animal.especie, animal.quantidade);
                       
                    }
                    console.log("Recinto:" + recintosPossiveis[i] + " tamanho ocupado: " + tamanhoOcupado);
                }
            }
        }

               
        // calculo quanto de espaço livre tem
  
        // Se não tiver nehum -> Erro
        // return {erro: 'Não há recinto viável'}
    
    }

    procuraBiomas(animal,quantidade){
        let biomasPossiveis 
        for(let i = 0; i < this.animais.length; i++) {
            if(this.animais[i].especie === animal){
               biomasPossiveis = this.animais[i].biomas
            }
        }
        
        this.validaBiomas(biomasPossiveis, quantidade, animal)
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
    // Animal carvívoro
    // 2 espécies = + 1 espaço ocupado

}

new RecintosZoo().analisaRecintos('CROCODILO', 2)

export { RecintosZoo as RecintosZoo };
