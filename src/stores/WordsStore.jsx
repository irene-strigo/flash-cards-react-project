import { action, observable, makeObservable, runInAction } from 'mobx';

class WordsStore {
    @observable words = []

    isLoading = false

    apiBaseUrl = 'http://itgirlschool.justmakeit.ru/api/words'

    constructor() {
        makeObservable(this);
        runInAction(this.fetchWords);
    }

    fetchWords = async () => {
        this.isLoading = true;
        return fetch(this.apiBaseUrl)
            .then(response => {
                if (response.ok) { //Проверяем что код ответа 200
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then((allWords) => {
                this.words = allWords.map((word, index) => {
                    word.active = (index === 0)
                    word.unknown = false
                    word.known = false
                    word.learned = false
                    return word
                })

            }).catch(error => console.log(error));
    }

    @action deleteWord = async (wordID) => {
        fetch(`${this.apiBaseUrl}/${wordID}/delete`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (!response.ok) { //Проверяем что код ответа 200
                throw new Error('Something went wrong ...');
            }
            this.words = this.words.filter(word => word.id !== wordID)
        }).catch(error => console.log(error));
    }

    // upsert === update or insert
    @action upsertWord = async (upsertableWord) => {

        const isNew = upsertableWord.id === ''
        const url = isNew
            ? `${this.apiBaseUrl}/add`
            : `${this.apiBaseUrl}/${upsertableWord.id}/update`

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json' // из-за ошибки CORS при добавлении слова
            },
            body: JSON.stringify(upsertableWord)
        }).then(response => {
            if (response.ok) { //Проверяем что код ответа 200
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }
        }).then(savedRow => {
            upsertableWord.id = savedRow.id

            if (isNew) {
                this.words.push(upsertableWord)
            } else {
                const updatableWordIndex = this.words.findIndex(word => word.id === upsertableWord.id)
                this.words[updatableWordIndex] = upsertableWord
            }
        }).catch(error => console.log(error));
    }

    @action switchCard = (command) => {
        // direction === prev - влево
        // direction === next - вправо

        const activeIndex = this.words.findIndex(item => item.active)

        switch (command) {

            case 'unknown': {
                this.words[activeIndex].unknown = true
                this.words[activeIndex].known = false
                break;
            }

            case 'known': {
                this.words[activeIndex].known = true
                this.words[activeIndex].unknown = false
                break;
            }

            case 'prev': {
                const itemsInbox = this.words.filter(w => !w.known && !w.unknown)
                const itemsOther = this.words.filter(w => w.known || w.unknown)
                itemsInbox.push(itemsInbox.shift())
                this.words = itemsInbox.concat(itemsOther)
                break;
            }

            case 'next': {
                const itemsInbox = this.words.filter(w => !w.known && !w.unknown)
                const itemsOther = this.words.filter(w => w.known || w.unknown)
                itemsInbox.unshift(itemsInbox.pop())
                this.words = itemsInbox.concat(itemsOther)
                break;
            }

            default: { }
        }

        const nextActiveIndex = this.words.findIndex(item => !item.unknown && !item.known)
        this.words = this.words.map((item, index) => {
            item.active = (index === nextActiveIndex)
            return item
        })
    }

}

export default WordsStore