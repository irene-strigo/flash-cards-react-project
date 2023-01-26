import React from 'react'

export const SwitchButton = ({ title, direction, switchCard }) => {

    return (
        <button className="swbtn" onClick={() => { switchCard(direction) }}>{title}</button>
    )
}