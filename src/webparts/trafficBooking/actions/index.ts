import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http'; 
import { Web, List, ItemAddResult, AttachmentFileInfo, sp } from "sp-pnp-js/lib/pnp";
import { AttachmentFiles } from 'sp-pnp-js/lib/sharepoint/attachmentfiles';


export const addItem = ( appUrl, item, filesToSubmit?) => async dispatch => {
   const web: Web = new Web(appUrl);
   let responseWithKey = {};
   let promise = undefined;
   // console.log(item);
   // return;   
   // delete item.currentPerson;
   // let itemStocks = [...item.itemStocks];   
   // let newAttachmentFiles = [...item.AttachmentFiles];
   // if(item.AttachmentFiles) delete item.AttachmentFiles;
   // if(item.Attachments) delete item.Attachments;
   // console.log(newAttachmentFiles);
   // console.log(item);

   const newItem = {
      ...item,
      // AttachmentFiles: [...item.AttachmentFiles]
   };
   
   console.log(newItem);

   await new Web(appUrl).lists.getByTitle('Traffic Booking Sheet').items.add({
      ...newItem
   })
   .then( async r => {
      // console.log(r.data);
      console.log(r);
      promise = r;
      let files: AttachmentFileInfo[] = [];
      let submittedFiles = [...files];
      // this will add an attachment to the item we just created
      
      filesToSubmit.map(file => {
         // console.log(file);
         files.push({name: file.name, content: file});

      });
      // console.log(files);
      // console.dir(files[0]);
      // r.item.attachmentFiles.add(files[0].name, files[0]);
      if(filesToSubmit){
         await r.item.attachmentFiles.addMultiple(files)
         // .then(response => console.log(response));
   
         .then( resObj => {
            console.log(resObj);
            
         })
         .catch(err => console.log(err.message));
   
      } 

      responseWithKey = { 
         ...r.data, 
         key: r.data.Id.toString(),
      };
      
   })
   
   .catch(err => console.log(err));
   // console.log(response);

   
   dispatch({
      type: `ADD_ITEM`,
      payload: responseWithKey
   });
   
   return promise as Promise<any>;
   
};

export const editItem = (appUrl, item, id, filesToSubmit, fileNamesToDelete) => async dispatch => {
   // new Web(appUrl).lists.getByTitle('MainOddtock').fields.get()
   // .then( res => console.log(res));


   // let newAttachmentFiles = [...item.AttachmentFiles];
   if(item.AttachmentFiles) delete item.AttachmentFiles;
   // if(item.Attachments) delete item.Attachments;
   if(item.key) delete item.key;
   // console.log(newAttachmentFiles);
   console.log(item);

   let responseWithKey = {};
   let promiseItem = undefined;
   // console.log(options);
   // console.log(options.Id);
   // return;
   const newItem = {
      ...item,
   }

   // console.log(newItem);
   await new Web(appUrl).lists.getByTitle('Traffic Booking Sheet').items.getById(id).update({
      ...newItem      
   })
   .then(async (i) => {
      console.log(`Successfully updated`, i);
      // responseWithKey = {...i};
      promiseItem = i;

      let files: AttachmentFileInfo[] = [];
      let stringNamesToDelete = '';
      fileNamesToDelete.forEach(file => {
         if(file === fileNamesToDelete[fileNamesToDelete.length - 1]){
            stringNamesToDelete += file;            
            return;
         }
         stringNamesToDelete += file+ ',';
      });
      // this will add an attachment to the item we just created

      console.log(fileNamesToDelete);
      console.log(filesToSubmit);
      console.log(i);
      
      filesToSubmit.map(file => {
         // console.log(file);
         files.push({name: file.name, content: file});

      });
      // console.log(files);
      // console.dir(files[0]);
      // r.item.attachmentFiles.add(files[0].name, files[0]);
      if(filesToSubmit.length){
         await new Web(appUrl).lists.getByTitle('Traffic Booking Sheet').items.getById(id).attachmentFiles.addMultiple(files)
         // .then(response => console.log(response));

         .then( resObj => {
            console.log(resObj);
            
         }).catch(err => console.log(err.message));
      }

      if(stringNamesToDelete !== ''){
         await new Web(appUrl).lists.getByTitle('Traffic Booking Sheet').items.getById(id).attachmentFiles.deleteMultiple(stringNamesToDelete)
         // .then(response => console.log(response));
   
         .then( resObj => {
            console.log(resObj);
            
         }).catch(err => console.log(err.message));
      }
      
      
   })
   .catch(err => console.log(err));

   
   const optionsWithKey = { 
      ...item, 
      key: item.Id.toString(),
   }
   // console.log(optionsWithKey);

   dispatch({
      type: `EDIT_ITEM`,
      payload: optionsWithKey
   });

   return promiseItem as Promise<any>;
};

