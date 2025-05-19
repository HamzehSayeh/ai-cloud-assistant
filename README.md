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

![Screenshot 2025-05-19 203808](https://github.com/user-attachments/assets/f09c24e7-0991-4594-a21e-9f08aa61d29a)


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

![Screenshot 2025-05-19 at 20 40 47](https://github.com/user-attachments/assets/5b4ebdb3-375a-4e17-85e6-44796c3a7d9b)
![Screenshot 2025-05-19 at 20 40 17](https://github.com/user-attachments/assets/169acc2e-5af5-4b11-9f0a-5fd45c859d7f)


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
![Screenshot 2025-05-19 at 20 42 02](https://github.com/user-attachments/assets/7b08ac4c-e3f6-42d0-93b5-0c9274e1654e)

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
