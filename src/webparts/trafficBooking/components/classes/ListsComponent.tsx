import * as React from 'react';
import styles from '../TrafficBooking.module.scss';
import { connect } from 'react-redux';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { DefaultButton, PrimaryButton, Stack, IStackTokens, autobind, Icon } from 'office-ui-fabric-react';
import { Web, List, ItemAddResult, AttachmentFileInfo, sp } from "sp-pnp-js/lib/pnp";


import { fetchList } from '../../actions/index';

// export interface IListsComponentProps {}

// export interface IListsComponentState {}
const classNames = mergeStyleSets({
   fileIconHeaderIcon: {
     padding: 0,
     fontSize: '16px'
   },
   fileIconCell: {
     textAlign: 'center',
     selectors: {
       '&:before': {
         content: '.',
         display: 'inline-block',
         verticalAlign: 'middle',
         height: '100%',
         width: '0px',
         visibility: 'hidden'
       }
     }
   },
   fileIconImg: {
     verticalAlign: 'middle',
     maxHeight: '16px',
     maxWidth: '16px'
   },
   controlWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      // position: 'relative',
      maxHeight: 'calc(100vh - 320px)',
      paddingBottom: '5px',
      overflow: 'auto'
   },
   exampleToggle: {
     display: 'inline-block',
     marginBottom: '10px',
     marginRight: '30px'
   },
   selectionDetails: {
     marginBottom: '20px'
   }
 });
 const controlStyles = {
   root: {
     margin: '0 30px 20px 0',
     maxWidth: '300px'
   }
 };

 export interface IDocument {
   fileType?: string;
   Id?: number;
 }
 

class ListsComponent extends React.Component<any, any> {
   private _selection: Selection;

   constructor(props) {
      super(props);

      const columns: IColumn[] = [
        //  {
        //    key: 'column1',
        //    name: 'File Type',
        //    className: classNames.fileIconCell,
        //    iconClassName: classNames.fileIconHeaderIcon,
        //    ariaLabel: 'Column operations for File type, Press to sort on File type',
        //    iconName: 'Page',
        //    isIconOnly: true,
        //    fieldName: 'name',
        //    minWidth: 16,
        //    maxWidth: 16,
        //    onColumnClick: this._onColumnClick,
        //    onRender: (item: IDocument) => {
        //     return <img src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/vsdx_16x1.svg" />;
        //   }
        //  },
         {
           key: 'column2',
           name: 'Load Date',
           fieldName: 'BernhardtLoadDate',
           minWidth: 100,
           maxWidth: 200,
           isRowHeader: true,
           isResizable: true,
           isSorted: true,
           isSortedDescending: false,
           sortAscendingAriaLabel: 'Sorted A to Z',
           sortDescendingAriaLabel: 'Sorted Z to A',
           onColumnClick: this._onColumnClick,
           data: 'string',
           isPadded: true,
           onRender: (item) => {
            return <span>{item.BernhardtLoadDate}</span>;
          }
         },
         {
           key: 'column3',
           name: 'Account Name',
           fieldName: 'Title',
           minWidth: 100,
           maxWidth: 200,
           isRowHeader: true,
           isResizable: true,
           isSorted: true,
           isSortedDescending: false,
           sortAscendingAriaLabel: 'Sorted A to Z',
           sortDescendingAriaLabel: 'Sorted Z to A',
           onColumnClick: this._onColumnClick,
           data: 'string',
           isPadded: true,
           onRender: (item) => {
            return <span>{item.Title}</span>;
          }
         },
         {
           key: 'column4',
           name: 'Book Number',
           fieldName: 'BernhardtBookNumber',
           minWidth: 100,
           maxWidth: 200,
           isRowHeader: true,
           isResizable: true,
           isSorted: true,
           isSortedDescending: false,
           sortAscendingAriaLabel: 'Sorted A to Z',
           sortDescendingAriaLabel: 'Sorted Z to A',
           onColumnClick: this._onColumnClick,
           data: 'string',
           isPadded: true,
           onRender: (item) => {
            return <span>{item.BernhardtBookNumber}</span>;
          }
         },
         {
           key: 'column5',
           name: 'Inland Carriers',
           fieldName: 'BernhardtInlandCarrier',
           minWidth: 50,
           maxWidth: 200,
           isRowHeader: true,
           isResizable: true,
           isSorted: true,
           isSortedDescending: false,
           sortAscendingAriaLabel: 'Sorted A to Z',
           sortDescendingAriaLabel: 'Sorted Z to A',
           onColumnClick: this._onColumnClick,
           data: 'string',
           isPadded: true,
           onRender: (item) => {
            return <span>{item.BernhardtInlandCarrier}</span>;
          }
         },
         {
           key: 'column6',
           name: 'Freight Forwarders',
           fieldName: 'BernhardtFreightForwarder',
           minWidth: 40,
           maxWidth: 200,
           isRowHeader: true,
           isResizable: true,
           isSorted: true,
           isSortedDescending: false,
           sortAscendingAriaLabel: 'Sorted A to Z',
           sortDescendingAriaLabel: 'Sorted Z to A',
           onColumnClick: this._onColumnClick,
           data: 'string',
           isPadded: true,
           onRender: (item) => {
            return <span>{item.BernhardtFreightForwarder}</span>;
          }
         },
         {
           key: 'column7',
           name: 'Steamship Line',
           fieldName: 'BernhardtSteamLine',
           minWidth: 40,
           maxWidth: 200,
           isRowHeader: true,
           isResizable: true,
           isSorted: true,
           isSortedDescending: false,
           sortAscendingAriaLabel: 'Sorted A to Z',
           sortDescendingAriaLabel: 'Sorted Z to A',
           onColumnClick: this._onColumnClick,
           data: 'string',
           isPadded: true,
           onRender: (item) => {
            return <span>{item.BernhardtSteamLine}</span>;
          }
         },
         {
           key: 'column8',
           name: 'Vessel',
           fieldName: 'BernhardtVessel',
           minWidth: 100,
           maxWidth: 200,
           isRowHeader: true,
           isResizable: true,
           isSorted: true,
           isSortedDescending: false,
           sortAscendingAriaLabel: 'Sorted A to Z',
           sortDescendingAriaLabel: 'Sorted Z to A',
           onColumnClick: this._onColumnClick,
           data: 'string',
           isPadded: true,
           onRender: (item) => {
            return <span>{item.BernhardtVessel}</span>;
          }
         },
         {
           key: 'column8',
           name: 'Sail Date',
           fieldName: 'BernhardtSailDate',
           minWidth: 100,
           maxWidth: 200,
           isRowHeader: true,
           isResizable: true,
           isSorted: true,
           isSortedDescending: false,
           sortAscendingAriaLabel: 'Sorted A to Z',
           sortDescendingAriaLabel: 'Sorted Z to A',
           onColumnClick: this._onColumnClick,
           data: 'string',
           isPadded: true,
           onRender: (item) => {
            return <span>{item.BernhardtSailDate}</span>;
          }
         }
         
       ];
       this._selection = new Selection({
         onSelectionChanged: () => {
           this.setState({
             selectionDetails: this._getSelectionDetails()
           });
         }
       });

       this.state = {
         items: this.props.listData,
         columns: columns,
         currentTarget: '',
         // selectionDetails: this._getSelectionDetails(),
       };

   }

