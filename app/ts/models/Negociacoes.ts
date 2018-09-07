class Negociacoes {
    
    private _negociacoes: Array<Negociacao> = [];//ou Negociacao[]

    adiciona(negociacao: Negociacao){
        this._negociacoes.push(negociacao);
    }

    getNegociacoes(): Negociacao[]{
        return [].concat(this._negociacoes);
    }
}