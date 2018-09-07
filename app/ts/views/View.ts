class View<T> {
    
    private elemento: Element;

    constructor(seletor: string) {
        this.elemento = document.querySelector(seletor);
    }

    update(model: T) {
        this.elemento.innerHTML = this.template(model);
    }

    template(model: T): string {
        throw new Error('Você deve implementar o método template');
    }
}