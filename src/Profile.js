import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
export default function Pp() {
    const { id } = useParams();
    let history = useHistory();

    const [name, setName] = useState("data");
    const [email, setemail] = useState("data");
    const [phonenumber, setphonenumber] = useState("data");
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        data()
    }, [])


    function data() {
        let token = localStorage.getItem("token");

        axios.get(`http://localhost:8000/Abc`, { headers: { 'x-access-token': token } }).then((res) => {
            setName(res.data.data.username)
            setemail(res.data.data.email)
            setphonenumber(res.data.data.phone)
            setProfile(res.data.data.profile_url)
            console.log("hbhj", res)
        })
    }

    const postData = () => {
        let token = localStorage.getItem("token");

        let FD = new FormData();
        FD.append('username', name);
        FD.append('email',email)
        FD.append('phone',phonenumber)
        FD.append('profile_file', profile[0]);
        console.log("profile", profile);
        axios.put(`http://localhost:8000/${id}`, FD,{ headers: { 'x-access-token': token } })
        history.push('/User')

    }

    return (
        <div>
            
            <div className='Container'>
            <img src={profile} alt='' height='100' width='100'></img>
                <form>
                    {data}
                    <div>
                        <TextField value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant='standard'
                            label='Username'
                        />
                    </div>
                    <br />
                    <div>
                        <TextField value={email}
                            onChange={(e) => setemail(e.target.value)}
                            variant='standard'
                            label='email'
                        />
                    </div>
                    <br />
                    <div>
                        <TextField value={phonenumber} 
                        onChange={(e) => setphonenumber(e.target.value)} 
                        variant='standard'
                        label='Mobilenumber'
                        />
                    </div>
                    <input placeholder='profile' type='file' name='profil_url' onChange={(e) => setProfile(e.target.files)} />
                    <br />
  

                    <Button  type='submit' onClick={postData}>Submit</Button>
                </form>
            </div>
        </div>
    )
}

