import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"


export default async function Home() {
  const session = await getServerSession(options)

  return (
    <>
      {session ? (
        <h1 className="text-5xl">Welcome, {session.user.name}!</h1>
      ) : (
        <h1 className="text-5xl">Not Authenticated</h1>
      )}
    </>
  )
}