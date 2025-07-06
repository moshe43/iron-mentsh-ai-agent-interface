# Frontend Application

A simple web application with API integration using Pipedream webhooks.

## Features

- Clean, responsive design
- Form data submission to Pipedream webhook
- Real-time response display
- Input validation
- Error handling
- Mobile-friendly interface

## Files

- `index.html` - Main HTML structure
- `styles.css` - CSS styling and responsive design
- `script.js` - JavaScript functionality and API integration
- `README.md` - This documentation

## Setup

1. Clone or download this repository
2. Update the webhook URL in `script.js` if needed
3. Open `index.html` in a web browser
4. Fill out the form and submit to test the webhook integration

## Webhook Integration

The application sends form data to a Pipedream webhook endpoint:

```javascript
const WEBHOOK_URL = 'https://eo1t8nbql9lyw2b.m.pipedream.net';
```

The webhook receives a JSON payload with:
- `name` - User's name
- `email` - User's email
- `message` - User's message
- `timestamp` - ISO timestamp of submission

## Usage

1. Open `index.html` in a web browser
2. Fill out the form with your information
3. Click "Submit" to send data to the webhook
4. View the response in the response section

## Customization

You can customize the application by:
- Modifying the CSS in `styles.css`
- Adding new form fields in `index.html`
- Extending the JavaScript functionality in `script.js`
- Updating the webhook URL for your specific endpoint

## Browser Support

This application works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is open source and available under the [MIT License](LICENSE).