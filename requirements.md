# Crypto Tracker Software Requirements

### Vision
The vision of this product is to provide crypto currency information per coin and allow a user to specify what coin information is relevent to them and save these preferences to their account.

A pain point that this product solves is the difficulty to manage several sources of information.

With crypto just getting started, our product will aid in the management and monitoring of a wide variety of crypto related data to ensure you are on top of the latest info.

### Scope (In/Out)
##### IN
- This web app will allow users to search for news and prices per coin.
- Authenticated users will be able to save which coins they would like to track, and customize the information that they see per coin tracked.
- Auth0 authentication
- Mobile ready - will render on mobile devices

##### OUT
- We will not handle user wallet keys.
- Users will not be able to send/receive crypto transactions through the app.

### Minimum Viable Product
- Auth0 integration
- A database to store users' saved coins preferences
- Server caching
- Unathenticated users can search for one coin price at a time and also see general news.
- Authenticated users can save tracked coins and prefered information e.g. news (stretch: social).

### Functional Requirements
- A user can update which coins they want to track.
- A user can update what preferred information they want to track per coin.
- An unauthenticated user can search for a coin.

### Non-Functional Requirements
- Security: We will be using Auth0
- Auth0 for user management
- We will use Cypress for testing.