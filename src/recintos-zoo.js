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

        // this.procuraBiomas(animal, quantidade)
    }

    validaAnimal(animal) {
        for(let i = 0; i < this.animais.length; i++) {
            if(this.animais[i].especie === animal){
                return true
            }
        }
        return false
    }
}

new RecintosZoo().analisaRecintos('MACACO', 2)

export { RecintosZoo as RecintosZoo };
