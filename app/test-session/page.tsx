
'use client'

import { useSession } from 'next-auth/react'

 const TestSession=()=>{
  const { data: session, status } = useSession()
  console.log("Session in component:", session);
  console.log("Status in component:", status);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Session Test Page</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Session Status: {status}</h2>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Session User Data:</h2>
        {status === 'authenticated' ? (
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(session?.user, null, 2)}
          </pre>
        ) : (
          <p>No user data available. Please sign in.</p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">All Session Data:</h2>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  )
}
export default TestSession