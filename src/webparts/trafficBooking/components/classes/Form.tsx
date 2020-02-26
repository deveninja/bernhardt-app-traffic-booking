import * as React from 'react';
import styles from '../TrafficBooking.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { connect } from 'react-redux';
import { Web, List, ItemAddResult, AttachmentFileInfo, sp } from "sp-pnp-js/lib/pnp";
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';
import { readItem, addItem, editItem } from '../../actions/index';
import { DefaultButton, PrimaryButton, DatePicker, DayOfWeek, IDatePickerStrings  } from 'office-ui-fabric-react';
import RecursiveInputs from './RecursiveInputs';
// import PersonModal from './PersonModal';
// import PeoplePicker  from './PeoplePicker';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import Loader from './Loader';

// export interface IFormProps {}

// export interface IFormState {}
const timeDropDownChoices = [
   { key: '', text: 'No Time Selected'},
   { key: '1:00:00 AM', text: '1:00:00 AM' },
   { key: '1:30:00 AM', text: '1:30:00 AM' },
   { key: '2:00:00 AM', text: '2:00:00 AM' },
   { key: '2:30:00 AM', text: '2:30:00 AM' },
   { key: '3:00:00 AM', text: '3:00:00 AM' },
   { key: '3:30:00 AM', text: '3:30:00 AM' },
   { key: '4:00:00 AM', text: '4:00:00 AM' },
   { key: '4:30:00 AM', text: '4:30:00 AM' },
   { key: '5:00:00 AM', text: '5:00:00 AM' },
   { key: '5:30:00 AM', text: '5:30:00 AM' },
   { key: '6:00:00 AM', text: '6:00:00 AM' },
   { key: '6:30:00 AM', text: '6:30:00 AM' },
   { key: '7:00:00 AM', text: '7:00:00 AM' },
   { key: '7:30:00 AM', text: '7:30:00 AM' },
   { key: '8:00:00 AM', text: '8:00:00 AM' },
   { key: '8:30:00 AM', text: '8:30:00 AM' },
   { key: '9:00:00 AM', text: '9:00:00 AM' },
   { key: '9:30:00 AM', text: '9:30:00 AM' },
   { key: '10:00:00 AM', text: '10:00:00 AM' },
   { key: '10:30:00 AM', text: '10:30:00 AM' },
   { key: '11:00:00 AM', text: '11:00:00 AM' },
   { key: '11:30:00 AM', text: '11:30:00 AM' },
   { key: '12:00:00 PM', text: '12:00:00 PM' },
   { key: '12:30:00 PM', text: '12:30:00 PM' },
   { key: '1:00:00 PM', text: '1:00:00 PM' },
   { key: '1:30:00 PM', text: '1:30:00 PM' },
   { key: '2:00:00 PM', text: '2:00:00 PM' },
   { key: '2:30:00 PM', text: '2:30:00 PM' },
   { key: '3:00:00 PM', text: '3:00:00 PM' },
   { key: '3:30:00 PM', text: '3:30:00 PM' },
   { key: '4:00:00 PM', text: '4:00:00 PM' },
   { key: '4:30:00 PM', text: '4:30:00 PM' },
   { key: '5:00:00 PM', text: '5:00:00 PM' },
   { key: '5:30:00 PM', text: '5:30:00 PM' },
   { key: '6:00:00 PM', text: '6:00:00 PM' },
   { key: '6:30:00 PM', text: '6:30:00 PM' },
   { key: '7:00:00 PM', text: '7:00:00 PM' },
   { key: '7:30:00 PM', text: '7:30:00 PM' },
   { key: '8:00:00 PM', text: '8:00:00 PM' },
   { key: '8:30:00 PM', text: '8:30:00 PM' },
   { key: '9:00:00 PM', text: '9:00:00 PM' },
   { key: '9:30:00 PM', text: '9:30:00 PM' },
   { key: '10:00:00 PM', text: '10:00:00 PM' },
   { key: '10:30:00 PM', text: '10:30:00 PM' },
   { key: '11:00:00 PM', text: '11:00:00 PM' },
   { key: '11:30:00 PM', text: '11:30:00 PM' },
   { key: '12:00:00 AM', text: '12:00:00 AM' },
   { key: '12:30:00 AM', text: '12:30:00 AM' }
   
];


const DayPickerStrings: IDatePickerStrings = {
   months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
 
   shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
 
   days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
 
   shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
 
   goToToday: 'Go to today',
   prevMonthAriaLabel: 'Go to previous month',
   nextMonthAriaLabel: 'Go to next month',
   prevYearAriaLabel: 'Go to previous year',
   nextYearAriaLabel: 'Go to next year',
   closeButtonAriaLabel: 'Close date picker'
 };


