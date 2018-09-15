import {Negociacao,Negociacoes} from '../models/index';
import {MensagemView, NegociacoesView} from '../views/index';
import {domInject,throttle} from '../helpers/decorators/index';
import {NegociacaoParcial} from '../models/NegociacaoParcial';

export class NegociacaoController {

    @domInject('#data')
    private inputData: JQuery;
    
    @domInject('#quantidade')
    private inputQuantidade: JQuery;
    
    @domInject('#valor')
    private inputValor: JQuery;

    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @throttle()
    adiciona() {

        let data = new Date(this.inputData.val().replace(/-/g, ','));

        if(!this._ehDiaUtil(data)) {
            this.mensagemView.update('Somente negociações em dias úteis, por favor!');
            return 
        }

        const negociacao = new Negociacao(
            data, 
            parseInt(this.inputQuantidade.val()),
            parseFloat(this.inputValor.val())
        );

        this.negociacoes.adiciona(negociacao);

        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso!');
    }

    @throttle()
    importaDados(){
        function isOK(res: Response) {

            if(res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }

        fetch('http://localhost:8080/dados')
            .then(res => isOK(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) => {
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
                    .forEach(negociacao => this.negociacoes.adiciona(negociacao));
                this.negociacoesView.update(this.negociacoes);
            })
            .catch(err => console.log(err.message)); 
    }

    private _ehDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta, 
    Quinta, 
    Sexta, 
    Sabado, 
}