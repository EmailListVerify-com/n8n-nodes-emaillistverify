import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class EmailListVerifyApi implements ICredentialType {
	name = 'emailListVerifyApi';
	displayName = 'EmailListVerify API';
	documentationUrl = 'https://api.emaillistverify.com/api-doc';
	icon: 'file:emaillistverify.svg' = 'file:emaillistverify.svg' as const;
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			required: true,
			typeOptions: {
				password: true,
			},
			description: 'Your EmailListVerify API key. You can find it in the <a href="https://apps.emaillistverify.com/api" target="_blank">API section</a> of your EmailListVerify account.',
		},
	];

	// Inject API key as x-api-key header
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	// Test the credential by checking available credits
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.emaillistverify.com',
			url: '/api/credits',
			method: 'GET',
		},
	};
}
