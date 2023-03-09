import { action, observable, makeObservable } from 'mobx';

class WordStore {
    @observable words = []

    constructor() {
        makeObservable(this);
    }

}
export default BooksStore