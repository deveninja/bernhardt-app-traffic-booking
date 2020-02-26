import * as React from 'react';
import styles from '../TrafficBooking.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';

class RecursiveInputs extends React.Component<any,{}> {
   public constructor(props){
      super(props);
   }

   public render(): React.ReactElement {
      return (
      

         <div style={{
            overflowY: 'auto',
            // overflowX: 'none',
            maxHeight: '330px',
            height: '330px',
            // marginTop: '1rem',
            // padding: '1rem .5rem',
            border: '1px solid rgba(0,0,0,0.3)',
         }}>
         {
            (this.props.attachments && this.props.attachments.length > 0) &&
            this._renderItemsTable()
         }
         

         </div>
      );
   }

   private _renderItemsTable = (): JSX.Element | string => {
      
      let items = '';
      if(this.props.attachments){
         items = this.props.attachments.map((item, index) => {
         //  console.log(item);
         return (
            <tr>
               
               <td style={{width: '55%'}}>
                  <a 
                     href={item.ServerRelativeUrl}
                     target="_blank"
                     onMouseOver={this.onMouseOver}
                     onMouseLeave={this.onMouseLeave}
                  >
                     <div>
                           <TextField
                              iconProps={{iconName: ''}}
                              type="text"
                              name="BernhardtEmail"
                              value={item.name ? item.name : item.FileName}
                              disabled={true}
                              // onGetErrorMessage={this._onEmailError}
                              // validateOnFocusIn
                              // validateOnFocusOut
                              
                           />
                     </div>
                  </a>

               </td>
               {
                  !this.props.match.params.id &&
              
                  <td style={{width: '5%'}}>
                     <div>
                        <TextField
                           iconProps={{iconName: ''}}
                           type="text"
                           name="BernhardtEmail"
                           value={item.size ? this._getFileSize(item.size) : ''}
                           disabled={true}
                           // onGetErrorMessage={this._onEmailError}
                           // validateOnFocusIn
                           // validateOnFocusOut
                           style={{textAlign: 'right'}}
                        />
                     </div>
                  </td>
               }
               {
                  this.props.editState &&
                  <td style={{minWidth:'unset', maxWidth: '50px', width: '50px'}}>
                     <div style={{paddingTop: '5px'}}>
                        <Icon
                           iconName='delete'
                           title={`remove this item`}
                           onClick={this.props.handleDelete(index)}
                           onMouseOver={this.onMouseOver}
                           // style={{padding: '3px'}}
                           style={{
                              fontSize: '18px'
                           }}

                        />
                     </div>
                  </td>

               }
            </tr>
         );
  
        });
      }
  
  
      return (
        <table className={ styles.itemTable }>
          <thead>
            <th style={{width:'55%'}}>File Name</th>
            {
               !this.props.match.params.id &&
               <th style={{width:'5%'}}>Size</th>
            }
            <th style={{width:'10%'}}></th>
          </thead>
          <tbody>
  
              { items }
  
          </tbody>
        </table>
      );
    }

    private onMouseOver = e => {
      // e.target.style.color = 'teal';
      e.target.style.cursor = 'pointer';
    }

    private onMouseLeave = e => {
      // e.target.style.color = 'rgb(166, 166, 166)';
    }

    private _onEmailError = (value: string) => {
      let errorMessage = '';
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      // console.log(!value.match(regex))
      if(value.length > 0){
         if(!value.match(regex)){
            errorMessage = 'Please provide a proper email address';
         }
      }
      return errorMessage;
   }

   private _getFileSize(size) {
      var i = Math.floor( Math.log(size) / Math.log(1024) );
      return (( size / Math.pow(1024, i) ) * 1).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
  };
}

export default RecursiveInputs;