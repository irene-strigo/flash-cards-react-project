import Nav from 'react-bootstrap/Nav';
function Header() {
    return (
        <Nav className='MyHeader'
            activeKey="/home"
            onSelect={(selectedKey) => (`selected ${selectedKey}`)}
        >

            <Nav.Item >
                <Nav.Link href="#Header"><img src="assets/images/home.png" alt='home'></img></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#Slider" eventKey="link-1"><img src="assets/images/cards.png" alt='cards'></img></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#CardBox" eventKey="link-2"><img src="assets/images/container.png" alt='container'></img></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#Table" eventKey="link-3"><img src="assets/images/table.png" alt='table'></img></Nav.Link>
            </Nav.Item>
            <Nav.Item >
                <div className="Booster"></div>
            </Nav.Item>
            <Nav.Item className='HeadingContainer' >
                <div className='Heading'>Флеш-карты для изучения английского языка</div>
            </Nav.Item>

        </Nav>


    );
}
export default Header