# Node.js Application for Sending Email to a Bulk Audience

## Author: <a href='https://github.com/fazeel642'>Fazeel</a>

This Node.js application allows you to send emails to a bulk audience using the provided CSV file and email template.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node.js installed on your machine.
-   Access to an email service that supports SMTP.

## Installation

1. Clone this repository: `git clone https://github.com/fazeel642/mail-automate.git`
2. Navigate to the project directory: `cd mail-automate`
3. Install the dependencies: `npm install`

## Setup

1. Rename the `sample.env` file to `.env`.
2. Edit the `.env` file and provide the following details:

```
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=your_redirect_uri
REFRESH_TOKEN=your_refresh_token
EMAIL=your_email_address
IMAGE=your_image_filename
IMAGE_PATH=your_image_path
```

3. Create a CSV file named `sample.csv` or use your own CSV file with the following format:

```
email
test@test.com
another@example.com
```

## Usage

1. Customize the email template in your preferred HTML format by editing the htmlContent in app.js file.
2. Run the application: `npm start`

The application will read the email addresses from the CSV file, use the provided email template, and send emails to the bulk audience.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.MD) file for details.

---
