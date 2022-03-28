import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@material-ui/core'
import { DeblurOutlined, DeleteOutline, Favorite } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

function NoteCard({ note, handleclick }) {
    return (
        <div>
            <Card  sx={{ maxWidth: 345 }}>
                <CardHeader
                    // avatar={
                    //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    //         M
                    //     </Avatar>
                    // }
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
                        <img src={note.profile_url} style={{ width: 120, height: 100}} alt='' />

                    </Typography>
                    <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>

                        price: {note.price}
                    </Typography>
                </CardContent>

            </Card>
                {/* <CardActions>
                    <Button size="large"><Link to ='/Add'> Add</Link></Button>

                </CardActions> */}

        </div>
    )
}

export default NoteCard
// {note.name}
//         {note.description}
//         {note.price}
//         {note.quantities}
//         {note.photo_path} 