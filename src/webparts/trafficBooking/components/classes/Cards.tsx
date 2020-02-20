import * as React from 'react';
import styles from '../TrafficBooking.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Link } from 'react-router-dom';


export interface ICardsProps {
   icon?: string;
   heading: string;
   href: string;
   iconTitle?: string;
   iconAriaLabel?: string;
   onClick?: any;
   disabled?: boolean;
 }
// import states/props




class Cards extends React.Component<ICardsProps, {}> {
  public render(): React.ReactElement<ICardsProps> {
   //  if(this.props.disabled){
   //    return (
   //      <div className={ `${styles.cards} ${styles.disabled}` }>
   //        <div className={styles.disabled}>
   //          <div className={ styles.cardWrapper }>
   //            <Icon iconName={this.props.icon} title={this.props.iconTitle} ariaLabel={this.props.iconAriaLabel} />
   //          </div>
   //          <span>{this.props.heading}</span>
   //        </div>
   //      </div>
   //    );
   //  }

    return (
      <Link to={this.props.href}>
      <div className={ styles.cards }>
        <div className={ styles.cardWrapper }>
          <Icon iconName={this.props.icon} title={this.props.iconTitle} ariaLabel={this.props.iconAriaLabel} />
        </div>
        <span>{this.props.heading}</span>
      </div>
      </Link>
    );
  }
}

export default Cards;