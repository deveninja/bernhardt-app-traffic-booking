import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import routerWrapper from './components/routerWrapper';
import * as strings from 'TrafficBookingWebPartStrings';
import TrafficBooking from './components/TrafficBooking';
import { ITrafficBookingProps } from './components/ITrafficBookingProps';
import  configureStore  from './store';

export interface ITrafficBookingWebPartProps {
  description: string;
  context: IWebPartContext;

}

const store = configureStore();

export default class TrafficBookingWebPart extends BaseClientSideWebPart<ITrafficBookingWebPartProps> {

  public render(): void {
    const element: React.ReactElement<any> = React.createElement(
      routerWrapper,
      {
        description: this.properties.description,
        context: this.context,
        store: store,
        appUrl: this.context.pageContext.web.absoluteUrl,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
