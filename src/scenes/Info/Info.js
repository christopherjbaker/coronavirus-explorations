/* eslint-disable max-len */
import React from 'react'
import { Typography } from '@material-ui/core'

export default function Info() {
  return (
    <div>
      <Typography variant="h2" gutterBottom>Model Information</Typography>
      <Typography paragraph>This model should help you and your company make a decision on whether you should open your office or send everybody home.</Typography>
      <Typography paragraph>It‘s based on how many cases are probably in your area, and the likelihood that at least one of your employees catches it. It has lots of assumptions, but all the data is here so you can play with the assumptions to adapt them to your situation. You only <strong>need</strong> to make changes to the Recommendations tab; the rest are data inputs that you can change to adjust the model.</Typography>
      <Typography paragraph>Please leave comments to improve it.</Typography>
    </div>
  )
}
