import React from 'react'

export const SwitchButton = ({ title, command, switchCard }) => {
    const filename = (command === "prev" ? 'arrow-left' : 'arrow-right')

    return (
        <button className="swbtn" onClick={() => { switchCard(command) }}>
            <img className="btnimg" src={`/assets/images/${filename}.png`} alt={title} />
        </button>
    )
}