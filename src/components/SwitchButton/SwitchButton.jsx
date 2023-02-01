import React from 'react'

export const SwitchButton = ({ title, direction, switchCard }) => {
    const filename = (direction === "-1" ? 'arrow-left' : 'arrow-right')

    return (
        <button className="swbtn" onClick={() => { switchCard(direction) }}>
            <img className="btnimg" src={`/assets/images/${filename}.png`} alt={title} />
        </button>
    )
}