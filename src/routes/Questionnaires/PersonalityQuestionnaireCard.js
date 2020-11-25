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
import { clientPersonalityQuestionnaire } from "../../graphql/queries";

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


export const PersonalityQuestionnaireCard = ({ client, requirement, sailebot,  campaign,  history, schedule_campaign_accounts_to_remove, apolloClient }) => {
  // const classes = useStyles();


  const Composed = adopt({
  clientPersonalityQuestionnaireQuery: ({ render }) => (
      <Query query={clientPersonalityQuestionnaire(client.id)} >
        {render}
      </Query> 
    ),
    // total_campaign_contacts: GetScheduledContactsCount()
  })
  return (
    <Composed>
      {({ clientPersonalityQuestionnaireQuery }) => {
        console.log("clientPersonalityQuestionnaireQuery: ", clientPersonalityQuestionnaireQuery)
        const {data, loading} = clientPersonalityQuestionnaireQuery;
        if (
          loading ||
          !data ||
          !data.personality_questionnaire ||
          data.personality_questionnaire.length === 0
        ) {
          return null;
        }
        console.log("data.personality_questionnaire: ", data.personality_questionnaire)
        const { business_acumen, cc_email, cc_name, cc_title, city, email, gender, hobbies, hometown, industry_time, interests, know_about_me, name, phone, places_travelled, role_time, timezone, title } = data.personality_questionnaire[0]
        return (
          <Card>
            <CardContent>

              <Typography variant="h6" gutterBottom><strong>Personality Questionnaire Results</strong></Typography>
              <Divider />
              <Typography><strong>About Client</strong></Typography>
              <Typography><strong>Client Hometown: </strong>{hometown}</Typography>
              <Typography><strong>Client self description: </strong>{know_about_me}</Typography>
              <Typography><strong>Client current city: </strong>{city}</Typography>
              <Typography><strong>Client interests: </strong>{interests}</Typography>
              <Typography><strong>Client  hobbies: </strong>{hobbies}</Typography>
              <Typography><strong>Client  business_acumen: </strong>{business_acumen}</Typography>
              <Typography><strong>Client places travelled: </strong>{places_travelled}</Typography>
              <Typography><strong>Time in current role: </strong>{role_time}</Typography>
              <Typography><strong>Time in Industry: </strong>{industry_time}</Typography>
              <Divider />

              <Typography><strong>Who should anyone be cc'ed on Opportunity Delivery?</strong></Typography>
              <Typography><strong>Name: </strong>{cc_name}</Typography>
              <Typography><strong>Title: </strong>{cc_title}</Typography>
              <Typography><strong>Email: </strong>{cc_email}</Typography>
              <Divider />

              <Typography><strong>Who is this Sailebot cloning</strong></Typography>
              <Typography><strong>Name: </strong>{name}</Typography>
              <Typography><strong>Title: </strong>{title}</Typography>
              <Typography><strong>Phone: </strong>{phone}</Typography>
              <Typography><strong>Timezone: </strong>{timezone}</Typography>
              <Typography><strong>Email: </strong>{email}</Typography>
              <Divider />

              <Typography><strong>The Sailebot is: </strong>{gender}</Typography>
              <Divider />

            </CardContent>
            <CardActions>
              <React.Fragment>
                <CSVLink
                  data={data.personality_questionnaire}
                  filename={`personality_questionnaire.csv`}
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