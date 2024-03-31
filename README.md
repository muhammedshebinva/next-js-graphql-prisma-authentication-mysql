This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:


```bash
cd final
npm install

change the .env file
DATABASE_URL="mysql://root:mypassword@localhost:3306/mydb" --> give your connection String, password, mysql db name
JWT_SECRET="mysecret@123" --> give your sercret



npx prisma migrate dev --name init
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

