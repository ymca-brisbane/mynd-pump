import React from "react";
import {Paper} from "@material-ui/core";

const Error = () => {
  return (
    <Paper style={style.Paper}>
      <h1>Error 404</h1>
      <p>The page you are looking for could not be found.</p>
    </Paper>
  );
};

const style = {
    Paper: {
        'width': '500px',
        'margin': '10% auto 0 auto',
        'textAlign': 'center',
        'padding': '5%'
    }
}

export default Error;