   public componentDidMount() {     
      this.props.fetchList(this.props.appUrl, '');
   }

   public componentDidUpdate(prevProps, prevState) {
      if(prevProps.listData !== this.props.listData){
         this.setState({
            ...this.state,
            items: this.props.listData
         });
      }  
   }

   public render(): React.ReactElement<any> {
      // console.log(this.state.items);
      if(!this.props.listData){
         return <h1>Fetching Data...</h1>;
      }

      return (
         <div className={ styles.listsComponentWrapper }>
           <div
              style={{
                margin: '10px',
                marginBottom: 0
              }}
            >
              <Stack horizontal tokens={{ childrenGap: 10 }}>

                <TextField
                  label={`Filter list by keyword(s)`}
                  placeholder="Search keyword"
                  onChange={this._onChangeText}
                  styles={controlStyles}
                  style={{paddingLeft: '1rem'}}
                  iconProps={{iconName: 'Search'}}
                />

                {/* <DefaultButton
                  onClick={this.updateListItemStocks}
                  iconProps={{iconName: 'Update'}}
                  size={12}
                  text={`Update All Item Stocks`}
                  styles={{root: { color: 'teal' }}}
                /> */}
                <DefaultButton
                  onClick={this.props.onItemAdd}
                  iconProps={{iconName: 'CircleAdditionSolid'}}
                  size={12}
                  text={`Add Item`}
                  styles={{root: { color: 'teal' }}}
                />

                <DefaultButton
                  onClick={() => this.props.history.push(`/`)}
                  iconProps={{iconName: 'DocumentSearch'}}
                  size={12}
                  text={`Back to Home`}
                  styles={{root: { color: 'teal' }}}
                />


              </Stack>
            </div>
            {/* <Stack horizontal tokens={{childrenGap: 5}} style={{marginLeft: '10px'}}>
               <DefaultButton id="" checked={this.state.currentTarget === ''} onClick={(e) => this._onViewClick(e, '')}>View All</DefaultButton>

               <DefaultButton id="pending" checked={this.state.currentTarget === 'pending'} onClick={(e) => this._onViewClick(e, 'pending')}>View All Pending</DefaultButton>
               <DefaultButton id="approve" checked={this.state.currentTarget === 'approve'} onClick={(e) => this._onViewClick(e, 'approve')}>View All Approved</DefaultButton>
               <DefaultButton id="declined" checked={this.state.currentTarget === 'declined'} onClick={(e) => this._onViewClick(e, 'declined')}>View All Declined</DefaultButton>
               <DefaultButton id="invoiced" checked={this.state.currentTarget === 'invoiced'} onClick={(e) => this._onViewClick(e, 'invoiced')}>View All Invoiced</DefaultButton>
            </Stack> */}
            { this._renderListItems() }
         </div>
      );
   }

