import React, { useState } from 'react'
import { Navbar, Container, Offcanvas, Nav, Form, FormControl, Button} from 'react-bootstrap'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Table from './Table';
function Menu() {
  const food = JSON.parse(localStorage.getItem("shoping"))
 
  const[myArray,setMyArray]=useState(food)
  return (
    <div >
      <Navbar expand={false} style={{ backgroundColor: "#58c3b9" }}>
        <Container fluid>
          <Navbar.Brand href="#">Food Shop</Navbar.Brand>

          <span> </span>
          <span> </span>
          <span> </span>
          <span> </span>
          <span> </span>
          <IconButton aria-label="cart">
            <Badge badgeContent={myArray.length} color="secondary">
             <a href='/Cart'>
              <ShoppingCartIcon /> </a>
            </Badge>
          </IconButton>
          

          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/Table">food List</Nav.Link>
                <Nav.Link href="/User">User List</Nav.Link>
                <Nav.Link href="/Profile">My Profile</Nav.Link>
                <Nav.Link href="/Logout">Logout</Nav.Link>

              </Nav>


              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

    </div>
  )
}

export default Menu