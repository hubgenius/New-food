import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {Navbar,Container,Offcanvas,Nav,Form,FormControl,Button,Figure,} from 'react-bootstrap'
import {  Grid, Paper,CardActions } from '@material-ui/core';
import NoteCard from './NoteCard';
function Table() {
    const { id } = useParams()
    let history = useHistory();

    const [user, setuser] = useState([])

    useEffect(() => {
        data()
    }, [])

    function data() {
        // let token = localStorage.getItem('token')
        axios.get(`https://unlimitedfood.herokuapp.com/food`)
            .then(res => {
                const tableData = res.data.data;
                setuser(tableData)
                console.log('heyyyy________',res.data)
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
    function adduser(){
       
        console.log('hey______add');
       history.push('/add')
        
    }
    function updateuser(id) {
        
        console.log('heyy_____put',id);
        history.push(`/e/${id}`);
       
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
              {/* <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">Food Shop</Navbar.Brand>
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
              <Nav className="justify-content-end flex-grow-1 pe-3"> */}
              {/* <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
                    />
                    <Figure.Caption>
                    </Figure.Caption>
                </Figure> */}
              {/* <Nav.Link href="/Table">food List</Nav.Link>
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
      </Navbar> */}

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
                    <Link to ='/Add'> Add</Link>

                </CardActions>
           
                <Container>
                <Grid container spacing={3}>
                    {user.map(user => (
                        <Grid item key={user.id} xs={12} md={6} lg={4}>
                            <NoteCard note={user} handleclick={deleteuser} />

                        </Grid>
                    ))}
                </Grid>
            </Container>
           

        </div>
    )
}





export default Table