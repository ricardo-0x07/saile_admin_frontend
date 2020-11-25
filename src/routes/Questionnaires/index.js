import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';

import { PersonalityQuestionnaireCard } from "./PersonalityQuestionnaireCard";
import { ProductQuestionnaireCard } from "./ProductQuestionnaireCard";
import { ProspectQuestionnaireCard } from './ProspectQuestionnaireCard';
import Title from '../../components/Title';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const Questionnaires = (props) => {
  console.log('Questionnaires props: ', props);
  const classes = useStyles();


  return (

    <div className={classes.root}>
      <Title>Questionnaires</Title>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          gridGap: 10
        }}
      >
        {
          props.location.state && props.location.state.client  &&
          <React.Fragment>
            <PersonalityQuestionnaireCard apolloClient={props.client} client={props.location.state.client} history={props.history} />
            <ProductQuestionnaireCard apolloClient={props.client} client={props.location.state.client} history={props.history} />
            <ProspectQuestionnaireCard apolloClient={props.client} client={props.location.state.client} history={props.history} />
          </React.Fragment>

        }
      </div>
    </div>

  );
};

export default Questionnaires