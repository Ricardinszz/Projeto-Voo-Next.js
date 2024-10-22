import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function Pagina(props) {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">VoeMais</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/empresas">Empresas</Nav.Link>
                        <Nav.Link href="/aeroporto">Aeroporto</Nav.Link>
                        <Nav.Link href="/voo">Voo</Nav.Link>
                        <Nav.Link href="/passagem">Passagem</Nav.Link>
                        <Nav.Link href="/passageiro">Passageiro</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <div className="bg-secondary text-white text-center p-3">
                <h1>{props.titulo}</h1>
            </div>

            <Container>
                {props.children}
            </Container>
        </>
    )
}