export const deleteItem = (
   {stateProperty, appName, newItem = [], selectedPlant = ''}
   ) => async dispatch => {
   const data = await {
      propertyName: stateProperty,
      newItem,
      appName,
      selectedPlant
   };

   dispatch({
      type: `DELETE_ITEM`,
      payload: data
   });
};


export const readItem = (appUrl, appName = '', id, options?) => async dispatch => {
   // new Web(appUrl).lists.getByTitle('MainOddtock').fields.get()
   // .then( res => console.log(res));
   // alert(appName);
   let item = {};
   // await new Web(appUrl).lists.getByTitle('Traffic Booking Sheet').items.getById(id).select().get()
   await new Web(appUrl).lists.getByTitle('Traffic Booking Sheet').items.getById(id).select().expand('AttachmentFiles').get()
      .then(
         (i): void => {
            // console.log(i);
            
            item = {
               ...i, 
               key: i.Id.toString(),
               CWLoadTime0: {key: i.CWLoadTime0 ? i.CWLoadTime0 : '', text: i.CWLoadTime0 ? i.CWLoadTime0 : 'Please select a time'},
               PLT2LoadTime0: {key: i.PLT2LoadTime0 ? i.PLT2LoadTime0 : '', text: i.PLT2LoadTime0 ? i.PLT2LoadTime0 : 'Please select a time'},
               PLT9LoadTime0: {key: i.PLT9LoadTime0 ? i.PLT9LoadTime0 : '', text: i.PLT9LoadTime0 ? i.PLT9LoadTime0 : 'Please select a time'},
               CWArrivalTime0: {key: i.CWArrivalTime0 ? i.CWArrivalTime0 : '', text: i.CWArrivalTime0 ? i.CWArrivalTime0 : 'Please select a time'},
               PLT2ArrivalTime: {key: i.PLT2ArrivalTime ? i.PLT2ArrivalTime : '', text: i.PLT2ArrivalTime ? i.PLT2ArrivalTime : 'Please select a time'},
               PLT9ArrivalTime0: {key: i.PLT9ArrivalTime0 ? i.PLT9ArrivalTime0 : '', text: i.PLT9ArrivalTime0 ? i.PLT9ArrivalTime0 : 'Please select a time'},
               CWDepartureTime0: {key: i.CWDepartureTime0 ? i.CWDepartureTime0 : '', text: i.CWDepartureTime0 ? i.CWDepartureTime0 : 'Please select a time'},
               PLT2DepartureTime0: {key: i.PLT2DepartureTime0 ? i.PLT2DepartureTime0 : '', text: i.PLT2DepartureTime0 ? i.PLT2DepartureTime0 : 'Please select a time'},
               PLT9DepartureTime0: {key: i.PLT9DepartureTime0 ? i.PLT9DepartureTime0 : '', text: i.PLT9DepartureTime0 ? i.PLT9DepartureTime0 : 'Please select a time'}
            };
            
      })
      .catch(err => console.log(err));

   dispatch({
      type: `READ_ITEM`,
      payload: item
   });

   return item as Promise<any>;
};



