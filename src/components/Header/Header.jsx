
import {

    Link

} from "react-router-dom";
function Header() {
    return (
        <>
            <div className='mainMenuContainer'>
                <div className='Heading'>Флеш-карты для изучения английского языка</div>
                <div>Test div</div>
                <nav className='mainMenu'>

                    <Link className="navLink" to="/home"><img src="assets/images/home.png" alt='home'></img></Link>

                    <Link className="navLink" to="/game"><img src="assets/images/cards.png" alt='game'></img></Link>

                    <Link className="navLink" to="/cards"><img src="assets/images/container.png" alt='home'></img></Link>

                </nav></div>

        </>
    );
}
export default Header