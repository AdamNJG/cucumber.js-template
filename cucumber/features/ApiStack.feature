Feature: Does the stack get build?
  Does the stack builder, build a stack

  Scenario: Check that the ApiStack synthesizes correctly
    Given an array of four http methods
    When the stack is built
    Then there will be one ApiGateway endpoint 
    And there will be one DynamoDB table
    And the ApiGateway will have four methods