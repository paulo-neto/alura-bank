abstract class View<T> {

    protected elemento: JQuery;

    constructor(seletor: string) {
        this.elemento = $(seletor);
    }

    update(model: T) {
        this.elemento.html(this.template(model));
    }

    abstract template(model: T): string;

}

