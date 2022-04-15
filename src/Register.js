import React, { useState, useEffect } from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { useParams, useHistory, Link } from "react-router-dom"
import { omit } from 'lodash'

// import axios from 'axios'
// import { omit } from 'lodash'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import Swal from 'sweetalert2'
function Register() {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState([])
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: '',
        email: "",
        phone: "",
        password: '',
        // profile_url:''
    });
    const { id } = useParams()
    let history = useHistory();
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    useEffect(() => {
        // getuser()
    }, [])
    // const getuser = () => {
    //     if (id === undefined || id === null) {
    //     } else {
    //         let token = localStorage.getItem("token");
    //         axios.get(`http://localhost:9090`,{ headers: { 'x-access-token': token } }).then((result) => {
    //             console.log("result.data", result)
    //         //     if (result.data.success === true) {
    //         //         setUsername(result.data.user.username)
    //         //         setEmail(result.data.user.email)
    //         //         setPhone(result.data.user.phone)
    //         //         setPassword(result.data.user.password)
    //         //         setProfile(result.data.user.profile_url)
    //         //     } else {
    //         //         return;
    //         //     }
    //         })
    //     }
    // }
    const handleClick = () => {

        if (values.username === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Enter Email and Password?</a>'
            })
        } else {
            let FD = new FormData();
            FD.append('username', values.username);
            FD.append('email', values.email)
            FD.append('phone', values.phone)
            FD.append("password", values.password)
            FD.append('profile_file', profile[0]);

            console.log(FD)
            //    let token = localStorage.getItem('token')

            axios.post("https://unlimitedfood.herokuapp.com/Add", FD).then((res) => {
                if (res.data.success === true) {
                    Swal.fire(
                        'Good job!',
                        'Register Successfull!',
                        'success'
                    )
                    setTimeout(() => {
                        // window.location.reload(true)
                        history.push('/')
                    }, 2000);
                }
            })
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const validate = (event, name, value) => {
        //A function to validate each input values
        switch (name) {
            case 'username':
                if (!new RegExp(/^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/).test(value)) {
                    // we will set the error state
                    setErrors({
                        ...errors,
                        username: 'Username atleast have 3 letters'
                    })
                } else {
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "username");
                    setErrors(newObj);
                }
                break;
            case 'phone':
                if (!new RegExp(/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/).test(value)) {
                    // we will set the error state

                    setErrors({
                        ...errors,
                        phonenumber: 'Phonenumber atleast have 10 or <=15 digits'
                    })
                } else {
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "phone");
                    setErrors(newObj);
                }
                break;
            case 'password':
                if (!new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/).test(value)) {
                    // we will set the error state

                    setErrors({
                        ...errors,
                        password: 'Password atleast have 10 or <=15 digits'
                    })
                } else {
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "password");
                    setErrors(newObj);

                }
                break;
            case 'email':
                if (
                    !new RegExp(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address just like xyz2@gmail.com'
                    })
                } else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);
                }
                break;
        }
    }
    const handleChange = (event) => {
        //To stop default events    
        event.persist();
        let name = event.target.name;
        let val = event.target.value;
        validate(event, name, val);
        setValues({
            ...values,
            [name]: val,
        })
    }

    return (
        <div>
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <h2> Register Form</h2>
                    </Grid>
                    <form>
                        <TextField name='username' fullWidth label='Username' value={values.username} onChange={handleChange} />
                        <TextField name='email' fullWidth label='Email' value={values.email} onChange={handleChange} />
                        <TextField name='password' fullWidth label='Passwrord' value={values.password} onChange={handleChange} />
                        <TextField name='phone' fullWidth label='Phone' value={values.phone} onChange={handleChange} />
                        <input placeholder='profile' type='file' name='profil_url' onChange={(e) => setProfile(e.target.files)} />
                        <br />
                        <br />
                        {/* <Stack spacing={2} sx={{ width: '100%' }}> */}
                        <Button variant="outlined" onClick={handleClick} > submit</Button>
                        {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    This is a success message!
                                </Alert>
                            </Snackbar>
                        </Stack> */}
                    </form>
                </Paper>
            </Grid>
        </div>
    )
}

export default Register