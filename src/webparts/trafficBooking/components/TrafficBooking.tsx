import * as React from 'react';
import styles from './TrafficBooking.module.scss';
import { ITrafficBookingProps } from './ITrafficBookingProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Route, HashRouter, Router, Switch, hashHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getName, getUserGroup, getAllUsersInActiveDirectory, getAllUsersGroups, getGroupUsers } from '../actions/currentUserActions';
import AppScreen from './classes/AppScreen';
import ListsComponent from './classes/ListsComponent';
import Form from './classes/Form';

class TrafficBooking extends React.Component<any, any> {
  public constructor(props){
    super(props)
    this.state = {
      loadingState: false,
      editState: false,
      needToFetchList: true,
      needToFetchItem: true,
    }
  }

  public componentDidMount() {
    const {user} = this.props.context.pageContext;
    const userFirstName = user.displayName.split(' ');
    this.props.getName(user.displayName);
    this.props.getUserGroup(this.props.context)
    this.props.getAllUsersInActiveDirectory(this.props.context);
    this.props.getAllUsersGroups(this.props.context)
      .then(res => {
        // console.log(res);
        for(const Id in res){
          // console.log(Id)
          this.props.getGroupUsers(this.props.context, Id);
        };
      })

      // console.log(this.props.location);
    if(this.props.location.pathname === '/new'){
      this.setState({
        ...this.state,
        editState: true
      });
    }
  
  }

  public componentDidUpdate(prevProps, prevState){
    if((prevProps.location.pathname !== this.props.location.pathname) && this.props.location.pathname === '/new'){
      this.setState({
        ...this.state,
        editState: true
      });
    } 
    // alert('Rolodex Updated');
  }

  

  public render(): React.ReactElement<ITrafficBookingProps> {
    return (
      <HashRouter>
      <div className={ styles.trafficBooking }>
        <div style={{height: '100%'}}>
        {/* <div className={ styles.row }> */}
          <div className={ styles.col12 + ' ' + styles.subTitle }>
            <div>
              <span>Traffic Booking Sheet</span>
            </div>
          </div>
        </div>

        <div className={ styles.mainWrapper }>
            <Route
                exact
                path={`${this.props.match.url}`}
                // path={'/'}
                render={(props) =>
                  <AppScreen 
                    {...this.props}
                    {...props}
                    toggleEditState={this._toggleEditState}
                    editState={this.state.editState}
                    // {...this.props, {...props}}
                    // storeData={{data: []}}
                  />
                }
              />

              <Route
                exact
                path={`${this.props.match.url}list`}
                // path={'/'}
                render={(props) =>
                  <ListsComponent 
                    {...this.props}
                    {...props}
                    toggleEditState={this._toggleEditState}
                    editState={this.state.editState}
                    onItemAdd={this._onItemAdd}
                    needToFetchList={this.state.needToFetchList}
                  />
                }
              />
              
              {/* {console.log(this.props.match.url)} */}
              
                <Switch>
                  <Route
                    exact
                    path={`${this.props.match.url}list/item/:id`}
                    // path={'/'}
                    render={(props) =>
                      <Form 
                        {...this.props}
                        {...props}
                        toggleEditState={this._toggleEditState}
                        editState={this.state.editState}
                        loadingState={this.state.editState}
                        storeData={{data: []}}
                        onItemUpdate={this._onItemUpdate}
                        needToFetchItem={this.state.needToFetchItem}
                        onLoadingState={this._onLoadingState}
                      />
                    }
                  />
                  <Route
                    exact
                    path={`${this.props.match.url}new`}
                    // path={'/'}
                    render={(props) =>
                      <Form 
                        {...this.props}
                        {...props}
                        toggleEditState={this._toggleEditState}
                        editState={this.state.editState}
                        loadingState={this.state.loadingState}
                        // {...this.props, {...props}}
                        newData={{}}
                        onItemUpdate={this._onItemUpdate}
                        onLoadingState={this._onLoadingState}
                      />
                    }
                  />
                
                </Switch>
               
        </div>
      </div>
      </HashRouter>
    );
  }

  private _toggleEditState = () => {
    // alert('Toggled');
    this.setState({
      ...this.state,
      editState: !this.state.editState
    });
  }

  private _onItemAdd = () => {
    this.setState({
      ...this.state,
     editState: true
    });
    this.props.history.push(`/new`);
  }

  private _onItemUpdate = () => {
    this.setState({
      ...this.state,
      editState: false
    });
  }

  private _onLoadingState = (logic) => {
    console.log('Loading state toggled');
    this.setState({
      ...this.state,
      loadingState: logic
    });
  }

}



const mapStateToProps = (state, ownProps) => {
  return ({
    ...state,
    currentUser: state.userReducer.name,
    appUrl: ownProps.appUrl
  });
}

export default connect(mapStateToProps, { getName, getUserGroup, getAllUsersInActiveDirectory, getAllUsersGroups, getGroupUsers })(TrafficBooking);
