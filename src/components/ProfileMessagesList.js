import { Card, CardContent, CardHeader } from '@mui/material'
import React from 'react'

const ProfileMessagesList = (props) => {

  return (
    <div
      style={props.sx}
    >
      {props.messages.map(item => (
        <Card>
          <CardHeader title={item.data.title} />
          <CardContent>{item.data.text}</CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ProfileMessagesList