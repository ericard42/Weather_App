
# Weather App



## Tech Stack

**Client:** React, NextJS

**Server:** Node, NestJS

**Database:** SQLite

I used NestJS for the back, even it was not the better choice,
because I already did a backend with it, but I never did a frontend.
So I did this to better learn the NextJS technology used in front.

For the Database, I used SQLite, because I don't think a bigger
one would have been useful for the scale of this application.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

Create .env in back and front folder from the env.templates.

To use the back, you need an API Key from [here](https://positionstack.com/quickstart) (Free until 25000 requests)

**Back :**

`API_KEY` : Key obtained from positionstack

**Front :**

`NEXT_PUBLIC_BACK_HOST` : Ip of the hosting machine of the back


## Running App

To run the app, run the following command from the root

Install dependencies :
```bash
  npm install
  npm run install_dep
```

Run the back and front:
```bash
  npm run both
```