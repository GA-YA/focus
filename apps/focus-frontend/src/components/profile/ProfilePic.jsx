import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function ProfilePic({ src }) {
    return (
        <div>
            {src ? (
                <img
                    src={src}
                    className='col-6 rounded-circle position-absolute'
                    alt='user pic'
                    style={{
                        objectFit: 'cover',
                        marginLeft: '23.5%',
                        marginTop: '4.5%',
                        aspectRatio: '1 / 1',
                    }}></img>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ProfilePic;
