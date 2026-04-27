import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import { Container, Nav, Navbar, NavbarCollapse } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'


const Header = () => {
  return (
        <Navbar bg = "dark" variant = "dark" expand = "lg">
            <Container>
                <Navbar.Brand href = "/" style = {{color: 'gold'}} className = "align-items-center">
                    <div d-flex align-items-center> 
                        ReviewMovies
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls = "navbarScroll" />
                <NavbarCollapse id = "navbarScroll">
                    <Nav
                        className = "me-auto my-2 my-lg-0"
                        style = {{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <NavLink className = "nav-link" to = "/" d-flex align-items-center>Home</NavLink>
                        <NavLink className = "nav-link" to = "/watchlist" d-flex align-items-center>Watch List</NavLink>
                    </Nav>
                    <Button variant = "outline-info" className = "me-2" d-flex align-items-center>Register</Button>
                    <Button variant = "outline-info" d-flex align-items-center>Login</Button>
                </NavbarCollapse>
            </Container>
        </Navbar>
  )
}

export default Header