const initialFormState = {
   BernhardtCreatedBy: '',
   BernhardtSendTo: '',
   BernhardtAccount: '',
   BernhardtAccountNumber: '',
   BernhardtAccAddress: '',
   BernhardtShipTo: '',
   BernhardtInlandCarrier: '',
   BernhardtBookNumber: '',
   BernhardtSteamLine: '',
   BernhardtVessel: '',
   BernhardtVoyageNo: '',
   BernhardtPortofDischarge: '',
   BernhardtCommodity: '',
   BernhardtCartonContainerSize: '',
   BernhardtLC: '',
   BernhardtFreightForwarder: '',
   BernhardtSpecInst: '',
   BernhardtComments: '',
   BernhardtTotalShipmentValue: 0,
   BernhardtContainerNo: '',
   BernhardtSealNo: '',
   BernhardtTareWeightPounds: '',
   BernhardtTotalCartoons: '',
   BernhardtTotalPieces: '',
   BernhardtTotalWeightPounds: '',

   BernhardtLoadDate: new Date().toISOString(),
   BernhardtEarliestReturn: new Date().toISOString(),
   BernhardtSailDate: new Date().toISOString(),
   BernhardtETA: new Date().toISOString(),
   BernhardtPortCOD: new Date().toISOString(),
   BernhardtDocCutOffDate: new Date().toISOString(),
   BernhardtCreatedDate: new Date().toISOString(),

   
   CWLoadTime0: {key: '', text: 'Please Select a time'},
   PLT2LoadTime0: {key: '', text: 'Please Select a time'},
   PLT9LoadTime0: {key: '', text: 'Please Select a time'},
   CWArrivalTime0: {key: '', text: 'Please Select a time'},
   PLT2ArrivalTime: {key: '', text: 'Please Select a time'},
   PLT9ArrivalTime0: {key: '', text: 'Please Select a time'},
   CWDepartureTime0: {key: '', text: 'Please Select a time'},
   PLT2DepartureTime0: {key: '', text: 'Please Select a time'},
   PLT9DepartureTime0: {key: '', text: 'Please Select a time'},


}

class Form extends React.Component<any, any> {

   constructor(props) {
      super(props);

      this.state = {
         fileNamesToDelete: [],
         filesToSubmit: [],
         attachmentFiles: [],
         isLoading: false,
         formState : {
            ...initialFormState
         }

      };
   }

   public componentDidMount() {
      if(this.props.match.params.id){
         // console.log(this.props.match.params.id);
         // this.props.toggleEditState();
         this.props.readItem(this.props.appUrl, null, this.props.match.params.id)
         .then( item => {
            // console.log(item);
            this.setState({
               ...this.state,
               attachmentFiles: [...item.AttachmentFiles],
               formState: {
                  ...this.state.formState,
                  ...item
               }
            })
         })
         .then(() => console.log(this.state))
         .catch( err => console.log( err.message ));     
         console.log('Files from Props',this.state.formState.AttachmentFiles);
         console.log('Current Form Files',this.state.attachmentFiles);
         console.log('To Delete',this.state.fileNamesToDelete);
         console.log('To Submit',this.state.filesToSubmit);    
      }
   }

   public componentDidUpdate(prevProps, prevState) {
      // console.log(this.state);
      // console.log(Boolean(this.state.filesToSubmit.length));      
      if(this.props.match.params && (prevProps.match.params.id !== this.props.match.params.id)){
         this.props.readItem(this.props.appUrl, null, this.props.match.params.id)
         .then( item => {
            // console.log(item);
            this.setState({
               // ...prevState,
               ...this.state,
               attachmentFiles: [...item.AttachmentFiles],
               formState: {
                  ...this.state.formState,
                  ...item
               }
            })
         })
         .then(() => console.log(this.state))
         .catch( err => console.log( err.message ));         
      }

      // if(prevState.formState !== this.state.formState){
      //    this.setState({
      //       ...this.state
      //    });
      // }
   }

   

