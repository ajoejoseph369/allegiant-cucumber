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
      | origin              | destination                       |
      | Asheville, NC (AVL) | Daytona Beach / Sanford, FL (SFB) |
      # | Akron-Canton, OH (CAK) | Las Vegas, NV (LAS)               |

  Scenario: The user continues with the flight booking
    Given user is on the flight results page
    When user is displayed with flight details
    Then user clicks continue

  Scenario: The user selects bundles
    Given user is on the bundles page
    When user is displayed with bundle options
    Then user selects <bundle_type> as bundle

    Examples:
      | bundle_type |
      # | bonus       |
      # | basic       |
      | total       |

  Scenario: The user fills in passenger details
    Given user is on the passenger details page
    When user enters details and clicks continue
    Then user is redirected to the next page

  Scenario: The user has to select available seats
    Given user is on the seats page
    When user selects a <seat> seat
    Then user selects a <seat> seat for return journey
    Then user clicks continue to go to bags page

    Examples:
      | seat    |
      | Economy |

  Scenario: The user has to select bags and extras
    Given user is on the bags page
    When user selects <carry_on> carry-on bags and <checked_in> checked-in bags
    When user clicks continue on bags page
    Then user is redirected to hotels page

    Examples:
      | carry_on | checked_in |
      |        1 |          2 |

  Scenario: The user has to select hotels
    Given user is on the hotels page
    When user clicks on continue on hotels page
    Then user is redirected to cars page

  Scenario: The user has to select cars
    Given user is on the cars page
    When user clicks on continue on cars page
    Then user is redirected to Payments page

  Scenario: The user is displayed with payment information
    Given user is on the payments page
    Then user is displayed with the payment details
