/* eslint-disable max-len */
import React from 'react'
import { Typography } from '@material-ui/core'

export default function Info() {
  return (
    <div>
      <Typography variant="h2" gutterBottom>Model Information</Typography>
      <Typography paragraph>This model should help you and your company make a decision on whether you should open your office or send everybody home. It also applies to events and gatherings, helping make a decision on whether the event is safe or not.</Typography>
      <Typography paragraph>It‘s based on how many cases are probably in your area, and the likelihood that at least one of your group members catches it. It has lots of assumptions, but all the data is here so you can play with the assumptions to adapt them to your situation. You only <strong>need</strong> to make changes to the Recommendations tab; the rest are data inputs that you can change to adjust the model.</Typography>
      <Typography paragraph>Please leave comments to improve it.</Typography>
      <Typography component="blockquote">This tool does not provide medical advice. It is intended for informational purposes only. It is not a substitute for professional medical advice, diagnosis or treatment. If you think you may have a medical emergency, immediately call your doctor or dial 911.</Typography>
    </div>
  )
}
