Feature: Insert a settings object into DynamoDB?
  Handle a request and instert a settings object into the DB

  Scenario: Inserting a settings object into DynamoDB
    Given an event payload with a settings object as the body
    When the settings object is passed to the lambda 
    Then the object is in the DynamoDB