import ChatInterface from "@/components/chat-interface"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-6 px-4 border-b-4 border-secondary">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold text-balance">Direct Funeral Services</h1>
          <p className="text-sm md:text-base mt-2 opacity-90">Compassionate guidance for casket selection</p>
        </div>
      </header>

      <ChatInterface />

      <footer className="bg-primary text-primary-foreground py-4 px-4 border-t-4 border-secondary mt-auto">
        <div className="container mx-auto max-w-4xl text-center text-sm">
          <p>© 2025 Direct Funeral Services. Available 24/7 to assist you.</p>
        </div>
      </footer>
    </main>
  )
}
