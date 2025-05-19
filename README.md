☁️ Cloud Assistant AI A serverless conversational AI web application built with AWS Amplify, Amazon Lex, AWS Lambda, and React. This assistant enables users to interact with AWS services using natural language, performing operations such as listing EC2 instances, describing S3 buckets, and more — all via a chatbot interface.

🔧 Tech Stack Layer Technology Frontend React.js + AWS Amplify Backend Node.js (AWS Lambda functions) Auth Amazon Cognito AI Bot Amazon Lex API Layer AWS AppSync (GraphQL) Database Amazon DynamoDB Hosting AWS Amplify Hosting (CI/CD integrated from GitHub)

📐 Architecture Overview Frontend (React + Amplify): Provides the chatbot UI and interfaces with Amazon Lex.

Amazon Lex: Powers the conversational interface with natural language understanding.

AWS Lambda: Handles fulfillment logic and interacts with AWS services.

Amazon AppSync (GraphQL): Manages data and state persistence.

Amazon Cognito: Manages user sign-up, login, and secure authentication.

Amazon DynamoDB: Stores user preferences, logs, and conversation history.

Amplify Hosting: Enables CI/CD workflows with GitHub integration.

📌 Diagram: (Insert architecture diagram here once available)

🚀 Setup Instructions

Clone the Repository bash Copy Edit git clone https://github.com/HamzehSayeh/cloud-assistant-ai.git cd cloud-assistant-ai

Install Dependencies bash Copy Edit npm install

Amplify CLI Configuration bash Copy Edit npm install -g @aws-amplify/cli amplify configure Follow CLI prompts to link your AWS account and set up credentials.

Initialize Amplify Project bash Copy Edit amplify init amplify push

Start the App bash Copy Edit npm start 🧠 Amazon Lex Bot The Lex bot includes custom intents to handle AWS-related tasks:

ListEC2InstancesIntent

DescribeS3BucketsIntent

CheckLambdaFunctionsIntent

(Add your custom intents here...)

💡 Each intent is connected to a Lambda function for fulfillment.

🛡️ Authentication Implemented using Amazon Cognito with:

User sign-up/login

Password reset

JWT token-based access to GraphQL API

Secure role-based access via IAM

📁 File Structure bash Copy Edit /src /components → React components /graphql → GraphQL schema and queries /amplify /backend → Amplify backend resources (Auth, API, Functions) /team-provider → Configuration for multi-dev environments 🧪 Example Usage Chatbot Prompt: "List my EC2 instances"

Response: "You have 3 EC2 instances running in us-east-1 region."

🧾 API Reference See /src/graphql for details on the GraphQL schema used with AWS AppSync. Typical queries and mutations include:

graphql Copy Edit query ListLogs { listLogs { items { timestamp message } } } 🛠️ IAM & Team Setup See IAM Setup Guide (or add a link to your markdown guide or wiki)

Includes:

Securing root account with MFA

IAM roles for Lambda & Lex

IAM groups for Frontend, Backend, and DevOps

Programmatic users for Amplify CLI
