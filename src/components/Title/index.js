import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {
    console.log('Title props: ', props)
  return (
    <Typography component="h2" variant="h6" style={{ color: '#43485a' }} gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

