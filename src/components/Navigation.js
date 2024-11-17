import React from 'react';
import 'tachyons';

const Navigation = ({onRouteChange, issign, deleting}) => {
        if (issign) {
            return (<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={()=>{deleting(); onRouteChange("signin")}} className='f3 link dim red underline pa3 pointer'>Delete account</p>
                <p onClick={()=>onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>sign out</p>
            </nav> )
        } else { 
            return (<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={()=>onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Signin</p>
                <p onClick={()=>onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav> );
        }
        
    
}

export default Navigation; 
