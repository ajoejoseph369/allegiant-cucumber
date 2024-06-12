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

  Scenario: The user is trying to book a flight
    Given user is already on the homepage
    When user selects <origin> for Departure Airport
    Then user selects <destination> for Destination Airport
    Then user selects available dates for both origin and destination
    Then user is redirected to results page

    Examples:
      | origin                 | destination                       |
      | Asheville, NC (AVL)    | Daytona Beach / Sanford, FL (SFB) |