   public render(): React.ReactElement<any> {
      
      return (
         <div className={ styles.FormWrapper }>
            <div className={ styles.formButtonGroup }>
               <Stack horizontal tokens={{childrenGap: 5}}>
                  {
                     
                     <DefaultButton
                        onClick={ this._goBack }
                     >
                        Back
                     </DefaultButton>
                     
                  }

                     <DefaultButton
                        onClick={() => this.props.history.push('/')}
                     >
                        Home
                     </DefaultButton>

                  {
                     (this.props.match.url !== '/new') &&
                  
                     
                     <DefaultButton
                        onClick={this.props.toggleEditState}
                     >
                        {this.props.editState ? 'Cancel' : 'Edit'}
                     </DefaultButton>
                  }  
                  {
                     (this.props.editState) &&
                     <DefaultButton
                        onClick={() => this.handleSave(this.props.editState && this.props.match.params.id ? 'Update' : 'Save')}
                     >
                        {this.props.editState && this.props.match.params.id ? 'Update' : 'Save'}
                     </DefaultButton>
                  } 
               </Stack>
            </div>
            {/* <div className={ styles.row }>
               <div className={ styles.col12 }>
                  <Checkbox 
                     label="Unchecked checkbox (uncontrolled)" 
                     onChange={this._onStatusChange}
                     name="Remove"
                  />
               </div>
            </div> */}
            {/* {
               this.props.loadingState && 
              
               // <Loader label="Loading dealer info..." size={2} />
              
            } */}
            {
               // !this.props.loadingState &&
               <Pivot linkFormat={PivotLinkFormat.links}>
                  <PivotItem headerText="Shipping Info Details" itemIcon="Ferry">
                     <div
                        style={{
                           padding: '1rem',
                        }}
                     >
                     <Stack tokens={{childrenGap: 20}}>
                        <div className={ styles.row }>
                           <div className={ styles.col4 }>
                              <TextField
                                 label="Send To:"
                                 onGetErrorMessage={this._onError}
                                 // disabled={true}
                                 value={this.state.formState.BernhardtSendTo}
                                 // prefix=""
                                 name="BernhardtSendTo"
                                 onChange={ this._onInputChange }
                                 // errorMessage={ this._onError}
                                 disabled={!this.props.editState}
                              />
                              <Stack tokens={{childrenGap: 20}}>
                                 <div className={ styles.row }>
                                    <div className={ styles.col6 }>
                                       <TextField
                                          label="Created By:"
                                          onGetErrorMessage={this._onError}
                                          // disabled={true}
                                          value={this.state.formState.BernhardtCreatedBy}
                                          // prefix=""
                                          name="BernhardtCreatedBy"
                                          onChange={ this._onInputChange }
                                          // errorMessage={ this._onError}
                                          disabled={!this.props.editState}
                                       />
                                    </div>
                                    <div className={ styles.col6 }>
                                       <DatePicker
                                          label="Created On:"
                                          // firstDayOfWeek={this.state.firstDayOfWeek}
                                          strings={DayPickerStrings}
                                          placeholder="Select a date..."
                                          ariaLabel="Select a date"
                                          onSelectDate={() => {}}
                                          disabled={!this.props.editState}
                                          value={new Date(this.state.formState.BernhardtCreatedDate)}
                                       />
                                    </div>
                                 </div>
                              </Stack>
                              <Stack tokens={{childrenGap: 20}}>
                                 <div className={ styles.row }>
                                    <div className={ styles.col6 }>
                                       <TextField
                                          label="Account Name:"
                                          onGetErrorMessage={this._onError}
                                          // disabled={true}
                                          value={this.state.formState.BernhardtAccount}
                                          // prefix=""
                                          name="BernhardtAccount"
                                          onChange={ this._onInputChange }
                                          // errorMessage={ this._onError}
                                          disabled={!this.props.editState}
                                       />
                                    </div>
                                    <div className={ styles.col6 }>
                                       <TextField
                                          label="Account Number:"
                                          onGetErrorMessage={this._onError}
                                          // disabled={true}
                                          value={this.state.formState.BernhardtAccountNumber}
                                          // prefix=""
                                          name="BernhardtAccountNumber"
                                          onChange={ this._onInputChange }
                                          // errorMessage={ this._onError}
                                          disabled={!this.props.editState}
                                       />
                                    </div>
                                 </div>
                              </Stack>
                              <TextField
                                 label="Account Address:"
                                 onGetErrorMessage={this._onError}
                                 // disabled={true}
                                 value={this.state.formState.BernhardtAccAddress}
                                 // prefix=""
                                 name="BernhardtAccAddress"
                                 onChange={ this._onInputChange }
                                 // errorMessage={ this._onError}
                                 disabled={!this.props.editState}
                              />
                              <TextField
                                 label="Ship To:"
                                 onGetErrorMessage={this._onError}
                                 // disabled={true}
                                 value={this.state.formState.BernhardtShipTo}
                                 // prefix=""
                                 name="BernhardtShipTo"
                                 onChange={ this._onInputChange }
                                 // errorMessage={ this._onError}
                                 disabled={!this.props.editState}
                              />
                              <TextField
                                 label="Inland Carrier:"
                                 onGetErrorMessage={this._onError}
                                 // disabled={true}
                                 value={this.state.formState.BernhardtInlandCarrier}
                                 // prefix=""
                                 name="BernhardtInlandCarrier"
                                 onChange={ this._onInputChange }
                                 // errorMessage={ this._onError}
                                 disabled={!this.props.editState}
                              />                     

                           </div>


                           <div className={ styles.col4 }>
                           
                              <Stack tokens={{childrenGap: 20}}>
                                 <div className={ styles.row }>
                                    <div className={ styles.col6 }>
                                       <TextField
                                          label="Book Number:"
                                          onGetErrorMessage={this._onError}
                                          // disabled={true}
                                          value={this.state.formState.BernhardtBookNumber}
                                          // prefix=""
                                          name="BernhardtBookNumber"
                                          onChange={ this._onInputChange }
                                          // errorMessage={ this._onError}
                                          disabled={!this.props.editState}
                                       />
                                    </div>
                                    <div className={ styles.col6 }>
                                       <TextField
                                          label="Steamship Line:"
                                          onGetErrorMessage={this._onError}
                                          // disabled={true}
                                          value={this.state.formState.BernhardtSteamLine}
                                          // prefix=""
                                          name="BernhardtSteamLine"
                                          onChange={ this._onInputChange }
                                          // errorMessage={ this._onError}
                                          disabled={!this.props.editState}
                                       />
                                    </div>
                                 </div>
                              </Stack>
                              <Stack tokens={{childrenGap: 20}}>
                                 <div className={ styles.row }>
                                    <div className={ styles.col6 }>
                                       <TextField
                                          label="Vessel:"
                                          onGetErrorMessage={this._onError}
                                          // disabled={true}
                                          value={this.state.formState.BernhardtVessel}
                                          // prefix=""
                                          name="BernhardtVessel"
                                          onChange={ this._onInputChange }
                                          // errorMessage={ this._onError}
                                          disabled={!this.props.editState}
                                       />
                                    </div>
                                    <div className={ styles.col6 }>
                                       <TextField
                                          label="Voyage #:"
                                          onGetErrorMessage={this._onError}
                                          // disabled={true}
                                          value={this.state.formState.BernhardtVoyageNo}
                                          // prefix=""
                                          name="BernhardtVoyageNo"
                                          onChange={ this._onInputChange }
                                          // errorMessage={ this._onError}
                                          disabled={!this.props.editState}
                                       />
                                    </div>
                                 </div>
                                 
                              </Stack>
                              <Stack tokens={{childrenGap: 20}}>
                                 <div className={ styles.row }>
                                    <div className={ styles.col12 }>
                                    <TextField
                                       label="Port of Discharge:"
                                       onGetErrorMessage={this._onError}
                                       // disabled={true}
                                       value={this.state.formState.BernhardtPortofDischarge}
                                       // prefix=""
                                       name="BernhardtPortofDischarge"
                                       onChange={ this._onInputChange }
                                       // errorMessage={ this._onError}
                                       disabled={!this.props.editState}
                                    />
                                    </div>
                                 </div>
                              </Stack>
                              <Stack tokens={{childrenGap: 20}}>
                                 <div className={ styles.row }>
                                    <div className={ styles.col6 }>
                                       <TextField
                                          label="Commodity:"
                                          onGetErrorMessage={this._onError}
                                          // disabled={true}
                                          value={this.state.formState.BernhardtCommodity}
                                          // prefix=""
                                          name="BernhardtCommodity"
                                          onChange={ this._onInputChange }
                                          // errorMessage={ this._onError}
                                          disabled={!this.props.editState}
                                       />
                                    </div>
                                    <div className={ styles.col6 }>
                                       <TextField
                                          label="Size of Container(s):"
                                          onGetErrorMessage={this._onError}
                                          // disabled={true}
                                          value={this.state.formState.BernhardtCartonContainerSize}
                                          // prefix=""
                                          name="BernhardtCartonContainerSize"
                                          onChange={ this._onInputChange }
                                          // errorMessage={ this._onError}
                                          disabled={!this.props.editState}
                                       />
                                    </div>
                                 </div>
                              </Stack>
                              <Stack tokens={{childrenGap: 20}}>
                                 <div className={ styles.row }>
                                    <div className={ styles.col6 }>
                                       <TextField
                                          label="L/C:"
                                          onGetErrorMessage={this._onError}
                                          // disabled={true}
                                          value={this.state.formState.BernhardtLC}
                                          // prefix=""
                                          name="BernhardtLC"
                                          onChange={ this._onInputChange }
                                          // errorMessage={ this._onError}
                                          disabled={!this.props.editState}
                                       />
                                    </div>
                                    <div className={ styles.col6 }>
                                       <TextField
                                          label="Total Shipment Value:"
                                          onGetErrorMessage={this._onError}
                                          // disabled={true}
                                          value={this.state.formState.BernhardtTotalShipmentValue}
                                          // prefix=""
                                          name="BernhardtTotalShipmentValue"
                                          onChange={ this._onInputChange }
                                          // errorMessage={ this._onError}
                                          disabled={!this.props.editState}
                                       />
                                    </div>
                                 </div>
                              </Stack>
                              <TextField
                                 label="Freight Forwarders:"
                                 onGetErrorMessage={this._onError}
                                 // disabled={true}
                                 value={this.state.formState.BernhardtFreightForwarder}
                                 // prefix=""
                                 name="BernhardtFreightForwarder"
                                 onChange={ this._onInputChange }
                                 // errorMessage={ this._onError}
                                 disabled={!this.props.editState}
                              />
                              
                           </div>

                           <div className={ styles.col4 }>
                              

                              
                              
                           </div>
                        </div>
                     </Stack>                        

                     </div>
                  </PivotItem>
                  
                  <PivotItem headerText="Shipping Time Details" itemIcon="DateTime">
                     <div
                        style={{
                           padding: '1rem',
                        }}
                     >
                        <Stack tokens={{childrenGap: 20}}>
                           <div className={ styles.row }>
                              <div className={ styles.col8 }>
                                 <Stack tokens={{childrenGap: 20}}>
                                    <div className={ styles.row }>
                                       <div className={ styles.col6 }>
                                          {/* <TextField
                                             label="Load Date:"
                                             onGetErrorMessage={this._onError}
                                             // disabled={true}
                                             value={this.state.formState.BernhardtRepName}
                                             // prefix=""
                                             name="BernhardtRepName"
                                             onChange={ this._onInputChange }
                                             // errorMessage={ this._onError}
                                             disabled={!this.props.editState}
                                          /> */}
                                          <DatePicker
                                             label="Load Date:"
                                             // firstDayOfWeek={this.state.firstDayOfWeek}
                                             strings={DayPickerStrings}
                                             placeholder="Select a date..."
                                             ariaLabel="Select a date"
                                             onSelectDate={() => {}}
                                             disabled={!this.props.editState}
                                             value={new Date(this.state.formState.BernhardtLoadDate)}
                                          />
                                       </div>
                                       <div className={ styles.col6 }>
                                          <Dropdown
                                             dropdownWidth={150}
                                             placeholder="Select an option"
                                             label="CW Load Time"
                                             options={timeDropDownChoices}
                                             id="CWLoadTime0"
                                             // required={true}
                                             selectedKey={this.state.formState.CWLoadTime0.key || ''}
                                             onChange={this._onChangeDropDown}
                                             disabled={!this.props.editState}
                                          />
                                       </div>
                                    </div>
                                 </Stack>
                                 <Stack tokens={{childrenGap: 20}}>
                                    <div className={ styles.row }>
                                       <div className={ styles.col6 }>
                                          <Dropdown
                                             dropdownWidth={150}
                                             placeholder="Select an option"
                                             label="PLT 2 Load Time"
                                             options={timeDropDownChoices}
                                             id="PLT2LoadTime0"
                                             // required={true}
                                             selectedKey={this.state.formState.PLT2LoadTime0.key || ''}
                                             onChange={this._onChangeDropDown}
                                             disabled={!this.props.editState}
                                          />
                                       </div>
                                       <div className={ styles.col6 }>
                                          <Dropdown
                                             dropdownWidth={150}
                                             placeholder="Select an option"
                                             label="PLT 9 Load Time"
                                             options={timeDropDownChoices}
                                             id="PLT9LoadTime0"
                                             // required={true}
                                             selectedKey={this.state.formState.PLT9LoadTime0.key || ''}
                                             onChange={this._onChangeDropDown}
                                             disabled={!this.props.editState}
                                          />
                                       </div>
                                    </div>
                                 </Stack>
                                 <Stack tokens={{childrenGap: 20}}>
                                 <div className={ styles.row }>
                                    <div className={ styles.col6 }>
                                       
                                    </div>
                                    <div className={ styles.col6 }>
                                       <DatePicker
                                          label="Earliest Return:"
                                          // firstDayOfWeek={this.state.firstDayOfWeek}
                                          strings={DayPickerStrings}
                                          placeholder="Select a date..."
                                          ariaLabel="Select a date"
                                          onSelectDate={() => {}}
                                          disabled={!this.props.editState}
                                          value={new Date(this.state.formState.BernhardtEarliestReturn)}
                                       />
                                    </div>
                                 </div>
                              </Stack>
                              <Stack tokens={{childrenGap: 20}}>
                                 <div className={ styles.row }>
                                    <div className={ styles.col6 }>
                                       <DatePicker
                                          label="Sail Date:"
                                          // firstDayOfWeek={this.state.firstDayOfWeek}
                                          strings={DayPickerStrings}
                                          placeholder="Select a date..."
                                          ariaLabel="Select a date"
                                          onSelectDate={() => {}}
                                          disabled={!this.props.editState}
                                          value={new Date(this.state.formState.BernhardtSailDate)}
                                       />
                                       
                                    </div>
                                    <div className={ styles.col6 }>
                                       <DatePicker
                                          label="ETA:"
                                          // firstDayOfWeek={this.state.firstDayOfWeek}
                                          strings={DayPickerStrings}
                                          placeholder="Select a date..."
                                          ariaLabel="Select a date"
                                          onSelectDate={() => {}}
                                          disabled={!this.props.editState}
                                          value={new Date(this.state.formState.BernhardtETA)}
                                       />
                                    </div>
                                 </div>
                              </Stack>
                              <Stack tokens={{childrenGap: 20}}>
                                 <div className={ styles.row }>
                                    <div className={ styles.col6 }>
                                       <DatePicker
                                          label="Cutoff Date for Arrival at port:"
                                          // firstDayOfWeek={this.state.firstDayOfWeek}
                                          strings={DayPickerStrings}
                                          placeholder="Select a date..."
                                          ariaLabel="Select a date"
                                          onSelectDate={() => {}}
                                          disabled={!this.props.editState}
                                          value={new Date(this.state.formState.BernhardtPortCOD)}
                                       />
                                    </div>
                                    <div className={ styles.col6 }>
                                       <DatePicker
                                          label="Cutoff Date for Documents:"
                                          // firstDayOfWeek={this.state.firstDayOfWeek}
                                          strings={DayPickerStrings}
                                          placeholder="Select a date..."
                                          ariaLabel="Select a date"
                                          onSelectDate={() => {}}
                                          disabled={!this.props.editState}
                                          value={new Date(this.state.formState.BernhardtDocCutOffDate)}
                                       />
                                    </div>
                                 </div>
                              </Stack>
                              </div>
                           </div>
                        </Stack>
                     </div>
                  </PivotItem>

                  <PivotItem headerText="Special Instructions / Comments" itemIcon="Comment">
                     <div
                        style={{
                           padding: '1rem',
                        }}
                     >
                        <Stack tokens={{childrenGap: 20}}>
                           <div className={ styles.row }>
                              <div className={ styles.col8 }>
                                 <TextField
                                    type="text"
                                    multiline
                                    rows={5}
                                    cols={100}
                                    label="Special Instruction"
                                    // onGetErrorMessage={this._getErrorMessage}
                                    disabled={!this.props.editState}
                                    value={this.state.formState.BernhardtSpecInst ? this._sanitizeNotes(this.state.formState.BernhardtSpecInst): ''}
                                    // prefix=""
                                    name="BernhardtSpecInst"
                                    onChange={this._onInputChange}
                                 />
                                 <TextField
                                    type="text"
                                    multiline
                                    rows={5}
                                    cols={100}
                                    label="Comments"
                                    // onGetErrorMessage={this._getErrorMessage}
                                    disabled={!this.props.editState}
                                    value={this.state.formState.BernhardtComments ? this._sanitizeNotes(this.state.formState.BernhardtComments): ''}
                                    // prefix=""
                                    name="BernhardtComments"
                                    onChange={this._onInputChange}
                                 />                                  
                              </div>
                           </div>
                        </Stack>
                     </div>
                  </PivotItem>
            

                  <PivotItem headerText="Delivery Details" itemIcon="DeliveryTruck">
                     <div
                        style={{
                           padding: '1rem',
                        }}
                     >
                        <Stack tokens={{childrenGap: 20}}>
                           <div className={ styles.row }>
                              <div className={ styles.col4 }>
                                 <TextField
                                    label="Container #:"
                                    onGetErrorMessage={this._onError}
                                    // disabled={true}
                                    value={this.state.formState.BernhardtContainerNo}
                                    // prefix=""
                                    name="BernhardtContainerNo"
                                    onChange={ this._onInputChange }
                                    // errorMessage={ this._onError}
                                    disabled={!this.props.editState}
                                 />
                                 <TextField
                                    label="Seal #:"
                                    onGetErrorMessage={this._onError}
                                    // disabled={true}
                                    value={this.state.formState.BernhardtSealNo}
                                    // prefix=""
                                    name="BernhardtSealNo"
                                    onChange={ this._onInputChange }
                                    // errorMessage={ this._onError}
                                    disabled={!this.props.editState}
                                 />
                                 <TextField
                                    label="Tare Weight Pounds:"
                                    onGetErrorMessage={this._onError}
                                    // disabled={true}
                                    value={this.state.formState.BernhardtTareWeightPounds}
                                    // prefix=""
                                    name="BernhardtTareWeightPounds"
                                    onChange={ this._onInputChange }
                                    // errorMessage={ this._onError}
                                    disabled={!this.props.editState}
                                 />
                                 <Dropdown
                                    dropdownWidth={150}
                                    placeholder="Select an option"
                                    label="CW Departure Time"
                                    options={timeDropDownChoices}
                                    id="CWDepartureTime0"
                                    // required={true}
                                    selectedKey={this.state.formState.CWDepartureTime0.key || ''}
                                    onChange={this._onChangeDropDown}
                                    disabled={!this.props.editState}
                                 />
                                 <Dropdown
                                    dropdownWidth={150}
                                    placeholder="Select an option"
                                    label="PLT 2 Departure Time"
                                    options={timeDropDownChoices}
                                    id="PLT2DepartureTime0"
                                    // required={true}
                                    selectedKey={this.state.formState.PLT2DepartureTime0.key || ''}
                                    onChange={this._onChangeDropDown}
                                    disabled={!this.props.editState}
                                 />
                                 <Dropdown
                                    dropdownWidth={150}
                                    placeholder="Select an option"
                                    label="PLT 9 Departure Time"
                                    options={timeDropDownChoices}
                                    id="PLT9DepartureTime0"
                                    // required={true}
                                    selectedKey={this.state.formState.PLT9DepartureTime0.key || ''}
                                    onChange={this._onChangeDropDown}
                                    disabled={!this.props.editState}
                                 />
                                 
                              </div>
                              <div className={ styles.col4 }>
                                 
                                 <TextField
                                    label="Total Pieces:"
                                    onGetErrorMessage={this._onError}
                                    // disabled={true}
                                    value={this.state.formState.BernhardtTotalPieces}
                                    // prefix=""
                                    name="BernhardtTotalPieces"
                                    onChange={ this._onInputChange }
                                    // errorMessage={ this._onError}
                                    disabled={!this.props.editState}
                                 />
                                 <TextField
                                    label="Total Weight Pounds:"
                                    onGetErrorMessage={this._onError}
                                    // disabled={true}
                                    value={this.state.formState.BernhardtTotalWeightPounds}
                                    // prefix=""
                                    name="BernhardtTotalWeightPounds"
                                    onChange={ this._onInputChange }
                                    // errorMessage={ this._onError}
                                    disabled={!this.props.editState}
                                 />
                                 
                                 <TextField
                                    label="Total Cartons:"
                                    onGetErrorMessage={this._onError}
                                    // disabled={true}
                                    value={this.state.formState.BernhardtTotalCartoons}
                                    // prefix=""
                                    name="BernhardtTotalCartoons"
                                    onChange={ this._onInputChange }
                                    // errorMessage={ this._onError}
                                    disabled={!this.props.editState}
                                 />
                                 <Dropdown
                                    dropdownWidth={150}
                                    placeholder="Select an option"
                                    label="CW Arrival Time"
                                    options={timeDropDownChoices}
                                    id="CWArrivalTime0"
                                    // required={true}
                                    selectedKey={this.state.formState.CWArrivalTime0.key || ''}
                                    onChange={this._onChangeDropDown}
                                    disabled={!this.props.editState}
                                 />
                                 <Dropdown
                                    dropdownWidth={150}
                                    placeholder="Select an option"
                                    label="PLT 2 Arrival Time"
                                    options={timeDropDownChoices}
                                    id="PLT2ArrivalTime"
                                    // required={true}
                                    selectedKey={this.state.formState.PLT2ArrivalTime.key || ''}
                                    onChange={this._onChangeDropDown}
                                    disabled={!this.props.editState}
                                 />
                                 <Dropdown
                                    dropdownWidth={150}
                                    placeholder="Select an option"
                                    label="PLT 9 Arrival Time"
                                    options={timeDropDownChoices}
                                    id="PLT9ArrivalTime0"
                                    // required={true}
                                    selectedKey={this.state.formState.PLT9ArrivalTime0.key || ''}
                                    onChange={this._onChangeDropDown}
                                    disabled={!this.props.editState}
                                 />
                              </div>
                              <div className={ styles.col4 }>
                                 
                                 
                              </div>
                           </div>
                        </Stack>
                                             
                     </div>

                     {/* <PersonModal 
                        {...this.props}
                        showModal={this.state.showModal}
                        closeModal={this._closeModal}
                        toggleModal={this._toggleModal}
                        addOption={this.props.addOption}
                        context={this.props.context}
                        modalTitle={'Search User'}
                        setPerson={this.setPerson}
                        pickerState={this.state.pickerState}
                     /> */}
                  </PivotItem>

                  <PivotItem headerText="Attachments" itemIcon="Attach">
                     <div
                        style={{
                           padding: '1rem',
                        }}
                     >
                        
                        <div className={ styles.row }>
                           <div className={ styles.col3}>
                              <TextField
                                 label="Attach File(s):"
                                 onGetErrorMessage={this._onError}
                                 // disabled={true}
                                 // value={''}
                                 // prefix=""
                                 type="file"
                                 multiple
                                 name="attachmentFiles"
                                 onChange={ this._onInputChange }
                                 // errorMessage={ this._onError}
                                 disabled={!this.props.editState}
                                 style={{border: 'none'}}
                              />
                           </div>
                           <div className={ styles.col5 } style={{ marginTop: '29px'}}>
                           {
                              this.state.attachmentFiles &&
                              
                              <RecursiveInputs
                                 {...this.props}
                                 BernhardtSalesRepresentatives={this.state.formState.BernhardtSalesRepresentatives}
                                 editState={this.props.editState}
                                 handleDelete={this.handleDelete}
                                 handleText={this.handleText}
                                 attachments={this.state.attachmentFiles}
                              />
                           }
                           </div>
                        </div>
                     </div>
                  </PivotItem>
               

               </Pivot>
            }
         </div>
      );
   }

