/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-no-duplicate-props */
// / eslint-disable jsx-a11y/img-redundant-alt /
// / eslint-disable react/jsx-no-duplicate-props /
// / eslint-disable default-case /
// / eslint-disable no-useless-escape /
import React, { useState } from 'react'
// import { Grid, Paper, TextField, IconButton, InputAdornment } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { omit } from 'lodash'
import axios from 'axios';
import OTPInput from 'otp-input-react'
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles(theme => ({
    grid: {
        backgroundColor: "grey",
        height: "50vh",
        textAlign: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    resend: {
        margin: theme.spacing(3, 0, 2)
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));
function Log() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [password, setpassword] = useState(false)
    let history = useHistory()
    const [code, setcode] = useState('')
    const [errors, setErrors] = useState('');
    const [values, setValues] = useState({
        code: '',

    })
    const handleChange = (event) => {
        event.preventDefault();
        event.persist();
        let name = event.target.name;
        let value = event.target.value;

        validate(event, name, value);
        setValues({
            ...values,
            [name]: value,
        })
    }
    const handleonclick = () => {
        setpassword(!password)
    }
    const handleonmousedown = () => {
        setpassword(!password)
    }
    const validate = (event, name, value) => {
        switch (name) {
            case 'email':
                if (
                    !new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}').test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address'
                    })
                } else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);

                }
                break;
            case 'password':
                if (
                    !new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        password: 'Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.'
                    })
                } else {

                    let newObj = omit(errors, "password");
                    setErrors(newObj);

                }
                break;

        }
    }
    function postdata(e) {
        e.preventDefault();
        let item = {
            phone: localStorage.getItem("phonenumber"),
            code: code
        }
        console.log(item)
        axios.post("https://unlimitedfood.herokuapp.com/verify", item).then((res) => {
            console.log("updare", res)
            if (res.data.success === true) {
                localStorage.setItem("token", res.data.token)
                window.location.reload(true);
            }
        })
    }
    function resenddata(e) {
        e.preventDefault();
        let item = {
            phone: localStorage.getItem("phonenumber"),
            code: code
        }
        console.log(item)
        axios.post("https://unlimitedfood.herokuapp.com/resend", item).then((res) => {
            console.log("updare", res)
            if (res.data.success === true) {
                localStorage.setItem("token", res.data.token)
                window.location.reload(true);
            }
            // history.push('/Table')
        })


    }
    return (
        <div>
            {/* <section class="vh-100">
                <div class="container py-5 h-100">
                    <div class="row d-flex align-items-center justify-content-center h-100">
                        <div class="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
                        </div>
                        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h5 className="fw-normal mb-3" style={{ letterspacing: "1px", textAlign: "initial" }}>Enter OTP</h5>

                            <form>
                                <div class="form-outline mb-4"> */}
                                    {/* <TextField 
                                        name='code'
                                        type='number'
                                        fullWidth label='code'
                                        variant="outlined"
                                        value={values.code}
                                        // type ={password ? 'text' : 'password'}
                                        onChange={handleChange}
                                         /> */}
                                    {/* <OTPInput
                                        name='code'
                                        value={code}
                                        onChange={setcode}
                                        autoFocus
                                        OTPLength={6}
                                        otpType="number"
                                        disabled={false}
                                    />
                                    <br />
                                    <br />

                                </div>

                                <button type="submit" class="btn btn-primary btn-lg btn-block mx-3" onClick={postdata}>Submit</button>
                                <button type="submit" class="btn btn-primary btn-lg btn-block " onClick={resenddata}>Resend OTP</button>

                            </form>
                        </div>
                    </div>
                </div>
            </section> */}
            <div>

                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Grid
                            container
                            style={{ backgroundColor: "white" }}
                            className={classes.grid}
                            justify="center"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item container justify="center">
                                <Grid item container alignItems="center" direction="column">
                                    <Grid item>
                                        <Avatar className={classes.avatar}>
                                            <LockOutlinedIcon />
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Typography component="h1" variant="h5">
                                            Verification Code
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} textAlign="center">
                                <Paper elevation={0}>
                                    <Typography variant="h6">
                                        Please enter the verification code sent to your mobile
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                container
                                justify="center"
                                alignItems="center"
                                direction="column"
                            >
                                <Grid item spacing={3} justify="center">
                                    <OTPInput
                                        name='code'
                                        value={code}
                                        onChange={setcode}
                                        autoFocus
                                        OTPLength={6}
                                        otpType="number"
                                        disabled={false}
                                        separator={
                                            <span>
                                                <strong>.</strong>
                                            </span>
                                        }
                                        inputStyle={{
                                            width: "3rem",
                                            height: "3rem",
                                            margin: "0 1rem",
                                            fontSize: "2rem",
                                            borderRadius: 4,
                                            border: "1px solid rgba(0,0,0,0.3)"
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={postdata}
                                    >
                                        Submit otp
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.resend}
                                        onClick={resenddata}
                                    >
                                        Resend otp
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Log