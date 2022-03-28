import React,{useEffect} from 'react'
import {useHistory} from "react-router-dom" 
function Logout() {
  let history =useHistory()
        localStorage.clear()
        setTimeout(() => {
          window.location.reload(true)
            history.push('/')
        }, 1000);
    
  return (
    <div>
        
    </div>
  )
}

export default Logout