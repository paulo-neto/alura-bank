import {Negociacao} from './Negociacao';
import {MeuObjeto} from './MeuObjeto';

export class Negociacoes implements MeuObjeto<Negociacoes>{

    private negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {
        return ([] as Negociacao[]).concat(this.negociacoes);
    }

    paraTexto(): void {
        console.log('-- paraTexto --');
        console.log(JSON.stringify(this.negociacoes));
    }

    ehIgual(negociacoes: any): boolean {
        return JSON.stringify(this.negociacoes) == JSON.stringify(negociacoes.paraArray());
    }
}
