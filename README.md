# `Github Searcher`
<br/><br/>
### Functional Requirements
- Search api which collects data from Github.
- Clear cache api to clear the cache storage.
- Results should be fetched from the cache storage if same request is called again.
- Cache the results for atleast 2 hours.
- In the search api search text is mandatory.

<br/><br/>
### Technical Requirements
- Use ExpressJS, Typescript for creating APIs.
- Use REDIS for cache storage.
- The search api is a post request where the search text is mandatory.
- Use https://developer.github.com/v3/search/ for implementing the Github search.
- /api/search : should be used for search api.
- /api/clear-cache : should be used to clear the cache.
- Write Swagger documentation with clear description, request, response & example for the endpoints.
- Write API Flows for unit testing the API using any assertion library such as "SuperTest".
- Use modern ES6+ syntax, async/await, elegant & readable code.

<br/><br/>
## Functional Requirements
<br/><br/>

### - Search api which collects data from Github.
![Search api which collects data from Github.](http://bigjapps.com/images/Untitled-be.gif)
<br/><br/>

### - Clear cache api to clear the cache storage.
![Clear cache api to clear the cache storage.](http://bigjapps.com/images/Untitled1-be.gif)
<br/><br/>


### - Results should be fetched from the cache storage if same request is called again.
![Results should be fetched from the cache storage if same request is called again.](http://bigjapps.com/images/Untitled3-be.gif)
<br/><br/>

### - Cache the results for atleast 2 hours.
![Cache the results for atleast 2 hours.](http://bigjapps.com/images/Untitled3-be.gif)
`Note:` The above scenario is cached for 10 seconds for the sake of the documentation.:innocent:
<br/><br/>

### - In the search api search text is mandatory.
![In the search api search text is mandatory.](http://bigjapps.com/images/Untitled4-be.gif)
<br/><br/>

## Technical Requirements
<br/><br/>
### - Use ExpressJS, Typescript for creating APIs.
![Use ExpressJS, Typescript for creating APIs.](http://bigjapps.com/images/tech-be.png)

<br/><br/>
### - Use REDIS for cache storage.
![Use REDIS for cache storage.](http://bigjapps.com/images/tech1-be.png)
<br/><br/>
![Use REDIS for cache storage.](http://bigjapps.com/images/tech2-be.png)

<br/><br/>
### - Use https://developer.github.com/v3/search/ for implementing the Github search.
![Use https://developer.github.com/v3/search/ for implementing the Github search.](http://bigjapps.com/images/tech3-be.png)

<br/><br/>
### - /api/search : should be used for search api.
![/api/search : should be used for search api.](http://bigjapps.com/images/tech4-be.png)

<br/><br/>
### - /api/clear-cache : should be used to clear the cache.
![/api/clear-cache : should be used to clear the cache.](http://bigjapps.com/images/tech5-be.png)

<br/><br/>
### - Write Swagger documentation with clear description, request, response & example for the endpoints.
![Write Swagger documentation with clear description, request, response & example for the endpoints.](http://bigjapps.com/images/tech6-be.png)
<br/><br/>
![Write Swagger documentation with clear description, request, response & example for the endpoints.](http://bigjapps.com/images/tech7-be.gif)

<br/><br/>
### - Write API Flows for unit testing the API using any assertion library such as "SuperTest".
![Write API Flows for unit testing the API using any assertion library such as "SuperTest".](http://bigjapps.com/images/tech8-be.png)
<br/><br/>
![Write API Flows for unit testing the API using any assertion library such as "SuperTest".](http://bigjapps.com/images/tech9-be.gif)




<br/><br/>
### - Use modern ES6+ syntax, async/await, elegant & readable code.

So, the story goes like this:
- The app starts at index.ts and routes to Search or Clear-Cache api.
- The routes contain the redis client which adds/retrieves the data in/from the cache storage.
- A validation middleware to perform the search criteria validation.
- A cache middleware to send the data if it is already present in the cache storage.
- A github service to call the actual github api.
- The cache utility is used to set the key to store the data into the cache.
- The validation utility is a generic function to check if the request is validate and throw error.
- Supertest and Jest is used to do few unit testing of the APIs.:v:
- As shown in the gif, we have the swagger which can be used to check how/what/examples of the api requests.
<br/><br/>
### Limitations:
- Less number of type definitions. I could have used models.:disappointed:
- CORS is open to all.:no_good:

<br/><br/>
### To Run:
Just like any other react application:
- Clone the repo
- Make sure you have redis-server installed in your machine and then run > redis-server
- Make sure you have redis-cli installed in your machine and then run > redis-cli in another tab
- In another tab run > npm i
- npm run start

<br/><br/>
### Other commands:
- npm run test ( Make sure your running express server. I should have used mocks.:cold_sweat: )
- npm run lint
- npm run lint:fix
