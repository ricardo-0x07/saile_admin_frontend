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
import { clientProductQuestionnaire } from "../../graphql/queries";

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


export const ProductQuestionnaireCard = ({ client, requirement, sailebot,  campaign,  history, schedule_campaign_accounts_to_remove, apolloClient }) => {
  // const classes = useStyles();


  const Composed = adopt({
  clientProductQuestionnaireQuery: ({ render }) => (
      <Query query={clientProductQuestionnaire(client.id)} >
        {render}
      </Query> 
    ),
    // total_campaign_contacts: GetScheduledContactsCount()
  })
  return (
    <Composed>
      {({ clientProductQuestionnaireQuery }) => {
        console.log("clientProductQuestionnaireQuery: ", clientProductQuestionnaireQuery)
        const {data, loading} = clientProductQuestionnaireQuery;
        if (
          loading ||
          !data ||
          !data.product_questionnaire ||
          data.product_questionnaire.length === 0
        ) {
          return null;
        }
        console.log("data.product_questionnaire: ", data.product_questionnaire)
        const {
            company_description,
            competitive_advantage,
            pain,
            proposition_1,
            proposition_2,
            proposition_3,
        } = data.product_questionnaire[0]
        return (
          <Card>
            <CardContent>

              <Typography variant="h6" gutterBottom><strong>Product Questionnaire Results</strong></Typography>
              <Divider />

              <Typography><strong>Company description: </strong>{company_description}</Typography>
              <Typography><strong>Customer pain: </strong>{pain}</Typography>
              <Typography><strong>Company competitive advantage: </strong>{competitive_advantage}</Typography>
              <Typography><strong>Value proposition 1: </strong>{proposition_1}</Typography>
              <Typography><strong>Value proposition 2: </strong>{proposition_2}</Typography>
              <Typography><strong>Value proposition 3: </strong>{proposition_3}</Typography>
              <Divider />

            </CardContent>
            <CardActions>
              <React.Fragment>
                <CSVLink
                  data={data.product_questionnaire}
                  filename={`product_questionnaire.csv`}
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