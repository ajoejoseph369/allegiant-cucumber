Feature: Test Allegiant website

  Scenario: Close overlay alert
    Given user is on the homepage
    When user is displayed with an overlay
    When user clicks close button
    Then overlay alert is closed

  Scenario: Accept cookies
    Given user is already on the homepage
    When user is asked to accept cookies
    When user clicks Accept cookies
    Then cookies banner is closed
