# Bear Sighting Tracker

Bear sightings are on the rise nationwide. Unfortunately, there's no centralized website to upload and access bear sightings. This is a big problem!

Using Node.js, create an API that allows users to submit bear sightings as they happen and query the database for recent sightings with certain filters.

Your API should conform to the following spec:

### POST /sighting ###
Example POST body:
`{ bear_type: 'grizzly', notes: 'It was a big one!', zip_code: '90210', num_bears: 3 }`

### GET /sighting/search ###
Return an array of sightings, include a unique ID with each.
Supported query params, all optional
`start_date` (inclusive) (default: all time)
`end_date` (inclusive) (default: all time)
`bear_type` (default: all types)
`zip_code` (default: all zip codes)
`sort` (default: created timestamp, ascending. only supported value is `num_bears`)

### GET /sighting/:id ###
Return a single sighting object queried by its ID
        

##Steps to run this project:##

1. clone project
2. make sure you have mysql installed
3. run command ``` npm install ``` to install dependencies
4. run ``` npm start ``` to start the server

To the server in development mode and have nodemon watch for changes use 
``` nodemon npm start ```

To run mocha tests use 
``` npm test ```
