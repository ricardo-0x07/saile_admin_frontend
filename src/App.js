import React, { useEffect, useReducer } from "react";
import Amplify from "@aws-amplify/core";
import { API, graphqlOperation } from "aws-amplify";
import { createCampaign } from "./graphql/mutations";
import { listCampaigns } from "./graphql/queries";
import { onCreateCampaign, onUpdateCampaign } from "./graphql/subscriptions";

import config from "./aws-exports";


Amplify.configure(config); // Configure Amplify

const initialState = { todos: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case "QUERY":
      return { ...state, todos: action.todos };
    case "SUBSCRIPTION":
      return { ...state, todos: [...state.todos, action.campaign] };
    default:
      return state;
  }
};

async function createNewCampaign() {
  const campaign = { name: "Use AppSync", description: "Realtime and Offline" };
  await API.graphql(graphqlOperation(createCampaign, { input: campaign }));
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getData();
    // const subscription = API.graphql(graphqlOperation(onCreateCampaign)).subscribe({
    //   next: eventData => {
    //     const campaign = eventData.value.data.onCreateCampaign;
    //     dispatch({ type: "SUBSCRIPTION", campaign });
    //   }
    // });
    // return () => {
    //   subscription.unsubscribe();
    // };
  }, []);

  async function getData() {
    const todoData = await API.graphql(graphqlOperation(listCampaigns));
    dispatch({ type: "QUERY", todos: todoData.data.listCampaigns.items });
  }

  return (
    <div>
      <div className="App">
        <button onClick={createNewCampaign}>Add Campaign</button>
      </div>
      <div>
        {state.todos.map((campaign, i) => (
          <p key={campaign.id}>
            {campaign.name} : {campaign.description}
          </p>
        ))}
      </div>
    </div>
  );
}
export default App;