export default async function SlugPage(...args) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      ID PAGE  {JSON.stringify(args)}
    </main>
  )
}