   private _closeModal = (): void => {
      this.setState({ ...this.state, showModal: false });
   }

   private _toggleModal = (personIdToLookUp, personPhone): void => {
      // console.log(personIdToLookUp);
      this.setState({ 
         ...this.state,
         showModal: !this.state.showModal,
         formState: {
            ...this.state.formState,
           currentPerson: personIdToLookUp,
            // [personPhone]: 'Person\'s Phone Number'
         }
      });
   }

   private _onChangeDropDown = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => { 
      // console.log(event.currentTarget.id);
      const statePropName = event.currentTarget.id.split('-list')[0];
      // console.log(statePropName);
      // console.log(item);
      this.setState({
         ...this.state,
         formState: {
            ...this.state.formState,
            [statePropName]: item
         }
      })
   }


   private changeSelection = (inputRef: string) => {
      const pickerRef = inputRef.split('Id')[0] + 'State';
      this.setState({
         ...this.state,
         pickerState: false,
         [pickerRef]: false,
         formState: {
            ...this.state.formState,
            [inputRef]: { personID: null, personName: ''}
         }
      });
      
    }

   private handleSave = (method) => {
     

      let dataToSave = {
         ...this.state.formState,
         BernhardtLoadDate: new Date(this.state.formState.BernhardtLoadDate).toISOString(),
         BernhardtEarliestReturn: new Date(this.state.formState.BernhardtEarliestReturn).toISOString(),
         BernhardtSailDate: new Date(this.state.formState.BernhardtSailDate).toISOString(),
         BernhardtETA: new Date(this.state.formState.BernhardtETA).toISOString(),
         BernhardtPortCOD: new Date(this.state.formState.BernhardtPortCOD).toISOString(),
         BernhardtDocCutOffDate: new Date(this.state.formState.BernhardtDocCutOffDate).toISOString(),
         BernhardtCreatedDate: new Date(this.state.formState.BernhardtCreatedDate).toISOString(),
         CWLoadTime0: this.state.formState.CWLoadTime0.key,
         PLT2LoadTime0: this.state.formState.PLT2LoadTime0.key,
         PLT9LoadTime0: this.state.formState.PLT9LoadTime0.key,
         CWArrivalTime0: this.state.formState.CWArrivalTime0.key,
         PLT2ArrivalTime: this.state.formState.PLT2ArrivalTime.key,
         PLT9ArrivalTime0: this.state.formState.PLT9ArrivalTime0.key ,
         CWDepartureTime0: this.state.formState.CWDepartureTime0.key ,
         PLT2DepartureTime0: this.state.formState.PLT2DepartureTime0.key ,
         PLT9DepartureTime0: this.state.formState.PLT9DepartureTime0.key ,
      };

      

      // console.log(dataToSave);
      // console.log(method);
      // return;
      this.props.onLoadingState(true);
      

      if(method === 'Save'){
         // console.log(this.state.filesToSubmit.length);
         this.props.addItem(this.props.appUrl, dataToSave, this.state.filesToSubmit )
            .then(promise => {
               this.props.onLoadingState(false);

               this.props.onItemUpdate();
               // this.setState({
               //    ...this.state,
               //    isLoading: false,
               //    filesToSubmit: [],
               //    fileNamesToDelete: []
               // });
               this.props.history.push(`/list/item/${promise.data.Id}`);
            })
            .catch(err => console.log(err.message));
      } else {
         this.props.editItem(this.props.appUrl, dataToSave, this.props.match.params.id, this.state.filesToSubmit, this.state.fileNamesToDelete)
            .then(promise => {
               this.props.onLoadingState(false);

               this.props.onItemUpdate();
               // this.setState({
               //    ...this.state,
               //    isLoading: false,
               //    filesToSubmit: [],
               //    fileNamesToDelete: []
               // });               
            })
            .catch(err => console.log(err.message));
      }
      
      this.setState({
         ...this.state,
         filesToSubmit: [],
         fileNamesToDelete: []
      });
         

   }

