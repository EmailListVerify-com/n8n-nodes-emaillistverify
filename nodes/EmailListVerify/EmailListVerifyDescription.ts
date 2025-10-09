import { INodeProperties } from 'n8n-workflow';

export const emailVerifyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['emailVerify'],
			},
		},
		options: [
			{
				name: 'Simple Check',
				value: 'simpleCheck',
				description: 'Quick email verification (returns deliverability status)',
				action: 'Perform a simple email verification',
				routing: {
					request: {
						method: 'GET',
						url: '/api/verifyEmail',
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ { "email": $parameter.email, "status": $response.body } }}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Detailed Check',
				value: 'detailedCheck',
				description: 'Comprehensive email verification with metadata (ESP, MX server, role detection, etc.)',
				action: 'Perform a detailed email verification',
				routing: {
					request: {
						method: 'GET',
						url: '/api/verifyEmailDetailed',
					},
				},
			},
		],
		default: 'simpleCheck',
	},
];

// Fields shown for both Simple and Detailed Check operations
const commonFields: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'john.smith@example.com',
		description: 'The email address to verify',
		displayOptions: {
			show: {
				resource: ['emailVerify'],
				operation: ['simpleCheck', 'detailedCheck'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'email',
			},
		},
	},
];

// Additional information fields for Simple Check
const simpleCheckFields: INodeProperties[] = [
	{
		displayName: 'Additional Information',
		name: 'additionalInfo',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['emailVerify'],
				operation: ['simpleCheck'],
			},
		},
		typeOptions: {
			containerClass: 'notice-info',
		},
	},
];

// Additional information fields for Detailed Check
const detailedCheckFields: INodeProperties[] = [
	{
		displayName: 'Additional Information',
		name: 'additionalInfo',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['emailVerify'],
				operation: ['detailedCheck'],
			},
		},
		typeOptions: {
			containerClass: 'notice-info',
		},
	},
];

export const emailVerifyFields: INodeProperties[] = [
	...commonFields,
	...simpleCheckFields,
	...detailedCheckFields,
];
