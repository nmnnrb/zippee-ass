
# zippee-Assessment
 
Table of Contents
-----------------

- [Quick start](#quick-start)
- [Prerequisites](#prerequisites)
- [Features](#features)
- [Additional features](#additional-features)
- [APIs used](#apis-used)
- [Add a test user](#add-a-test-user)

Quick start
-----------

1. Clone the repository
```bash
	git clone https://github.com/nmnnrb/zippee-ass.git
	cd zippee-ass
```
2. Install dependencies
```bash
	npm install
``` 

3. Start the development server (Vite)
```bash
	npm run dev
``` 

4. Open the app
```bash
	By default Vite serves at http://localhost:5173 — open it in your browser.
```

Prerequisites
-------------
```bash
- Node.js 18+ (LTS recommended)
- npm (comes with Node) or any compatible package manager
```


Features
--------
 
- Login: the app uses dummy credentials for authentication (use the credentials provided in the app or the `fakeAccount.js` file). A successful login grants access to the cards page.
- Cards list: the main authenticated view shows a list of cards (fetched data displayed as cards).
- Card details: open a specific card to see more details about that item (detail view or modal).
 

Additional features
-------------------
- Login screen: password show/hide toggle to help users verify their input.
- Search: search characters by word — type a keyword to filter characters/cards.
- Logout: a clear logout action to end the session and return to the login screen.
- Styling: the cards page includes improved styling for readability and accessibility.
- User-friendly flow: straightforward navigation and helpful UI states (loading, empty, error).
- Authenticated user check: routes and views check authentication state and redirect to login when necessary.


APIs used
---------
```bash
- Characters: https://swapi.dev/ — the Star Wars API (used to fetch character data displayed in the app)
- Images: https://picsum.photos/ — placeholder image service (used to provide images for cards and avatars)
```

Add a test user
---------------

To add a test user, edit the `src/fakeAccount.js` file and add a new object to the exported array. Use the terminal-style path below to locate the file in your project:

```javascript
>> src/fakeAccount.js
```
Example user entry (add this as a new line inside the array):

```javascript
{ username: "user", password: "pass123"},
```

