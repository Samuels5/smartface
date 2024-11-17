import React from 'react';
import 'tachyons';

const Navigation = ({onRouteChange, issign, deleting, route}) => {
        if (issign) {
            return (<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                {route === 'update' ? <p onClick={()=>{onRouteChange("home")}} className='f3 link dim yellow underline pa3 pointer'>Home</p>:
                <p onClick={()=>{onRouteChange("update")}} className='f3 link dim yellow underline pa3 pointer'>update profile</p>}
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
