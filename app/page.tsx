import ChatInterface from "@/components/chat-interface"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-6 px-4 border-b-4 border-secondary">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-balance">Direct Funeral Services</h1>
              <p className="text-sm md:text-base mt-2 opacity-90">Compassionate guidance for casket selection</p>
            </div>
            <div className="flex gap-2">
              <Link href="/pre-planning">
                <Button variant="secondary" size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Calendar className="mr-2 h-4 w-4" />
                  Pre-Planning
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Staff Analytics
                </Button>
              </Link>
            </div>
          </div>
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
