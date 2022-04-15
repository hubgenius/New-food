import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Navbar, Container, Offcanvas, Nav, Form, FormControl, Button, Figure, } from 'react-bootstrap'
import { Grid, Paper, CardActions } from '@material-ui/core';
import NoteCard from './NoteCard';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import { Navbar, Container, Offcanvas, Nav, Form, FormControl, Button} from 'react-bootstrap'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
function Table() {
  const { id } = useParams()
  let history = useHistory();

  const items = JSON.parse(localStorage.getItem("shoping"))
  const [user, setuser] = useState([])
  const [count,setCount]=useState();
  const [myArray, setMyArray] = useState([]);
  useEffect(() => {
    data()
    console.log(items)
    if (items) {
      items.forEach(element => {
        myArray.push(element)
      });
    }setCount(myArray.length)
  }, [])

  function data() {
    // let token = localStorage.getItem('token')
    axios.get(`https://unlimitedfood.herokuapp.com/food`)
      .then(res => {
        const tableData = res.data.data;
        setuser(tableData)
        console.log('heyyyy________', res.data)
      })
  }

  function deleteuser(id) {
    // let token = localStorage.getItem('token')
    console.log(id);
    axios.delete(`https://unlimitedfood.herokuapp.com/food/${id}`)
      .then((result) => {
        console.log("result.data", result.data);
        data()
      })

  }

  function addCart(data) {
    
    if(myArray.filter(value => value._id === data._id).length > 0){
    alert("items is selected")  
    }else{

      myArray.push(data);
      localStorage.setItem("shoping", JSON.stringify(myArray))
      // setMyArray([...myArray,data])
      setCount(myArray.length)
      console.log(myArray)
    }
  }

  // const columns = [
  //     {
  //         title: 'name', field: 'name'
  //     },
  //             {
  //         title: 'Description', field: 'description'
  //     },
  //     {
  //         title: 'Quantities', field: 'quantities'
  //     },
  //     {
  //         title: 'Price (per one quantity)', field: 'price'
  //     },
  //     {
  //         title: "Image", field: "profile_url", render: (rowData) => <img src={rowData.profile_url} style={{ width: 120, height: 100}} alt="" />,
  //     },

  // ]
  return (

    <div>
       <Navbar expand={false} style={{ backgroundColor: "#58c3b9"}}>
        <Container fluid>
          <Navbar.Brand href="#">Food Shop</Navbar.Brand>

          <span> </span>
          <span> </span>
          <span> </span>
          <span> </span>
          <span> </span>
          <IconButton aria-label="cart">
            <Badge badgeContent={count} color="secondary">
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


      {/* <MaterialTable title=" Material Table"
                data={user}
                columns={columns}

                actions={[
                    {
                        
                        icon: 'edit',
                        tooltip: 'Edit User',
                        // onClick: (event, rowData) => updateuser(rowData._id),
                       
                    },
                    

                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        // onClick: (event, rowData) => deleteuser(rowData._id)

                    }, 
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true ,
                        // onClick: (event, rowData) => adduser(rowData._id)
                      }
                ]}
            /> */}

      <CardActions>
        <Link to='/Add'> <AddCircleOutlineIcon />Add</Link>

      </CardActions>

      <Container>
        <Grid container spacing={3}>
          {user.map(user => (
            <Grid item key={user.id} xs={12} md={6} lg={4}>
              <NoteCard note={user} handleclick={deleteuser} addcart={addCart} />
            </Grid>
          ))}
        </Grid>
      </Container>


    </div>
  )
}





export default Table