export const fetchList = (appUrl, appName, options?) => async dispatch => {

   let data = {};
   let dataLength = 0;
   await new Web(appUrl).lists.getByTitle('Traffic Booking Sheet')
   .items.top(500).select().getPaged()
   // .items.select().get()
   .then((items): void => {
      // console.log(`Successfully loaded ${items.length} items`, items);
      dataLength += items.results.length;
      for(let item of items.results){
         // let BernhardtSalesRepresentatives = [];
         // for(let i = 1; i <= 8; i++){
         //    BernhardtSalesRepresentatives = [
         //       ...BernhardtSalesRepresentatives,
         //       {
         //          BernhardtName: item[`BernhardtName${i}`],
         //          BernhardtPhone: item[`BernhardtPhone${i}`],
         //          BernhardtEmail: item[`BernhardtEmail${i}`]                  
         //       }
         //    ];
         // }
         // // return {...formData, itemStocks: [...itemStock]};
         // // console.log(item);
         // // console.log(stocks);

         // let representatives = JSON.parse(item.BernhardtSalesRepresentatives);
         // let BernhardtSalesRepresentatives = representatives.items.filter(item => {
         //    return item.BernhardtName !== null || item.BernhardtPhone !== null || item.BernhardtEmail !== null;
         // })

         data = { 
            ...data, 
            [item.Id]: {
               ...item, key: item.Id.toString(), 
               // BernhardtSalesRepresentatives: [...BernhardtSalesRepresentatives],
               // BernhardtSalesManagersId: { personID: items.BernhardtSalesManagersId, personName: 'Looking up...'}, 
               // BernhardtCredit_x0020_ContactId: { personID: items.BernhardtCredit_x0020_ContactId, personName: 'Looking up...'},
               // BernhardtCredit_x0020_ManagerId: { personID: items.BernhardtCredit_x0020_ManagerId, personName: 'Looking up...'}
            }
            // ['34']: {
            //    ...item, key: item.Id.toString(), 
            //    BernhardtSalesRepresentatives: [...BernhardtSalesRepresentatives],
            //    BernhardtSalesManagersId: { personID: 174, personName: 'Looking up...'}, 
            //    BernhardtCredit_x0020_ContactId: { personID: items.BernhardtCredit_x0020_ContactId, personName: 'Looking up...'},
            //    BernhardtCredit_x0020_ManagerId: { personID: items.BernhardtCredit_x0020_ManagerId, personName: 'Looking up...'}
            // }
         }
    
         

      }
      // console.log(items)
      if(items.hasNext) {  


         // Initialize the recursive function
         const recursion = (repeatCall: boolean, objectToCall) => {
            if(repeatCall){
               objectToCall.getNext()
                  .then(resObj => {
                     dataLength += resObj.results.length;

                     for(let obj of resObj.results){

                        data = { 
                           ...data, 
                           [obj.Id]: {
                              ...obj, key: obj.Id.toString(), 
                           }
                        }
                     }
                     dispatch({
                        type: `FETCH_LIST`,
                        payload: data
                     });

                     if(resObj.hasNext){
                        recursion(resObj.hasNext, resObj);
                     }
                     // console.log(dataLength);

                  })
                  .catch(err => console.log( err.message ));
            }
         };
       

         // Invoked the recursive function
         recursion(items.hasNext, items);

      }
       
      

      /**
       * Legacy recursive call
       */
      // if(items['@odata.nextLink']) {
   
   
      //    // Initialize the recursive function
      //    const recursion = async (nextPage) => {
      //       await new Web(nextPage).lists.getByTitle('Traffic Booking Sheet')
      //       .items.top(500).select().get()
      //       .then(recursiveResponse => {
      //          console.log(recursiveResponse)
              
      //          if(recursiveResponse['@odata.nextLink']){
      //             recursion(recursiveResponse['@odata.nextLink']);
      //          }

      //       })
      //       .catch(err => {
      //          console.log(err);
      
      //       });
      
      //    };

      //    // Invoked the recursive function
      //    recursion(items['@odata.nextLink']);

      // }
       


   })
   .catch(err => console.log(err));

   dispatch({
      type: `FETCH_LIST`,
      payload: data
   });
};


export const filterList = (filteredItems) => dispatch => {
   console.log('Filter items invoked');


   let filteredDataItems = {};
   for(let item of filteredItems){
      console.log(item);
      filteredDataItems = {...filteredDataItems, [item.Id]: {...item, key: item.Id}};
   }

   // console.log(filteredDataItems);



   dispatch ({
      type: 'FILTER_ITEMS',
      payload: filteredItems
   });
}

const oddStockActions = {
   readItem,
   addItem,
   editItem,
   deleteItem,
   fetchList,
   filterList
};

export default oddStockActions;
