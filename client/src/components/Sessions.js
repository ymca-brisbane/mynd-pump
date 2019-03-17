import React from 'react'
import Session from "./Session"
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core/';

function Sessions(props) {
    const Sessions = props.Sessions

    return (
        <React.Fragment>
            <h1>Upcoming Sessions</h1>
            {/* For each session in the Sessions array, pass key info to the session and display all cards as list items */}
            <Grid 
            container 
            spacing={16}
            direction="row"
            justify="center"
            alignItems="center">
                {Sessions.map(session => (
                        <Session key={session._id} session={session}></Session>
                )
            )}
            </Grid>

        </React.Fragment>
    )
}

Sessions.propTypes = {
    Sessions: PropTypes.array
}

export default Sessions