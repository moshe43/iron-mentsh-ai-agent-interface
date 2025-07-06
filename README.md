# AI Agent Interface

A modern, responsive web interface for interacting with AI agents through Pipedream webhooks.

## Features

- **Real-time Chat Interface**: Clean, modern chat UI with message history
- **Multiple AI Models**: Support for GPT-4, GPT-3.5, Claude, and other models
- **Customizable Settings**: Adjustable creativity/temperature settings
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Session Statistics**: Track messages and token usage
- **Error Handling**: Robust error handling and user feedback
- **Conversation History**: Maintains context across multiple messages

## Files

- `index.html` - Main HTML structure and layout
- `styles.css` - Modern CSS with responsive design and animations
- `script.js` - JavaScript for AI agent interaction and UI management
- `README.md` - This documentation

## Setup

1. **Deploy to Netlify or GitHub Pages**:
   - Fork or clone this repository
   - Connect to your hosting platform
   - The files are pre-configured for static hosting

2. **Configure Webhook URL**:
   - Update the webhook URL in the JavaScript if needed
   - Current webhook: `https://eo1t8nbql9lyw2b.m.pipedream.net`

3. **Test the Interface**:
   - Open the deployed URL in your browser
   - Start chatting with the AI agent

## Webhook Integration

The interface sends POST requests to the configured webhook endpoint with the following JSON structure:

```json
{
  "message": "User's message",
  "model": "gpt-4",
  "temperature": 0.7,
  "conversationHistory": [...],
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

Expected response format:
```json
{
  "response": "AI agent's response",
  "tokens": 150,
  "model": "gpt-4"
}
```

## Customization

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- The CSS uses CSS Grid and Flexbox for responsive design
- Custom properties (CSS variables) for easy theme customization

### Functionality
- Extend `script.js` to add new features
- Modify the AI model options in the HTML
- Add new settings and controls as needed

### Deployment
- The files are optimized for static hosting
- No server-side processing required
- Works with Netlify, Vercel, GitHub Pages, etc.

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight and fast loading
- Efficient message handling
- Minimal external dependencies
- Optimized for mobile devices

## Security

- No sensitive data stored locally
- Secure HTTPS communication
- Input validation and sanitization
- XSS protection

## Troubleshooting

### Common Issues

1. **Webhook not responding**:
   - Check the webhook URL is correct
   - Verify the webhook is active in Pipedream
   - Check browser console for errors

2. **Messages not displaying**:
   - Ensure JavaScript is enabled
   - Check for console errors
   - Verify HTML structure is intact

3. **Mobile display issues**:
   - Clear browser cache
   - Check viewport meta tag
   - Verify responsive CSS is loading

### Development

For local development:
1. Clone the repository
2. Open `index.html` in a web browser
3. Use browser developer tools for debugging
4. Test webhook integration with a local server

## License

MIT License - Feel free to use and modify for your projects.

## Support

For issues or questions:
- Check the browser console for error messages
- Review the webhook configuration
- Verify all files are properly uploaded and accessible