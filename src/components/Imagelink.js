import React from 'react';
import 'tachyons';
import './Imagelink.css'

const Imagelink = ({oninputchange, onbuttonsubmit}) => {
    return (
        <div>
            <p className='f3'>{'This will detect faces in your pictures. give it a try.'}</p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' placeholder='Insert image link' onChange={oninputchange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick = {onbuttonsubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default Imagelink;