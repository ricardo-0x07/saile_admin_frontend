import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useField } from 'formik';
import { Query } from "react-apollo";

import {  listEmailOptions } from "../../graphql/queries"

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

    return (
        <Query
        query={listEmailOptions()}
        >
        {({ data, loading }) => {
            if (
            loading ||
            !data ||
            !data.email_option ||
            !data.email_option
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
                            data.email_option.map(eo => <MenuItem key={eo.value} value={eo.value}>{eo.description}</MenuItem>)
                        }
                    </Select>
                </FormControl>
              </div>
            );
        }}
        </Query>
    );
}
