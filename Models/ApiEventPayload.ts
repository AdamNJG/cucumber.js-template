type JSON = ApiEventPayload

type Nullable<T> = T | undefined | null;

export class ApiEventPayload {

  constructor(httpMethod: string, resource: string, payload?: object, queryStringParams?: object[] ){
    this.resource = `/${resource}`;
    this.path = `/${resource}`;
    this.httpMethod = httpMethod;
    this.headers = new Headers(httpMethod);
    this.multiValueHeaders = new MultiValueHeaders(httpMethod);
    this.queryStringParameters = queryStringParams ? new QueryStringParameters() : null;
    this.multiValueQueryStringParameters = queryStringParams ? new MultiValueQueryStringParameters() : null;
    this.pathParameters = null;
    this.stageVariables = null;
    this.requestContext = new RequestContext();
    this.body = payload;
    this.isBase64Encoded = false;
  }

  resource: string;
  path: string;
  httpMethod: string;
  headers: Headers;
  multiValueHeaders: MultiValueHeaders;
  queryStringParameters: Nullable<QueryStringParameters>;
  multiValueQueryStringParameters: Nullable<MultiValueQueryStringParameters>;
  pathParameters: any;
  stageVariables: any;
  requestContext: RequestContext;
  body: any;
  isBase64Encoded: boolean;
}

class Headers {

  constructor(httpMethod: string){
    this.Accept = "*/*";
    this["Accept-Encoding"] = "gzip, deflate, br";
    this["CloudFront-Forwarded-Proto"] = "https";
    this["CloudFront-Is-Desktop-Viewer"] = "true";
    this["CloudFront-Is-Mobile-Viewer"] = "false";
    this["CloudFront-Is-SmartTV-Viewer"] = "false";
    this["CloudFront-Is-Tablet-Viewer"] = "false";
    this["CloudFront-Viewer-Country"] = "GB";
    if(httpMethod.includes("POST")){
      this["Content-Type"] = "application/json"
    }
  }

  Accept: string;
  "Accept-Encoding": string;
  "CloudFront-Forwarded-Proto": string;
  "CloudFront-Is-Desktop-Viewer": string;
  "CloudFront-Is-Mobile-Viewer": string;
  "CloudFront-Is-SmartTV-Viewer": string;
  "CloudFront-Is-Tablet-Viewer": string;
  "CloudFront-Viewer-Country": string;
  "Content-Type": string;
  Host: string;
  "Postman-Token": string;
  "User-Agent": string;
  Via: string;
  "X-Amz-Cf-Id": string;
  "X-Amzn-Trace-Id": string;
  "X-Forwarded-For": string;
  "X-Forwarded-Port": string;
  "X-Forwarded-Proto": string;
}

class MultiValueHeaders {

  constructor(httpMethod: string){
    this.Accept = ["*/*"];
    this["Accept-Encoding"] = ["gzip, deflate, br"];
    this["CloudFront-Forwarded-Proto"] = ["https"];
    this["CloudFront-Is-Desktop-Viewer"] = ["true"];
    this["CloudFront-Is-Mobile-Viewer"] = ["false"];
    this["CloudFront-Is-SmartTV-Viewer"] = ["false"];
    this["CloudFront-Is-Tablet-Viewer"] = ["false"];
    this["CloudFront-Viewer-Country"] = ["GB"];
    if(httpMethod.includes("POST")){
      this["Content-Type"] = ["application/json"]
    }
  }

  Accept: string[];
  "Accept-Encoding": string[];
  "CloudFront-Forwarded-Proto": string[];
  "CloudFront-Is-Desktop-Viewer": string[];
  "CloudFront-Is-Mobile-Viewer": string[];
  "CloudFront-Is-SmartTV-Viewer": string[];
  "CloudFront-Is-Tablet-Viewer": string[];
  "CloudFront-Viewer-Country": string[];
  Host: string[];
  "Content-Type": string[];
  "Postman-Token": string[];
  "User-Agent": string[];
  Via: string[];
  "X-Amz-Cf-Id": string[];
  "X-Amzn-Trace-Id": string[];
  "X-Forwarded-For": string[];
  "X-Forwarded-Port": string[];
  "X-Forwarded-Proto": string[];
}

class QueryStringParameters {
  morestuff: string;
  stuff: string;
}

class MultiValueQueryStringParameters {
  Object: string[];
  stuff: string[];
}

class RequestContext {
  resourceId: string;
  resourcePath: string;
  httpMethod: string;
  extendedRequestId: string;
  requestTime: string;
  path: string;
  accountId: string;
  protocol: string;
  stage: string;
  domainPrefix: string;
  requestTimeEpoch: number;
  requestId: string;
  identity: Identity;
  domainName: string;
  apiId: string;
}

class Identity {
  cognitoIdentityPoolId: any;
  accountId: any;
  cognitoIdentityId: any;
  caller: any;
  sourceIp: string;
  principalOrgId: any;
  accessKey: any;
  cognitoAuthenticationType: any;
  cognitoAuthenticationProvider: any;
  userArn: any;
  userAgent: string;
  user: any;
}
