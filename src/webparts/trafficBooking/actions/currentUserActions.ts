import { Web, List, ItemAddResult, AttachmentFileInfo, sp } from "sp-pnp-js/lib/pnp";
import { resultContent } from 'office-ui-fabric-react/lib/components/FloatingPicker/PeoplePicker/PeoplePicker.scss';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export const changeName = (newName: string) => {
   return {
      type: 'CHANGE_NAME',
      payload: newName
   };
};

export const getName = (userInfo: string) => async dispatch => {
   // console.log('Getting User Name');
   const result = await userInfo;
   dispatch({
      type: 'GET_NAME',
      payload: result
   });
}; 

export const getUserGroup = (contextObj) => async dispatch => {

   let userAccessControlOption = {
      isSuperAdmin: false,
      isContriApprovers: false,
      isContri: false,
      isContriCredit: false,
      isCreatorOddStockMain: false,
      isCreatorThai: false,
      isCreatorCaseGoods: false,
      isCreatorCGDamaged: false,
      isCreatorSamples: false,
      isCreatorOddStockOffice: false,
      isContriDownDate: false,
   };

   await contextObj.spHttpClient.get(contextObj.pageContext.web.absoluteUrl + '/_api/Web/CurrentUser/Groups?$select=Title', SPHttpClient.configurations.v1)
   .then((res: SPHttpClientResponse) => res.json())
   .then(userInfo => {
      // console.log(userInfo.value);
      const FilteredData = userInfo.value.map( item => item.Title);
     
      /** Developer/Master Role */
      userAccessControlOption.isSuperAdmin = Boolean(FilteredData.indexOf("Team Site Owners") > -1);      
      // userAccessControlOption.isSuperAdmin = true;      

      /** Application Specific roles */
      userAccessControlOption.isContriApprovers       = Boolean(FilteredData.indexOf("SP_App_OutletOfficeOrdersApprovers_Contribute") > -1);
      userAccessControlOption.isContri                = Boolean(FilteredData.indexOf("SP_App_OutletOfficeOrders_Contribute") > -1); 
      userAccessControlOption.isContriCredit          = Boolean(FilteredData.indexOf("SP_App_OutletOfficeOrdersCredit_Contribute") > -1);
      userAccessControlOption.isCreatorOddStockMain   = Boolean(FilteredData.indexOf("SP_App_OutletOfficeOrdersCreatorMainOddStock_Contri") > -1);
      userAccessControlOption.isCreatorThai           = Boolean(FilteredData.indexOf("SP_App_OutletOfficeOrdersCreatorThai_Contri") > -1);
      userAccessControlOption.isCreatorCaseGoods      = Boolean(FilteredData.indexOf("SP_App_OutletOfficeOrdersCreatorCasegoods_Contri") > -1);
      userAccessControlOption.isCreatorCGDamaged      = Boolean(FilteredData.indexOf("SP_App_OutletOfficeOrdersCreatorCGDamaged_Contri") > -1);
      userAccessControlOption.isCreatorSamples        = Boolean(FilteredData.indexOf("SP_App_OutletOfficeOrdersCreatorSample_Contri") > -1);
      userAccessControlOption.isCreatorOddStockOffice = Boolean(FilteredData.indexOf("SP_App_OutletOfficeOrdersCreatorOfficeOddstock_Contri") > -1);
      userAccessControlOption.isContriDownDate        = Boolean(FilteredData.indexOf("SP_App_OutletOfficeOrdersDownDate_Contri") > -1);


      /**
       * Uncomment role to test permissions and logic inside the App
       */
      // userAccessControlOption.isContriApprovers = Boolean(FilteredData.indexOf("Team Site Owners") > -1);
      // userAccessControlOption.isContri = Boolean(FilteredData.indexOf("Team Site Owners") > -1);
      // userAccessControlOption.isContriCredit = Boolean(FilteredData.indexOf("Team Site Owners") > -1);
      // userAccessControlOption.isContriDownDate = Boolean(FilteredData.indexOf("Team Site Owners") > -1);


      // userAccessControlOption.isCreatorOddStockMain = Boolean(FilteredData.indexOf("Team Site Owners") > -1);
      // userAccessControlOption.isCreatorThai = Boolean(FilteredData.indexOf("Team Site Owners") > -1);
      // userAccessControlOption.isCreatorCaseGoods = Boolean(FilteredData.indexOf("Team Site Owners") > -1);
      // userAccessControlOption.isCreatorCGDamaged = Boolean(FilteredData.indexOf("Team Site Owners") > -1);
      // userAccessControlOption.isCreatorSamples = Boolean(FilteredData.indexOf("Team Site Owners") > -1);
      // userAccessControlOption.isCreatorOddStockOffice = Boolean(FilteredData.indexOf("Team Site Owners") > -1);

   });

   // console.log(userAccessControlOption)

   

   dispatch({
      type: 'GET_CURRENTUSER_GROUP',
      payload: userAccessControlOption
   });
}


