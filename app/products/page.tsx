import CasketCatalog from "@/components/casket-catalog"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"

export default function ProductsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-6 px-4 border-b-4 border-secondary">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Chat
              </Button>
            </Link>
            <Link href="/pre-planning">
              <Button variant="secondary" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Pre-Planning Portal
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-balance">Direct Funeral Services</h1>
          <p className="text-sm md:text-base mt-2 opacity-90">Browse Our Casket Collection</p>
        </div>
      </header>

      <CasketCatalog />

      <footer className="bg-primary text-primary-foreground py-4 px-4 border-t-4 border-secondary mt-auto">
        <div className="container mx-auto max-w-7xl text-center text-sm">
          <p>© 2025 Direct Funeral Services. Available 24/7 to assist you.</p>
        </div>
      </footer>
    </main>
  )
}

