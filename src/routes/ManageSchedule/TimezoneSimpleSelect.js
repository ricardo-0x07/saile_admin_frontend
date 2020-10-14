import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useField } from 'formik';
import { Query } from "react-apollo";

import {  listTimezones } from "../../graphql/queries"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({...props}) {
    const [field] = useField(props.name);
    const classes = useStyles();
    // const [age, setAge] = React.useState('');
    console.log('props: ', props)
    console.log('field: ', field)
    console.log('field.value: ', field.value)


    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };
    const compare = (a, b) => {
      // Use toUpperCase() to ignore character casing
      const value_A = a.value.toUpperCase();
      const value_B = b.value.toUpperCase();
    
      let comparison = 0;
      if (value_A > value_B) {
        comparison = 1;
      } else if (value_A < value_B) {
        comparison = -1;
      }
      return comparison;
    }

    return (
        <Query
        query={listTimezones()}
        >
        {({ data, loading }) => {
            if (
            loading ||
            !data ||
            !data.timezone ||
            !data.timezone
            ) {
            return null;
            }
            console.log('data: ', data)

            return (
                <div>
                    <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...field} value={props.value}
                        // onChange={handleChange}
                    >   
                        {
                            data.timezone.sort(compare).map(eo => <MenuItem key={eo.value} value={eo.value}>{eo.description}</MenuItem>)
                        }
                    </Select>
                </FormControl>
              </div>
            );
        }}
        </Query>
    );
}
