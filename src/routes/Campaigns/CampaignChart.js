import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  Legend,
  Title,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import moment from 'moment';

import { EventTracker } from '@devexpress/dx-react-chart';

let data = [];

export default ({inbound_data, outbound_data}) => {
    console.log('inbound_data: ', inbound_data)
    console.log('outbound_data: ', outbound_data)
    const sorted = (a, b) => {
        var dateA = new Date(a.date), dateB = new Date(b.date);
        return dateA - dateB;
    }
    if (outbound_data !== undefined && outbound_data.inbox_event_log && inbound_data.inbox_event_log) {


        const missing_date1 = inbound_data.inbox_event_log.filter(vnt => !outbound_data.inbox_event_log.map(ev => ev.date).includes(vnt.date)).map(event => {
            if (!outbound_data.inbox_event_log.map(ev => ev.date).includes(event.date)) {
                return {
                    date: event.date,
                    count: 0
                }
            } else {
                return false
            }
        }).filter(res => res)
        data = outbound_data.inbox_event_log;
        data = data.concat(missing_date1).sort(sorted).map(event => {
            return {
                argument: moment(event.date, 'YYYY-MM-DD').format('DD'),
                value1: event.count
            }
        })
    }
    console.log('data: ', data);
    // const out_dates in.inbox_event_log.map(ev = ev.date)
    let in_data = []
    if (inbound_data !== undefined && inbound_data.inbox_event_log && outbound_data.inbox_event_log) {

        const missing_date = outbound_data.inbox_event_log.filter(out_event => !inbound_data.inbox_event_log.map(in_event => in_event.date).includes(out_event.date)).map(filtered_out_event => {
            if (!inbound_data.inbox_event_log.map(in_event => in_event.date).includes(filtered_out_event.date)) {
                return {
                    date: filtered_out_event.date,
                    count: 0
                }
            } else {
                return false
            }
        }).filter(res => res)
        in_data = inbound_data.inbox_event_log;
        in_data = in_data.concat(missing_date)
        in_data = in_data.sort(sorted).map(event => {
            return {
                argument: moment(event.date, 'YYYY-MM-DD').format('DD'),
                value2: event.count
            }
        })
    }
    const mergeArrayObjects = (arr1,arr2) => {
        return arr1.map((item,i)=>{
           if(item.argument === arr2[i].argument){
               //merging two objects
             return Object.assign({},item,arr2[i])
            } else {
                return false
            }
        }).filter(res => res)
    }
    if (data.length > 0 && in_data.length > 0) {
        data = mergeArrayObjects(data, in_data).filter(item => item !== undefined);
    }
    console.log('data: ', data);
    return (
        <Paper >
          <Chart data={data}>
            <ArgumentAxis />
            <ValueAxis />
      
            <LineSeries valueField="value1" argumentField="argument" name="Outbounds"/>
            <LineSeries valueField="value2" argumentField="argument" name="Inbounds"/>
            <Legend position='bottom'/>
              <Title text="Inbox Activity" />
              <EventTracker />
              <Tooltip />
          </Chart>
        </Paper>
      );
}