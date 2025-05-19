import React from 'react';
import ChatBot from './ChatBot';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // Recommended
import { Amplify }from 'aws-amplify';
import awsconfig from '../src/aws-export';
Amplify.configure(awsconfig);
function App() {
  return (
    <div>
      <ChatBot />
    </div>
  );
}
export default withAuthenticator(App);






