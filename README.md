# Webscraper-Accessbank

This web application is responsible for scraping access bank website and retrieving the transactions of an individual for 60 days.

### Technologies

1. Python FastAPI
2. MongoDB database
3. JavaScript React JS

#### Set up a virtual environment for the project:

`python3 -m venv virtualenv`

#### Activate the environment:

`source virtualenv/bin/activate`

#### Install the dependencies:

`pip install -r requirements.txt`

## Backend operations

#### In line 9 of account_scraper.py, replace the driver path with the directory of your chromedriver.

#### Run the API with Uvicorn:

`uvicorn src.main:app --reload`

#### Hit the unprotected endpoint with cURL:

`curl localhost:8000/`
`curl localhost:8000/api/register`
`curl localhost:8000/api/login`

#### Hit the protected endpoint with cURL to get a 403:

`curl localhost:8000/api/scraper`

#### Register a user:

`curl --header "Content-Type: application/json" --request POST --data '{"fullname": "John Doe", "email":"johndoe@gmail.com", "password": "secretpassword"}' localhost:8000/api/register`

#### Login and get a token:

`curl --header "Content-Type: application/json" --request POST --data '{"email": "johndoe@gmail.com", "password": "secretpassword"}' localhost:8000/api/login`

#### Then use that token as an auth header to get a valid response from the protected endpoint:

`curl --header "Authorization: Bearer <TOKEN>" localhost:8000/api/scraper`

## Frontend Operations

#### From the root directory, cd into frontend

Then run `npm install` this would install all the react dependecies.
Then run `npm start` to run on browser.
