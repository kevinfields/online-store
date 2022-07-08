import React from 'react'

const ProfilePage = (props) => {

  const textColor = props.cardColor === 'white' ? '#002984' : 'yellow';

  return (
    <div className='page'>
      <h1
        style={{
          textAlign: 'center',
          color: textColor
        }}
      >
        My Profile
      </h1>
    </div>
  )
}

export default ProfilePage