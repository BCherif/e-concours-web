export class CoreRequest<T> {

    constructor(public item: T, public partials?: {[partial: string]: any}) {
    }

    static of(item, partials?) {
        return new CoreRequest(item, partials);
    }

    public flat() {
        const partials = this.partials || {};
        const item = this.item;
        return {...item, ...partials};
    }
}
