import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { makeStyles } from '@material-ui/core/styles';

import { Query } from "react-apollo";
// import Moment from 'react-moment';
import { adopt } from 'react-adopt';
import { clientProspectQuestionnaire } from "../../graphql/queries";

import { CSVLink } from "react-csv";
// import FileUpload from '../../components/FileUpload'
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     '& > * + *': {
//       marginLeft: theme.spacing(2),
//     },
//   },
// }));


export const ProspectQuestionnaireCard = ({ client, requirement, sailebot,  campaign,  history, schedule_campaign_accounts_to_remove, apolloClient }) => {
  // const classes = useStyles();


  const Composed = adopt({
  clientProspectQuestionnaireQuery: ({ render }) => (
      <Query query={clientProspectQuestionnaire(client.id)} >
        {render}
      </Query> 
    ),
    // total_campaign_contacts: GetScheduledContactsCount()
  })
  return (
    <Composed>
      {({ clientProspectQuestionnaireQuery }) => {
        console.log("clientProspectQuestionnaireQuery: ", clientProspectQuestionnaireQuery)
        const {data, loading} = clientProspectQuestionnaireQuery;
        if (
          loading ||
          !data ||
          !data.prospect_questionnaire ||
          data.prospect_questionnaire.length === 0
        ) {
          return null;
        }
        console.log("data.prospect_questionnaire: ", data.prospect_questionnaire)
        const {
            decision_maker_keywords,
            industries,
            org_chart_connection,
            prospect_meeting,
            target_geography_description,
        } = data.prospect_questionnaire[0]
        return (
          <Card>
            <CardContent>

              <Typography variant="h6" gutterBottom><strong>Prospect Questionnaire Results</strong></Typography>
              <Divider />

              <Typography><strong>Org. chart connection: </strong>{org_chart_connection}</Typography>
              <Typography><strong>Prospect meeting: </strong>{prospect_meeting}</Typography>
              <Typography><strong>Target geography: </strong>{target_geography_description}</Typography>
              <Typography><strong>Industries: </strong>{industries ? industries.replaceAll(',', ', ') : ''}</Typography>
              <Typography><strong>Keywords: </strong>{decision_maker_keywords ? decision_maker_keywords.replaceAll(',', ', ') : ''}</Typography>
              <Divider />

            </CardContent>
            <CardActions>
              <React.Fragment>
                <CSVLink
                  data={data.prospect_questionnaire}
                  filename={`prospect_questionnaire.csv`}
                  className="btn btn-primary"
                  target="_blank"
                >
                  Download Data CSV
                </CSVLink>
              </React.Fragment>               
              
            </CardActions>
          </Card>

        );
      }}
    </Composed>
  );
};