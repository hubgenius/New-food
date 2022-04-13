import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@material-ui/core'
import { DeblurOutlined, DeleteOutline, Favorite } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

function NoteCard({ note, handleclick,addcart}) {
    return (
        <div>
            <Card  sx={{ maxWidth: 345 }}>
                <CardHeader
                    
                    action={
                        <IconButton onClick={() => handleclick(note._id)}>
                            <DeleteOutline />
                        </IconButton>
                    }
                    title={note.name}
                />

                <CardContent>
                    <Typography>
                        {note.description}
                    </Typography>
                    <Typography>
                        <img src={note.profile_url}  alt='' height="150px" width="250px"/>

                    </Typography>
                    <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>

                        price: {note.price}
                    </Typography>
                </CardContent>

            </Card>
                <CardActions>
                
                    <Button size="large" onClick={()=>addcart(note)}> Add to Cart</Button>
                
                </CardActions>

        </div>
    )
}

export default NoteCard
