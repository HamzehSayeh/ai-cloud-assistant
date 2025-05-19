import { generateClient } from 'aws-amplify/api';
import { createConversation, listConversations } from './queries';

const client = generateClient();

export const sendMessageToGraphQL = async (text, sender) => {
  try {
    await client.graphql({
      query: createConversation,
      variables: {
        input: {
          message: text,
          sender,
          timestamp: new Date().toISOString(),
        },
      },
    });
    console.log(`[${sender}] message saved`);
  } catch (error) {
    console.error('GraphQL save error:', error);
  }
};

export const fetchUserMessages = async () => {
  try {
    const res = await client.graphql({
      query: listConversations,
    });
    const messages = res.data.listConversations.items;
    messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};
