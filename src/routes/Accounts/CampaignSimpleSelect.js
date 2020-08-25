import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useField } from 'formik';
import { Query } from "react-apollo";

// import {  listEmailOptions } from "../../graphql/queries"
import { listClientCampaigns } from "../../graphql/queries";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CompanyDomainSimpleSelect({...props}) {
    // const [field] = useField(props.name);
    const classes = useStyles();
    // const [age, setAge] = React.useState('');
    console.log('props: ', props)
    // console.log('field: ', field)
    // console.log('field.value: ', field.value)


    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };
    let default_domain = [{id:0, name: 'Default'}];
    return (
        <Query
        query={listClientCampaigns(props.client_id)}
        >
        {({ data, loading }) => {
            if (
            loading ||
            !data ||
            !data.campaign ||
            !data.campaign
            ) {
            return null;
            }
            console.log('data: ', data)
            const campaigns = default_domain.concat(data.campaign)
            console.log('campaigns: ', campaigns)
            return (
                <div>
                    <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name={props.name}
                        value={props.value ||campaigns[0].id}
                        onChange={props.onChange}
                    >   
                        {
                            campaigns.map(eo => <MenuItem key={eo.id} value={eo.id}>{eo.name}</MenuItem>)
                        }
                    </Select>
                </FormControl>
              </div>
            );
        }}
        </Query>
    );
}
