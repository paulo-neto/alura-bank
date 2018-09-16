import {Negociacao} from './Negociacao';
import { Imprimivel } from './Imprimivel';

export class Negociacoes extends Imprimivel{

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
}
