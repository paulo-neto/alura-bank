abstract class View<T> {
    
    private elemento: Element;

    constructor(seletor: string) {
        this.elemento = document.querySelector(seletor);
    }

    update(model: T) {
        this.elemento.innerHTML = this.template(model);
    }

    abstract template(model: T): string ;
}