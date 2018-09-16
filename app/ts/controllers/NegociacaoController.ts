import {Negociacao,Negociacoes} from '../models/index';
import {MensagemView, NegociacoesView} from '../views/index';
import {domInject,throttle} from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import {imprime} from '../helpers/index';

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
    private service = new NegociacaoService();

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

        imprime(negociacao,this.negociacoes);
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso!');
    }

    @throttle()
    importaDados(){
        this.service
            .obterNegociacoes(res => {
                if(res.ok) return res;
                throw new Error(res.statusText);
            })
            .then(negociacoesParaImportar => {
                const negociacoesJaImportadas = this.negociacoes.paraArray();
                negociacoesParaImportar
                    .filter(negociacao => 
                        !negociacoesJaImportadas.some(jaImportada => 
                            negociacao.ehIgual(jaImportada)))
                    .forEach(negociacao => 
                    this.negociacoes.adiciona(negociacao));

                this.negociacoesView.update(this.negociacoes);
            });
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