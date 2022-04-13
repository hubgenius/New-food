import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Navbar, Container, Offcanvas, Nav, Form, FormControl, Button, Figure, } from 'react-bootstrap'
import { Grid, Paper, CardActions } from '@material-ui/core';
import NoteCard from './NoteCard';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
function Table() {
  const { id } = useParams()
  let history = useHistory();

  const items = JSON.parse(localStorage.getItem("shoping"))
  const [user, setuser] = useState([])
  const [myArray, setMyArray] = useState([]);
  useEffect(() => {
    data()
    console.log(items)
    if (items) {
      items.forEach(element => {
        myArray.push(element)
      });
    }
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