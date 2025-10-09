# n8n-nodes-emaillistverify

This is an n8n community node that lets you verify email addresses using the [EmailListVerify](https://emaillistverify.com) API in your n8n workflows.

EmailListVerify is an email verification and deliverability checking service that helps you validate email addresses, detect disposable emails, identify spam traps, and ensure your emails reach their intended recipients.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)
- [Version History](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Node Installation

1. Go to **Settings** > **Community Nodes** in your n8n instance
2. Select **Install**
3. Enter `n8n-nodes-emaillistverify` in the **Enter npm package name** field
4. Select **Install**

### Manual Installation

To install this node manually, navigate to your n8n installation directory and run:

```bash
npm install n8n-nodes-emaillistverify
```

## Operations

This node supports the following operations:

### Simple Check

Performs a quick email verification and returns a simple plain text status.

**Parameters:**

- `email` (required): The email address to verify

**Returns:** A single plain text string with the deliverability status:

- `ok` - Valid and deliverable
- `invalid_syntax` - Invalid email format
- `disposable` - Temporary/disposable email
- `email_disabled` - Disabled or non-existent
- `dead_server` - Domain doesn't exist or lacks MX server
- `invalid_mx` - Misconfigured MX servers
- `spamtrap` - Known spam trap
- `ok_for_all` - Domain accepts all emails
- `antispam_system` - Anti-spam protection prevented verification (no credit charged)
- `smtp_protocol` - SMTP error (no credit charged)
- `unknown` - Unknown error (no credit charged)
- `error_credit` - Insufficient credits

**Example response:** `ok` (just the plain text, not JSON)

**Credits:** 1 credit per verification

### Detailed Check

Performs a comprehensive email verification with full metadata including ESP detection, MX server information, role detection, name estimation, and more.

**Parameters:**

- `email` (required): The email address to verify

**Returns:** JSON object containing:

- `email` - Verified email address
- `result` - Deliverability status
- `internalResult` - Internal processing status
- `mxServer` - MX server hostname
- `mxServerIp` - MX server IP address
- `esp` - Email Service Provider (Google, Microsoft 365, Yahoo, etc.)
- `account` - Local part of email
- `tag` - Email tag if present
- `isRole` - Whether it's a role-based email (info@, support@)
- `isFree` - Whether it's a free email provider
- `isNoReply` - Whether it's a no-reply email
- `firstName` - Estimated first name
- `lastName` - Estimated last name
- `gender` - Estimated gender

**Credits:** 1 credit per verification

## Credentials

This node requires EmailListVerify API credentials.

### Getting Your API Key

1. Sign up for an account at [EmailListVerify](https://emaillistverify.com)
2. Navigate to the [API section](https://apps.emaillistverify.com/api) in your account
3. Copy your API key

### Configuring Credentials in n8n

1. In your n8n workflow, add the EmailListVerify node
2. Click on the **Credential to connect with** dropdown
3. Select **Create New**
4. Enter your API key
5. Click **Save**

The API key will be automatically sent in the `x-api-key` header for all requests.

## Compatibility

- n8n version: 1.0.0 or higher
- Node.js version: 20.15 or higher

## Usage

### Example Workflow 1: Simple Email Validation

Verify a single email address and route based on result:

```
1. Trigger (Webhook/Manual)
2. EmailListVerify - Simple Check
   - Email: {{$json.email}}
3. IF node - Check if result equals "ok"
   - True: Send welcome email
   - False: Log invalid email
```

### Example Workflow 2: Detailed Email Analysis

Get comprehensive information about an email:

```
1. Trigger
2. EmailListVerify - Detailed Check
   - Email: {{$json.email}}
3. Process result
   - Check if it's a role email (isRole)
   - Identify ESP
   - Extract name information
```

### Example Workflow 3: Bulk Email Verification

Verify multiple emails from a dataset:

```
1. Spreadsheet File node - Read CSV
2. Split In Batches node
3. EmailListVerify - Detailed Check
   - Email: {{$json.email}}
4. Merge node
5. Write results back to spreadsheet
```

## API Rate Limits

EmailListVerify enforces a rate limit of **15 requests per second**. Implement appropriate error handling and retry logic in your workflows.

## Credits and Pricing

- **Simple Check**: 1 credit per email
- **Detailed Check**: 1 credit per email

EmailListVerify offers:

- **On-Demand Credits**: One-time purchase, never expire
- **Subscription Credits**: Monthly allocation

Visit [EmailListVerify Pricing](https://emaillistverify.com/pricing) for more information.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [EmailListVerify Official Website](https://emaillistverify.com)
- [EmailListVerify API Documentation](https://api.emaillistverify.com/api-doc)
- [EmailListVerify Pricing](https://emaillistverify.com/pricing)

## Version History

### 0.1.0 (2025-10-09)

Initial release with the following features:

- Simple Check operation for quick email verification
- Detailed Check operation for comprehensive email analysis
- Full EmailListVerify API v1 support
- Automatic API key authentication
- Error handling for insufficient credits and invalid API keys

## License

[MIT](LICENSE.md)

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/EmailListVerify-com/n8n-nodes-emaillistverify/issues).

For EmailListVerify API support, visit [EmailListVerify Support](https://emaillistverify.com/contact).