   private _goBack = () => {
      this.props.history.goBack();
      this.setState({
         ...this.state,
         formState: {
            ...initialFormState
         }
      });
   }

   private handleDelete = (i, id?) => (e): void => {
      // console.log(i);
      // console.log(e);
      const { attachmentFiles, fileNamesToDelete } = this.state;
      // console.log(attachmentFiles);
      // console.log(fileNamesToDelete);
      e.preventDefault();

      let fileNameToDelete = [];
      let filesToSubmit = this.state.filesToSubmit.filter(file => {
         return file.name !== attachmentFiles[i].name;
      });
      // console.log(attachmentFiles[i].FileName);
      // console.log(attachmentFiles[i].name);
      // console.log(filesToSubmit);
      if(attachmentFiles[i].FileName){
         fileNameToDelete = [...fileNameToDelete, attachmentFiles[i].FileName];
      }

      const newAttachmentFiles = attachmentFiles.filter( (item, index) => index !== i );

      // console.log(fileNameToDelete);
      this.setState({
         ...this.state,
         fileNamesToDelete: [...this.state.fileNamesToDelete, ...fileNameToDelete],
         attachmentFiles: [...newAttachmentFiles],
         filesToSubmit: [...filesToSubmit],
         formState: {
            ...this.state.formState            
         }
      });
   }

