import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { emailVerifyFields, emailVerifyOperations } from './EmailListVerifyDescription';

export class EmailListVerify implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'EmailListVerify',
		name: 'emailListVerify',
		icon: 'file:emaillistverify.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Verify email deliverability using EmailListVerify API',
		defaults: {
			name: 'EmailListVerify',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'emailListVerifyApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.emaillistverify.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Email Verify',
						value: 'emailVerify',
					},
				],
				default: 'emailVerify',
			},
			...emailVerifyOperations,
			...emailVerifyFields,
		],
	};
}
