import Nav from 'react-bootstrap/Nav';
function Header() {
    return (
        <Nav className='MyHeader'
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >

            <Nav.Item >
                <Nav.Link href="/home"><img className='LogoPng' src="assets/images/logo-icon.png" alt='logo'></img></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-3">Link</Nav.Link>
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