   private handleText = (i, item?) => e => {
      // console.log(this.state.formData.itemStocks[i].discount);
      //  const currentPlantName = this._handleCurrentPlantCalculation(item.originatingPlant);

         
      const newBernhardtSalesRepresentatives = this.state.formState.BernhardtSalesRepresentatives.map((item,index) => {
         let { value } = e.target;
        
         if(index === i){
            
            return { ...item, [e.target.name]: value };
            
         } else {

            return { ...item };

         }
      });

      this.setState({
         
         formState: {
            ...this.state.formState,
            BernhardtSalesRepresentatives: [...newBernhardtSalesRepresentatives]
         }

      });
      // console.log(newBernhardtSalesRepresentatives);

   }

   private _onAddItem = () => {
      this.setState({ 
         formState: { 
            ...this.state.formState, 
            BernhardtSalesRepresentatives: [
               ...this.state.formState.BernhardtSalesRepresentatives,
               {
                  BernhardtName: '',
                  BernhardtPhone: '',
                  BernhardtEmail: ''                  
               }
            ]
         }
      });
   }


   private _sanitizeNotes = (data) => {
      const regex = /(<([^>]+)>)/ig;
      return data.replace(regex, '').trimLeft();
   }

   private setPerson = ( item, itemRef) => {
      // console.log(item);
      // return (function(itemRef, currentPicker, global){
      const person = item ? this.props.lookUpUsers[`${ item.key }`] : {Title: '', Id: null};
      // console.log(person);
      const pickerRef = itemRef.split('Id')[0] + 'State';
      // console.log(pickerRef);
      if(itemRef){
         // console.log(itemRef);
         // return;
         
         this.setState({
            ...this.state,
            [pickerRef]: true,
            formState: {
               ...this.state.formState,
               [itemRef]: { personID: person.Id, personName: person.Title }
            }
         });
         
         setTimeout(() => {
            console.log(this.state.formState[itemRef]);
            // this._closeModal();
         }, 100);

         return;
      
      }     
   }

