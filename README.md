
# SF Hacks 2024 API


This API is designed to oversee the registration process and automated email functionalities for SF Hacks 2024.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

- `PORT`
- `EMAIL_PASSWORD_KEY`
- `EMAIL_ACCOUNT`
- `TYPEFORM_SIGNING_SECRET`
- `SMTP_SERVER`
- `EMAIL_PORT` 


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd sfhacks2024-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## API Reference

#### Confirm registeration received
Sends an email confirming that the recepients application has been sent. Only Typeform webhooks are allowed to access the route.
```http
  POST /webhooks/confirm-registeration-application-received
```

| Header   | Description                |
| :-------- | :------------------------- |
| `typeform-signature` |  **Required**. Typeform form signature key |

#### Confirm intent to attend
Confirms the participant with the given `id` in DB passed will be attending.
```http
  POST /confirm-attendence-intent/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of registerant attending |

#### Check-in
Displays a web page containing the name, email, and participation type of the participant with the provided id.
```http
  GET /check-in/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of registerant to view |