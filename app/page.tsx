export default function Home(params: any) {
    console.log('CONSOLE.LOG => params:', params); // >>>

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       MAIN PAGE {JSON.stringify(params)}
    </main>
  )
}