export const getAllUsersInActiveDirectory = (contextObj) => async dispatch => {

   let userDetails = {};

   // Get All Site users
   await contextObj.spHttpClient.get(contextObj.pageContext.web.absoluteUrl + '/_api/Web/siteusers', SPHttpClient.configurations.v1)
   .then((res: SPHttpClientResponse) => res.json())
   .then(users => {
      // console.log(users.value);

      for(let item of users.value){
         // console.log(item);
         userDetails = { ...userDetails, [item.Id]: {...item} }
      }
      // console.log(userDetails);

   })
   .catch(err => console.log(err.message));

   // Get All user groups
   
   await contextObj.spHttpClient.get(contextObj.pageContext.web.absoluteUrl + `/_api/Web/SiteGroups/GetById(6)/Users`, SPHttpClient.configurations.v1)
   .then((res: SPHttpClientResponse) => res.json())
   // .then(users => console.log('All Users inside Group Team Site Owners', users))
   .then(users => {
      // console.log(users.value)
      for(let items of users.value){
         // console.log(items);
         for(let item of items){
            userDetails = { ...userDetails, [item.Id]: {...item}}
         }            
      }
   })
   .catch(err => console.log(err.message));
   

   

   // Get All current site groups
   // await contextObj.spHttpClient.get(contextObj.pageContext.web.absoluteUrl + '/_api/Web/CurrentUser/Groups', SPHttpClient.configurations.v1)
   // .then((res: SPHttpClientResponse) => res.json())
   // // .then(groupNames => console.log('All current site groups', users))
   // .then(groupNames => {
   //    groupNames.value.forEach(group => {
   //       console.log(group);
   //       // const groupEditLink = group['@odata.editLink'];
   //       userDetails = { ...userDetails, userGroups: { ...userDetails.userGroups, [group.Id]: {...group}}}
   //    })
   //    console.log(userDetails);

   // })
   // .catch(err => console.log(err.message));
   // Get All user group users
   // await contextObj.spHttpClient.get(contextObj.pageContext.web.absoluteUrl + '/_api/Web/sitegroups/Users', SPHttpClient.configurations.v1)
   // .then((res: SPHttpClientResponse) => res.json())
   // .then(users => console.log('All Site Group Users', users))
   // .catch(err => console.log(err.message))

   // Get specific user by ID
   // await contextObj.spHttpClient.get(contextObj.pageContext.web.absoluteUrl + '/_api/Web/GetUserById(2250)?&expand=true', SPHttpClient.configurations.v1)
   // .then((res: SPHttpClientResponse) => res.json())
   // .then(users => console.log('Specific User Data: ', users))
   // .catch(err => console.log(err.message));

   // Get user profile data
   // await contextObj.spHttpClient.get(contextObj.pageContext.web.absoluteUrl + '/_api/sp.userprofiles.peoplemanager', SPHttpClient.configurations.v1)
   // .then((res: SPHttpClientResponse) => res.json())
   // .then(users => console.log('User Profile Data: ', users))
   // .catch(err => console.log(err.message));

   dispatch({
      type: 'GET_ALL_ACTIVE_USERS',
      payload: userDetails
   });
}

export const getAllUsersGroups = (contextObj) => async dispatch => {

   let userDetails = {};

   // Get All current site groups
   await contextObj.spHttpClient.get(contextObj.pageContext.web.absoluteUrl + '/_api/Web/CurrentUser/Groups', SPHttpClient.configurations.v1)
   .then((res: SPHttpClientResponse) => res.json())
   // .then(groupNames => console.log('All current site groups', users))
   .then(groupNames => {
      // console.log(groupNames);
      groupNames.value.forEach(group => {
         // const groupEditLink = group['@odata.editLink'];
         userDetails = { ...userDetails, [group.Id]: {...group} };     
      })

   })

   dispatch({
      type: 'GET_ALL_USER_GROUPS',
      payload: userDetails
   });

   return userDetails as Promise<any>;
}

export const getGroupUsers = (contextObj, Id) => async dispatch => {
   let userDetails = {};
   await contextObj.spHttpClient.get(contextObj.pageContext.web.absoluteUrl + `/_api/Web/SiteGroups/GetById(${Id})/Users`, SPHttpClient.configurations.v1)
   .then((res: SPHttpClientResponse) => res.json())
   .then(response => {
      let initialUsers = {};

      for(let item of response.value){
         initialUsers = {
            ...initialUsers, 
            [item.Id]: { 
               key: item.Id, 
               imageInitials: initials(item.Title),
               imageUrl: "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona.png",
               text: item.Title, 
               isValid: true,
               presence: 3
            }
         };
      }
      userDetails = {...userDetails, ...initialUsers};
      // console.log(userDetails);
      
   })
   .catch(err => console.log(err.message));

   dispatch({
      type: 'GET_ALL_USERS_INSIDE_GROUPS',
      payload: userDetails
   });

}

function initials(name: string){
   const init = name.split(' ');
   const first = init[0].charAt(0);
   const second = init[1] ? init[1].charAt(0) : init[0].charAt(1);
   return first + second;
}