

import { SwitchButton } from '../SwitchButton/SwitchButton'
import { Card } from '../Card/Card'

const Items = (props) => {

    const item = props.word || {}

    return (
        <div className="items">
            <SwitchButton title="Prev" command="prev" switchCard={props.switchCard} />

            <Card key={item.id} switchCard={props.switchCard} {...item} />

            <SwitchButton title="Next" command="next" switchCard={props.switchCard} />
        </div>
    )
}

export default Items