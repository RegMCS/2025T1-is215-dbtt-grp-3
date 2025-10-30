"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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
    if (inputValue.trim() && status !== "in_progress") {
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
          </Card>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <Card
              className={`max-w-[80%] p-4 ${
                message.role === "user"
                  ? "bg-secondary text-secondary-foreground border-secondary"
                  : "bg-card text-card-foreground border-primary/20"
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed">
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return <span key={index}>{part.text}</span>
                  }
                  return null
                })}
              </div>
            </Card>
          </div>
        ))}

        {status === "in_progress" && messages[messages.length - 1]?.role === "user" && (
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
          disabled={status === "in_progress"}
          className="flex-1 border-2 focus:border-secondary"
        />
        <Button
          type="submit"
          disabled={status === "in_progress" || !inputValue.trim()}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        >
          {status === "in_progress" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  )
}
