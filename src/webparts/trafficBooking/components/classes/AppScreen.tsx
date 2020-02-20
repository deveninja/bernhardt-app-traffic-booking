import * as React from 'react';
import styles from '../TrafficBooking.module.scss';
import Cards from './Cards';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
export interface IAppScreenProps {}

export interface IAppScreenState {}

class AppScreen extends React.Component<any, IAppScreenState> {
  constructor(props: IAppScreenProps) {
    super(props);

    this.state = {
      
    };
  }

  
  public render(): React.ReactElement<IAppScreenProps> {

    return (
      <React.Fragment>
        {/* <span className={ styles.appScreen }>Design Sales Representatives</span> */}
        <div className={ styles.homeScreen }>
          <div className={ styles.row }>
            <div className={ styles.col6 }>
              {/* {console.log(this.props.history)} */}
              <Cards 
                heading="View Items" 
                href={`list`}
                icon="DocumentSearch"
              />
            </div>
            <div className={ styles.col6 }>
              <Cards 
                heading="New Item" 
                href={`new`}
                icon="CircleAdditionSolid"
              />
            </div>
            {/* <div className={ styles.col4 }>
              <Cards 
                heading="Back to Main Outlet" 
                href={`/`}
                icon="Home"
              />
            </div> */}
          </div>        
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    data: state.oddStockReducer
  });
};

export default connect(mapStateToProps)(AppScreen);