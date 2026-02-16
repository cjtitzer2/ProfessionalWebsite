# Formspree

## Usage in Project
Formspree provides the form backend for the Contact page. It accepts form submissions via a POST endpoint and handles email delivery without requiring server-side code.

## Integration
- File: `claytitzer_digitalresumewebsite.client/src/pages/Contact.jsx`
- Endpoint: `https://formspree.io/f/mbdaovgb` (configured and live)
- Method: `POST` with `FormData` body
- Headers: `Accept: application/json` for JSON response handling

## Form Fields
- `name` (text, required)
- `email` (email, required)
- `message` (textarea, required)

## Status Flow
```
idle → sending → success | error
```

## Error Handling
- Network failures caught with try/catch
- Non-200 responses treated as errors
- Success/error messages displayed with ARIA roles (`role="status"`, `role="alert"`)
