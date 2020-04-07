import React, { Component } from 'react';
import i18n from '../../i18n';
import './nav.css';
import { Nav, Navbar, Dropdown} from "react-bootstrap";
import rwFlag from "../../assets/rw.png";
import usFlag from "../../assets/us.png";

class Navigation extends Component {
    
    render() {
        const changeLanguage = (lng) => {
            i18n.changeLanguage(lng);
            window.location.reload();
        }
        return (
            <div className="nav-background" > 
                <Navbar expand="lg" className="container py-0 px-3" id="header" >
                    <Navbar.Brand className="logo" href="/">CoviTrack</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto">
                            <Nav.Link href="/" className="nav-color" exact activeStyle={{fontWeight: 'bold'}} >{i18n.t('Home')}</Nav.Link>
                            <Nav.Link href={"/all-cases/"+ 2 } className="nav-color ml-4">{i18n.t('Cases')}</Nav.Link>
                            <Nav.Link href="/guides" className="nav-color ml-4">{i18n.t('Guides')}</Nav.Link>
                            <Nav.Link href="/followed-countries" className="nav-color ml-4">{i18n.t('Followed countries')}</Nav.Link>
                        </Nav>
                        <Nav className="float-left float-lg-right float-md-right">
                            <Dropdown>
                                <Dropdown.Toggle className="flag-toggler" id="dropdown-basic">
                                    <img src={i18n.language === 'rw' ? rwFlag : usFlag } className="language-flag rounded-circle" height="25" width="25" alt={i18n.language}/> 
                                    <span className="pl-1">{ i18n.t('Change language') }</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => changeLanguage('rw')} selected={ i18n.language === 'rw' }>Kinyarwanda</Dropdown.Item>
                                    <Dropdown.Item onClick={() => changeLanguage('en')} selected={ i18n.language === 'en' }>English</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation;
