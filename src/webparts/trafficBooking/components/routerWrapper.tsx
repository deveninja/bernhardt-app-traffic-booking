import * as React from 'react';
import TrafficBooking from './TrafficBooking';
import { Route, HashRouter, Router, Switch, hashHistory } from 'react-router-dom';
import { Provider } from 'react-redux';

const routerWrapper = (props?: any): JSX.Element => {
   // console.log(props)
   return (
      <Provider store={props.store}>
         <HashRouter>
            <Route 
               render={(innerProps) => {
               // console.log(innerProps, 'rendered');
               return <TrafficBooking {...innerProps} {...props} />;
            }}
            />            
         </HashRouter>
      </Provider>
   );
}

export default routerWrapper;