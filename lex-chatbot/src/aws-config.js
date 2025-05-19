import { Amplify } from 'aws-amplify';
import awsconfig from './aws-export.js';
import { fetchAuthSession } from '@aws-amplify/auth';
import AWS from 'aws-sdk';
Amplify.configure(awsconfig);
export const getLexRuntime = async () => {
  const session = await fetchAuthSession();
  const credentials = session.credentials;
  const region = awsconfig.aws_project_region || awsconfig.aws_cognito_region || "us-east-1";
  AWS.config.update({
    region,
    credentials,
  });
  return new AWS.LexRuntimeV2();
};
