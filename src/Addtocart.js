import React from 'react'
import {Button} from ''
function Addtocart() {
    return (
        <div>
          
               
                  
                    <Badge color="accent" badgeContent={itemTotal()} >
                        <CartIcon />
                    </Badge>
                
           
        </div>
    )
}

export default Addtocart