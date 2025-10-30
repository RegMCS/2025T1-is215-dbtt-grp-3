"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Loader2, BookOpen } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import CasketCardInline from "@/components/casket-card-inline"
import productsData from "@/data/products.json"

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat<UIMessage>({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && status !== "streaming") {
      sendMessage({ text: inputValue })
      setInputValue("")
    }
  }

  return (
    <div className="flex-1 flex flex-col container mx-auto max-w-4xl p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 && (
          <Card className="p-6 bg-card border-2 border-secondary/20">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Welcome to Direct Funeral Services</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              I'm here to help you find the right casket with compassion and care. I can assist you with:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span>Exploring our casket collection and materials</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span>Understanding pricing and options</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span>Answering questions about customization</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span>Providing guidance during this difficult time</span>
              </li>
            </ul>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Please feel free to ask me anything. How may I assist you today?
            </p>
            <div className="mt-6">
              <Link href="/products">
                <Button variant="outline" className="w-full border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Our Casket Catalog
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {messages.map((message) => {
          // Check if message contains casket IDs or package IDs
          const textContent = message.parts.find((part) => part.type === "text")?.text || ""
          const casketIds = productsData.caskets
            .map((c) => c.id)
            .filter((id) => textContent.includes(`[CASKET:${id}]`))
          const packageIds = productsData.packages
            .map((p) => p.id)
            .filter((id) => textContent.includes(`[PACKAGE:${id}]`))

          return (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex flex-col gap-3 max-w-[85%]">
                <Card
                  className={`p-4 ${
                    message.role === "user"
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "bg-card text-card-foreground border-primary/20"
                  }`}
                >
                  <div className="leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        // Remove casket and package ID markers from display text
                        const cleanText = part.text
                          .replace(/\[CASKET:[^\]]+\]/g, "")
                          .replace(/\[PACKAGE:[^\]]+\]/g, "")
                          .trim()
                        return (
                          <ReactMarkdown
                            key={index}
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                              ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                              li: ({ children }) => <li className="mb-1">{children}</li>,
                            }}
                          >
                            {cleanText}
                          </ReactMarkdown>
                        )
                      }
                      return null
                    })}
                  </div>
                </Card>

                {/* Render casket cards if mentioned */}
                {message.role === "assistant" && casketIds.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {casketIds.map((casketId) => {
                      const casket = productsData.caskets.find((c) => c.id === casketId)
                      if (!casket) return null
                      return <CasketCardInline key={casketId} casket={casket} />
                    })}
                  </div>
                )}

                {/* Render package cards if mentioned */}
                {message.role === "assistant" && packageIds.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {packageIds.map((packageId) => {
                      const pkg = productsData.packages.find((p) => p.id === packageId)
                      if (!pkg) return null
                      return <CasketCardInline key={packageId} casket={pkg} />
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {status === "streaming" && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <Card className="max-w-[80%] p-4 bg-card text-card-foreground border-primary/20">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                <span className="text-muted-foreground">Typing...</span>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about our casket options..."
          disabled={status === "streaming"}
          className="flex-1 border-2 focus:border-secondary"
        />
        <Button
          type="submit"
          disabled={status === "streaming" || !inputValue.trim()}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        >
          {status === "streaming" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  )
}