   private _onInputChange = e => {
      const arrayToCheck = [
         'BernhardtSalesManagersId',
         'BernhardtCredit_x0020_ContactId',
         'BernhardtCredit_x0020_ManagerId'
      ];

      if(e.target.name === 'attachmentFiles'){

         // let files = objectValues(e.target.files);
         const file = e.target.files;
         // console.log(file);   
         let files = Object.keys(file).map(key => file[key]);

         // console.log(files);
         this.setState({
            ...this.state,
            filesToSubmit: [...this.state.filesToSubmit, ...files],
            attachmentFiles: [...this.state.attachmentFiles, ...files],
            formState: {
               ...this.state.formState,               
            }
         });
         return;
      }

      if(arrayToCheck.indexOf(e.target.name) > -1) {
         // console.log(this.state.formState[e.target.name].personID);
         this.setState({
            ...this.state,
            formState: {
               ...this.state.formState,
               currentPerson: e.target.name
            }
         });
         return;
      }

      this.setState({
         ...this.state,
         formState: {
            ...this.state.formState,
            [e.target.name]: e.target.value
         }
      });

      return;
   }
   private _onStatusChange = (e, checked?, id?: number) => {
      console.log(e.target.name);
      this.setState({
         ...this.state,
         formState: {
            ...this.state.formState,
            [e.target.name]: checked
         }
      });
   }

   private _onError = (value: string) => {
      const errorMessage = value.length < 3 ? '' : 'Too many characters';
      return '';
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
   

    
}

const mapStateToProps = (state, ownProps) => {
   // console.log(state.userReducer.userActiveDirectory);
   return ({
      listData: state.trafficReducer.list,
      lookUpUsers: state.userReducer.userActiveDirectory
   });
}

export default connect(mapStateToProps, { readItem, addItem, editItem })(Form);