   private updateListItemStocks = () => {
    this.props.listData.forEach(item => {
      // console.log(this.props);
      // return;
      new Web(this.props.appUrl).lists.getByTitle('Design Sales Representative')
      .items.getById(item.Id).update({BernhardtSalesRepresentatives: JSON.stringify({items: [...item.BernhardtSalesRepresentatives]})})
      .then((i): void => {
        console.log(`Successfully updated`, i);
        // item = {...i, key: i.Id.toString()};
      }, (error: any): void => {
        console.log('Loading all items failed with error: ' + error);
      });
    });

  }

   private _renderListItems = (): JSX.Element => {
      return (
         <div className={ classNames.controlWrapper } data-is-scrollable="true">
          <MarqueeSelection
              selection={this._selection}
              // onSelect={this._onItemClick}
              data-is-scrollable="true"
          >
              <DetailsList
                items={this.state.items}
                compact={false}
                columns={this.state.columns}
                selectionMode={ SelectionMode.single }
                getKey={this._getKey}
                setKey="none"
                layoutMode={DetailsListLayoutMode.fixedColumns}
                isHeaderVisible={true}
                selection={this._onItemClick}
                selectionPreservedOnEmptyClick={true}
                onItemInvoked={this._onItemInvoked}
                enterModalSelectionOnTouch={true}
                onRenderCheckbox={() => <span><Icon iconName="FolderOpen" title="Open item" /></span>}
                onRenderRow={(props, defaultRender) => {
                    return <div className={ '' } onMouseOver={this.onMouseOver}>{defaultRender(props)}</div>
                }}
                // checkButtonAriaLabel="Row checkbox"
                // rowElementEventMap={(event, callback: (context: IDragDropContext, event?: any): => void)}
                // onRenderDetailsHeader={
                //   // tslint:disable-next-line:jsx-no-lambda
                //   (detailsHeaderProps: IDetailsHeaderProps, defaultRender) => (
                //     <Sticky>
                //       {defaultRender(detailsHeaderProps)}
                //     </Sticky>
                //   ) }
              />
          </MarqueeSelection>
         </div>
      );
   }

   // private _getSelectionDetails(): string {
   //    const selectionCount = this._selection.getSelectedCount();
  
   //    switch (selectionCount) {
   //      case 0:
   //        return 'No items selected';
   //      case 1:
   //        return '1 item selected: ' + (this._selection.getSelection()[0] as IDocument).Id;
   //      default:
   //        return `${selectionCount} items selected`;
   //    }
   //  }

   

   private _getSelectionDetails(): string {
      const selectionCount = this._selection.getSelectedCount();
  
      switch (selectionCount) {
        case 0:
          return 'No items selected';
        case 1:
          return '1 item selected: ' + (this._selection.getSelection()[0] as IDocument).Id;
        default:
          return `${selectionCount} items selected`;
      }
    }

   private onMouseOver = (e) => {

      e.currentTarget.style.cursor = 'pointer';
      // e.currentTarget.parentNode.style.backgroundColor = 'rgb(154, 199, 199)';
      // e.currentTarget.style.backgroundColor = 'rgb(154, 199, 199)';
      // e.target.parentNode.style.backgroundColor = 'rgb(154, 199, 199)';
      // e.target.style.backgroundColor = 'rgb(154, 199, 199)';
    }

   private _getKey = (item: any, index?: number): string => {
      // console.log(this.state.items[index]);
      if(item.Id) return item.Id.toString();
      item.key = 1;
      return item.key.toString();
   }

   private _onItemInvoked = (item: any): void => {
      // alert(`Item invoked: ${item.BernhardtAckNo}`);
      // this.props.history.push(`${this.props.match.url}/item/${item.Id}`);
      // console.log(this.props);
      // console.log(item);
      this.props.history.push(`${this.props.match.url}/item/${item.Id}`);
   }

