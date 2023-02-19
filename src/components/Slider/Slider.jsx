
import React, { useState } from 'react';
import { SwitchButton } from '../SwitchButton/SwitchButton'
import { Card } from '../Card/Card'

const Items = (props) => {
    const [howManyLearned, setHowManyLearned] = useState(0)
    const handleLearned = () => {
        setHowManyLearned(howManyLearned + 1);
    }

    const item = props.word || {}

    return (
        <>
            <div className='counter'>
                <p>Изучено слов: {howManyLearned}</p>

            </div>
            <div className="items">

                <SwitchButton title="Prev" command="prev" switchCard={props.switchCard} />

                <Card key={item.id} switchCard={props.switchCard} {...item} handleLearned={handleLearned} />

                <SwitchButton title="Next" command="next" switchCard={props.switchCard} />
            </div></>
    )
}

export default Items