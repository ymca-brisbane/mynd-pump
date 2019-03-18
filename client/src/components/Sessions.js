// List of Upcoming Workout Sessions

import React from 'react'
import Session from "./Session"
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core';
import { listSessions } from '../services/SessionService';

async function Sessions(props) {
    const sessions = await listSessions(); // [offset, limit]

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
                {sessions.map(session => (
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