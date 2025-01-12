import { referenceAuth } from '@aws-amplify/backend';

export const auth = referenceAuth({
  userPoolId: 'sa-east-1_PaBdaNV54',
  identityPoolId: 'sa-east-1:82f9dfa8-53c9-4fb4-a46c-1d69cab53658',
  authRoleArn: 'arn:aws:iam::582274472885:role/service-role/amplify',
  unauthRoleArn: 'arn:aws:iam::582274472885:role/service-role/amplify',
  userPoolClientId: '6qetjhj54tk09osmfk2isja7jm',
});
