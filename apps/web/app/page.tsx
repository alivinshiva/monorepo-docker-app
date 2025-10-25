import { prismaClient } from '../../../packages/db';

export default async function Home() {
  const users = await prismaClient.user.findMany();
  return (
    <div>
      {JSON.stringify(users)}
      <h1>hello world</h1>
    </div>
  );
}

// export const revalidate = 60 // revalidate every 60 seconds
// or
export const dynamic = 'force-dynamic'
