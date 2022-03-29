import { HttpMethods } from "../../../infrastructure/builders/HttpMethods";
import { ApiStackBuilder } from "../../../infrastructure/builders/ApiStackBuilder";
import { binding, given, then, when} from 'cucumber-tsflow';
import { App, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";

@binding()
export class ApiStackSteps {
    private httpMethods: string[];
    private apiStack: Stack;
    private template: Template;
  
    @given(/an array of four http methods/)
    public givenAnArrayOfHttpMethods() {
      this.httpMethods = [HttpMethods.POST, HttpMethods.GET, HttpMethods.PUT, HttpMethods.DELETE];
    }
  
    @when(/the stack is built/)
    public whenStackBuilt() {
        const app = new App();
        
        this.apiStack = new ApiStackBuilder(app, 'Settings', this.httpMethods);
        this.template = Template.fromStack(this.apiStack);
    }

    @then(/there will be one ApiGateway endpoint/)
    public CheckApiCount() {
      this.template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
    }

    @then(/there will be one DynamoDB table/)
    public CheckDbCount() {
      this.template.resourceCountIs("AWS::DynamoDB::Table", 1);
    }
  
    @then(/the ApiGateway will have four methods/)
    public CheckMethodCount(){
      this.template.resourceCountIs("AWS::ApiGateway::Method", 4);
    }

  }