   private _onItemClick = new Selection({
      onSelectionChanged: () => {
        const selectedItem = this._onItemClick.getSelection()[0] ? this._onItemClick.getSelection()[0].key : '';
        // console.log(selectedItem);
        this.setState({
         //  selectionDetails: this._getSelectionDetails()
        });
        if(this.props.editState){
          this.props.toggleEditState();
        }
        if(selectedItem !== ''){
          this.props.history.push(`${this.props.match.url}/item/${selectedItem}`);
        }
      }
    })

   private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
      const { columns } = this.state;
      const { items } = this.state;
      const newColumns: IColumn[] = columns.slice();
      const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
      newColumns.forEach((newCol: IColumn) => {
         if (newCol === currColumn) {
            currColumn.isSortedDescending = !currColumn.isSortedDescending;
            currColumn.isSorted = true;
            this.setState({
            announcedMessage: `${currColumn.name} is sorted ${currColumn.isSortedDescending ? 'descending' : 'ascending'}`
            });
         } else {
            newCol.isSorted = false;
            newCol.isSortedDescending = true;
         }
      });
      const newItems = this._copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
      this.setState({
         columns: newColumns,
         items: newItems
      });
   };

   private _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
      const key = columnKey as keyof T;
      // return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
      // console.log(items[0]);
      return items.slice(0).sort((a: T, b: T) => {
        return ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1);
      });
   }

   private _onViewClick = (e, viewString: string): void => {
      // console.log(this);
  
      // console.log(e.currentTarget.id);
      this._onChangeText(e, viewString);
      this.setState({
         currentTarget: e.currentTarget.id
      })

   }

   private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
      // console.log('Input changes');
      // console.log(this.state.items);
      // console.log('Query String', text);
      // this.setState({
      //   items: text ? this.props.listData.filter(i => i.BernhardtAckNo.indexOf(text) > -1 ) : [...this.props.listData, {['BernhardtAckNo']: 'Hello'}]
      // });
      const currentFilteredData = [...this.props.listData];
      const escapedText = (text === '`' || text === '\'' || text === '\"') ? text = `\\${text}` : text;
      // console.log(escapedText);
      const items = escapedText ? currentFilteredData.filter(item => this.hasText(item, escapedText)) : currentFilteredData;
  
      // let filteredItems = {}
      // for(let item of items){
      //     // console.log(item);
      //     filteredItems = {...filteredItems, [item.Id]: item};
      // }
  
  
      // let curatedItems = [];
      // // if(this.props.listData) {
      // curatedItems = this.props.listData.map( item => {
      //     // console.log(item['BernhardtColor1']);
      //     let itemStock = [];
  
      //     for(let i = 1; i <= 20; i++){
      //         itemStock = [
      //         ...itemStock,
      //         {
      //           color: item[`BernhardtColor${i}`],
      //           description: item[`BernhardtDescription${i}`],
      //           extPrice: item[`BernhardtExtPrice${i}`],
      //           location: item[`BernhardtLocation${i}`],
      //           osId: item[`BernhardtOSID${i}`],
      //           readOnCode: item[`BernhardtReadonCode${i}`],
      //           style: item[`BernhardtStyle${i}`],
      //           wholeSalePrice: item[`BernhardtWholeSalePrice${i}`],
      //           patt: item[`BernhardtPatt${i}`]
      //         }
      //       ];
      //     }
  
      //     return item = {...item, itemStocks: itemStock}
  
      //   });
  
  
      // }
  
  
      this.setState({
        items: items,
        currentTarget: ''
      });
      // console.log(items);
  
      // this.props.filterList(items);
  
      // this.setState({
      //   items: this.props.listData
      // });
  
  
    };
  
    private hasText = (item, text: string): boolean => {
      if(`${item.BernhardtLoadDate}|${item.Title}|${item.BernhardtBookNumber}|${item.BernhardtInlandCarrier}|${item.BernhardtFreightForwarder}|${item.BernhardtSailDate}|${item.BernhardtSteamLine}|${item.BernhardtVessel}`.indexOf(text) > -1){
        return true;
      } else if(`${item.BernhardtLoadDate}|${item.Title}|${item.BernhardtBookNumber}|${item.BernhardtInlandCarrier}|${item.BernhardtFreightForwarder}|${item.BernhardtSailDate}|${item.BernhardtSteamLine}|${item.BernhardtVessel}`.toLowerCase().indexOf(text) > -1){
        return true;
      } else {
        return false;
      }
    }
}

const mapStateToProps = (state, ownProps) => {
   // console.log(Object.keys(state.representativeRolodex.list).map(item => state.representativeRolodex.list[item]));
   return ({
      listData: Object.keys(state.trafficReducer.list).map(item => state.trafficReducer.list[item])
   });
}

export default connect(mapStateToProps, { fetchList })(ListsComponent)