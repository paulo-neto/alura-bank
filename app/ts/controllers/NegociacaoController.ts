class NegociacaoController{

    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes: Negociacoes;
    private negociacoesView: NegociacoesView;

    constructor(){
        this.inputData = <HTMLInputElement>document.querySelector('#data');
        this.inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade');
        this.inputValor = <HTMLInputElement>document.querySelector('#valor');
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView');
        // atualiza a view para exibir os dados do modelo, vazio
        this.negociacoesView.update(this.negociacoes);
    }

    adiciona(event: Event): void{
        event.preventDefault();
        const negociacao = new Negociacao(
            new Date(this.inputData.value.replace(/-/g,',')),
            parseInt(this.inputQuantidade.value),
            parseFloat(this.inputValor.value)
        );
        this.negociacoes.adiciona(negociacao);
        // depois de adicionar, atualiza a view novamente para refletir os dados
        this.negociacoesView.update(this.negociacoes);
    }
}