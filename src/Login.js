/* eslint-disable default-case */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Grid, Paper, TextField,FormControl ,InputLabel,Input,InputAdornment,IconButton} from '@material-ui/core'
import { Button, Figure } from 'react-bootstrap'
import { useParams, useHistory, Link } from "react-router-dom"
import clsx from 'clsx';
import axios from 'axios'
import { omit } from 'lodash'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';

 
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});

    const { id } = useParams()
    let history = useHistory();
    useEffect(() => {
        localStorage.removeItem("token");
    }, [])
    const postData = (e) => {
        e.preventDefault()
        let item = {
            // username: values.username,
            email: values.email,
            // phonenumber:values.phonenumber,
            password: values.password
        }
        console.log(item)

        axios.post("https://unlimitedfood.herokuapp.com/login", item).then((res) => {
            localStorage.setItem('token', res.data.token);
            if (res.data.success === true) {
                window.location.reload(true)
                //     history.push('/Tabl')
            }
            // console.log("updare", res)
        })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
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
            [name]: val, [email]: val, [password]: val
        })
    }
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    const marginTop = { marginTop: 5 }
    


    return (
        <div>

            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <h2> Login <VpnKeyIcon /></h2>
                    </Grid>
                    <form>
                        {/* <TextField name='username' fullWidth label='UserName' value={values.username} onChange={handleChange} error={Boolean(errors.username)} helperText={errors.username} /> */}
                        <TextField name='email' fullWidth label='Email' value={values.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email} />
                        {/* <TextField name='password' fullWidth label='Passwrord' value={values.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password} /> */}
                    <FormControl >
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <br />
                    <br />
                    <Grid align='center'>
                        <Button type='submit' class='btn btn-info' onClick={postData}><Link to='/Table'>Login </Link></Button>
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
                    </Grid>
                    <br />
                    <Grid>
                        <Link to='/Register'> New Register   </Link>
                        <br />
                        <br />
                        <Link to='/forget'>Forgate Password</Link>
                    </Grid>
                </form>
            </Paper>

        </Grid>
        </div >
    )
}

export default Login