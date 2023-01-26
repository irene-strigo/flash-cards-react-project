import React, { useState } from 'react'

import allWords from './words.json'
import { SwitchButton } from '../SwitchButton/SwitchButton'
import { CardsContainer } from '../CardsContainer/CardsContainer'

const words = allWords.map((word, index) => {
    word.active = (index === 0)
    return word
})

const Items = () => {
    let [items, setItems] = useState(words)

    const itemsCount = items.length

    const switchCard = (direction) => {
        // direction === -1 - влево
        // direction === 1 - вправо
        // остальные значения игнорируются
        direction = Number(direction)
        if (!(direction === -1 || direction === 1)) {
            return
        }
        const currentActiveIndex = items.findIndex(i => i.active === true)
        let newActiveIndex = currentActiveIndex + direction
        if (newActiveIndex < 0) {
            newActiveIndex = itemsCount - 1
        } else if (newActiveIndex === itemsCount) {
            newActiveIndex = 0
        }

        const allItems = items.map((item, index) => {
            item.active = (index === newActiveIndex)
            return item
        })
        setItems(allItems)
    }

    return (
        <div className="items">
            <SwitchButton title="Prev" direction="-1" switchCard={switchCard} />

            <CardsContainer items={items} />

            <SwitchButton className="swbtn, rightButton" title="Next" direction="1" switchCard={switchCard} />
        </div>
    )
}

export default Items