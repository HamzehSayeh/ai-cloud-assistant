# ☁️ Cloud Assistant AI

**Cloud Assistant AI** is a **serverless conversational AI web application** built with **AWS Amplify**, **Amazon Lex**, **AWS Lambda**, and **React**.

It enables users to interact with AWS services using **natural language** through a chatbot interface. Users can perform operations like listing EC2 instances, describing S3 buckets, and more.

---

## 🔧 Tech Stack

| Layer         | Technology                               |
|---------------|-------------------------------------------|
| **Frontend**  | React.js + AWS Amplify                    |
| **Backend**   | Node.js (AWS Lambda functions)            |
| **Auth**      | Amazon Cognito                            |
| **AI Bot**    | Amazon Lex                                |
| **API Layer** | AWS AppSync (GraphQL)                     |
| **Database**  | Amazon DynamoDB                           |
| **Hosting**   | AWS Amplify Hosting (CI/CD from GitHub)   |

---

## 📐 Architecture Overview

- **React App**: Provides a chatbot UI for end users.
- **Amazon Lex**: Handles natural language understanding.
- **AWS Lambda**: Executes the fulfillment logic for Lex intents.
- **AWS AppSync**: Serves as the GraphQL API layer for the app.
- **Amazon DynamoDB**: Stores logs, preferences, and history.
- **Amazon Cognito**: Handles secure user authentication and identity.
- **AWS CodeCommit**: Source control and CI/CD pipeline integrated with Amplify.

### 📌 Architecture Diagram

![Cloud Assistant AI Architecture Diagram](./mnt/data/4f811b07-9a38-4a24-8536-df56717bd675.png)

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/HamzehSayeh/cloud-assistant-ai.git
cd cloud-assistant-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Amplify CLI
```bash
npm install -g @aws-amplify/cli
amplify configure
```
> Follow the CLI prompts to set up your AWS credentials.

### 4. Initialize & Push Amplify Project
```bash
amplify init
amplify push
```

### 5. Start the App
```bash
npm start
```

---

## 🧠 Amazon Lex Bot

Custom intents allow users to interact with AWS services through the chatbot:

- `ListEC2InstancesIntent`
- `DescribeS3BucketsIntent`
- `CheckLambdaFunctionsIntent`
- *(Add your own intents for more functionality)*

Each intent is connected to a corresponding Lambda function for fulfillment.

---

## 🛡️ Authentication with Amazon Cognito

Features include:

- User sign-up and login
- Secure JWT-based authentication
- Password reset
- Role-based access via IAM integration

---

## 📁 Project Structure

```bash
/src
  /components         → React components
  /graphql            → GraphQL schema & operations

/amplify
  /backend            → Lambda functions, Auth, API
  /team-provider-info → Multi-environment support
```

---

## 🧪 Example Usage

![alt text](<Screenshot 2025-05-19 at 20.40.47-1.png>)
![alt text](<Screenshot 2025-05-19 at 20.40.17-1.png>)
![Screenshot 2025-05-19 at 20 40 47](https://github.com/user-attachments/assets/5b4ebdb3-375a-4e17-85e6-44796c3a7d9b)

---

## 🧾 GraphQL API Reference

You can find all GraphQL operations under `/src/graphql`.

**Sample Query:**
```graphql
query ListLogs {
  listLogs {
    items {
      timestamp
      message
    }
  }
}
```
![alt text](<Screenshot 2025-05-19 at 20.42.02-1.png>)
---

## 🛠️ IAM & Team Setup

Follow your internal IAM setup guide or refer to [IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) to configure:

- Root account MFA
- IAM roles for Lambda & Lex
- IAM groups for developers and CI/CD
- Programmatic users for Amplify CLI

---

## 📦 Releases

Stay tuned for tagged releases and versioned changelogs.
