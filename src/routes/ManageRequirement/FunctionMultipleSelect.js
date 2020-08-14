import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
// import Chip from '@material-ui/core/Chip';
import { useField } from 'formik';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: '100%',
    width: '100%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
    'Business Development',
    'Community and Social Services',
    'Consulting',
    'Education',
    'Engineering and Technical',
    'Finance',
    'Healthcare and Medical',
    'Human Resources',
    'Information Technology',
    'Legal',
    'Marketing',
    'Media and Communications and PR',
    'Operations',
    'Program & Product',
    'Management',
    'Purchasing and Buyers',
    'Real Estate',
    'Research',
    'Sales',
];


export default function MultipleSelect({...props}) {
    const [field] = useField(props.name);
    const classes = useStyles();
    // const [nameList, setNameList] = React.useState([]);

    // const handleChange = (event) => {
    //     setNameList(event.target.value);
    // };

    console.log('props: ', props)
    console.log('field: ', field)
    console.log('field.value: ', field.value)

    return (
        <div>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Select Job Function(s)</InputLabel>
            <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            {...field} value={props.value}
            // onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            >
            {names.map((name) => (
                <MenuItem key={name} value={name}>
                <Checkbox checked={props.value.indexOf(name) > -1} />
                <ListItemText primary={name} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
    );
}
