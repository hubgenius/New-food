/* eslint-disable default-case */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Grid, Paper, TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Button, Figure } from 'react-bootstrap'
import { useParams, useHistory, Link } from "react-router-dom"
import axios from 'axios'
import { omit } from 'lodash'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { textAlign } from '@mui/system'
import Swal from 'sweetalert2'
const Login = () => {
    const [phonenumber, setphonenumber] = useState('');
    const [password, setpassword] = useState('');
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});

    const { id } = useParams()
    let history = useHistory();
    useEffect(() => {
        localStorage.removeItem("token");
    }, [])
    const postData = (e) => {
        e.preventDefault()
        if(values.phonenumber===undefined || values.password=== undefined){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Enter Phonenumber and Password?</a>'
            })
        }else{

            let item = {
                // username: values.username,
                // email: values.email,
                phone:values.phonenumber,
                password: values.password
            }
        console.log(item)
        axios.post("https://unlimitedfood.herokuapp.com/otp", item).then((res) => {
            localStorage.setItem('phonenumber', values.phonenumber);
            if (res.data.success === true) {
                Swal.fire(
                    'Good job!',
                    'OTP Send To Your Mobilenumber',
                    'success'
                )
                    // window.location.reload(true)
                    history.push('/Verify')
            }
               
            
            // history.push('/Table')
            
            // console.log("updare", res)
        })
    }
    }

    //     axios.post("https://unlimitedfood.herokuapp.com/login", item).then((res) => {
    //         localStorage.setItem('token', res.data.token);
    //         if(res.data.success=== true) {
    //             window.location.reload(true)
    //             // history.push('/Tabl')
    //         }
    //         // console.log("updare", res)
    //     })
    // }


    const validate = (event, name, value) => {
        //A function to validate each input values

        switch (name) {
            case 'password':
                if (!new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/).test(value)) {
                    // we will set the error state

                    setErrors({
                        ...errors,
                        password: 'passwordatleast have 10 to 15  digits'
                    })
                } else {
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "password");
                    setErrors(newObj);

                }
                break;

            case 'phonenumber':
                if (
                    !new RegExp(/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        phonenumber: 'Enter a valid phonenumber '
                    })
                } else {

                    let newObj = omit(errors, "phonenumber");
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
            [name]: val, [phonenumber]: val, [password]: val
        })
    }
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    const marginTop = { marginTop: 5 }

    const handleonclick = () => {
        setpassword(!password)
    }
    const handleonmousedown = () => {
        setpassword(!password)
    }
    return (
        <div>

            {/* <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <h2> Login </h2>
                    </Grid>
                    <form> */}
            {/* <TextField name='username' fullWidth label='UserName' value={values.username} onChange={handleChange} error={Boolean(errors.username)} helperText={errors.username} /> */}
            {/* <TextField name='email' fullWidth label='Email' value={values.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email} /> */}
            {/* <TextField name='password' fullWidth label='Passwrord' value={values.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password} /> */}
            {/* <TextField name='password' fullWidth label='Passwrord' type={password ? 'text' : 'password'} value={values.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton

                                            onClick={handleonclick}
                                            onMouseDown={handleonmousedown}
                                        >
                                            {password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                        <br />
                        <br />
                        <Grid align='center'>
                            <Button type='submit' class='btn btn-info' onClick={postData}>Login </Button> */}
            {/* <Stack spacing={2} sx={{ width: '100%' }}>
                                <Button variant="outlined" onClick={handleClick}>
                                 
                                   Submit
                                </Button>
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                        User Login Succsfully
                                    </Alert>
                                </Snackbar>
                            </Stack> */}
            {/* </Grid>
                        <br />
                        <Grid>
                            <Link to='/Register'> New Register   </Link>
                            <br />
                            <br />
                            <Link to='/forget'>Forgate Password</Link>
                        </Grid>
                    </form>
                </Paper>

            </Grid> */}
            <section class="vh-100" style={{ backgroundcolor: "#9A616D" }}>
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-xl-10">
                            <div class="card" style={{ borderradius: "1rem" }}>
                                <div class="row g-0">
                                    <div class="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                                            alt="Trendy Pants and Shoes"
                                            class="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                                        />
                                    </div>
                                    <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div class="card-body p-4 p-lg-5 text-black">

                                            <div class="d-flex align-items-center mb-3 pb-1">
                                                <i class="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                                <span class="h1 fw-bold mb-0">Unlimited Food Shop</span>
                                            </div>
                                            <form>
                                                <TextField name='phonenumber' fullWidth label='Phonenumber' variant='outlined' value={values.phonenumber} onChange={handleChange} error={Boolean(errors.phonenumber)} helperText={errors.phonenumber} />
                                            <br/>
                                            <br/>
                                                <TextField name='password' fullWidth label='Passwrord' variant='outlined' type={password ? 'text' : 'password'} value={values.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position='end'>
                                                                <IconButton

                                                                    onClick={handleonclick}
                                                                    onMouseDown={handleonmousedown}
                                                                >
                                                                    {password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }} />
                                                    <br/>
                                                    <br/>
                                                <div class="pt-1 mb-4">
                                                    <button class="btn btn-dark btn-lg btn-block" type="button" onClick={postData}>Login</button>
                                                </div>


                                                <div className="small text-muted">
                                                    <Link to='/forget'>Forgot Password ?</Link>
                                                </div>

                                                <p class="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account?  <Link to='/Register'>Register here </Link></p>
                                                <a href="#!" class="small text-muted">Terms of use.</a>
                                                <a href="#!" class="small text-muted">Privacy policy</a>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Login