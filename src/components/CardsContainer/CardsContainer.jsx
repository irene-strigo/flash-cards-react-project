import React from 'react'

import { Card } from '../Card/Card'

export const CardsContainer = ({ items }) => {

    return (
        <div className="cards">
            <h1>Cards</h1>

            {
                items && items.map(item => {
                    if (item && item.active === true) {
                        return <Card key={item.id} {...item} />
                    }
                    return null
                })
            }

        </div>
    )
}