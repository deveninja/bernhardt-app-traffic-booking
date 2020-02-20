import * as React from 'react';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Label } from 'office-ui-fabric-react/lib/Label';

// Load the master Sass file
import styles from '../TrafficBooking.module.scss';




export interface ILoaderProps {
  label? : string;
  size?: number;
}

export interface ILoaderState {}

export default class Loader extends React.Component<ILoaderProps, ILoaderState> {
  public render(): React.ReactElement<ILoaderProps> {
    const { size } = this.props;
    return (
      <div className={ styles.loader }>
        {/* <Label>Spinner with label positioned to right</Label> */}
        <Spinner label={this.props.label} ariaLive="assertive" labelPosition="right" size={size ? size : 3} />
      </div>
    );
  }
}
