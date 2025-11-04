"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Loader2, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import uiConfig from "@/data/ui-config.json"

export default function AnalyticsChat() {
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat<UIMessage>({
    transport: new DefaultChatTransport({ api: "/api/analytics-chat" }),
  })

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    // Only auto-scroll if user is near the bottom or a new message is sent
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100
      
      if (isNearBottom || status === "streaming") {
        scrollToBottom()
      }
    }
  }, [messages, status])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && status !== "streaming") {
      sendMessage({ text: inputValue })
      setInputValue("")
    }
  }

  const { suggestedQuestions, aiAssistant } = uiConfig.analytics

  return (
    <Card className="flex flex-col h-[600px] border-2 border-secondary">
      <div className="flex items-center gap-2 p-4 border-b bg-secondary/10">
        <Sparkles className="h-5 w-5 text-secondary" />
        <div>
          <h3 className="font-semibold">{aiAssistant.name}</h3>
          <p className="text-xs text-muted-foreground">{aiAssistant.description}</p>
        </div>
      </div>

      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              I can analyze your sales, inventory, and performance data. Try asking:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-2 px-3"
                  onClick={() => {
                    setInputValue(question)
                  }}
                >
                  <span className="text-xs">{question}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <ReactMarkdown
                        key={index}
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="text-sm">{children}</li>,
                          h3: ({ children }) => <h3 className="font-semibold mt-3 mb-2">{children}</h3>,
                        }}
                      >
                        {part.text}
                      </ReactMarkdown>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          </div>
        ))}

        {status === "streaming" && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-lg p-3 bg-muted">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                <span className="text-sm text-muted-foreground">{aiAssistant.loadingMessages[0]}</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={aiAssistant.placeholderText}
          disabled={status === "streaming"}
          className="flex-1"
        />
        <Button type="submit" disabled={status === "streaming" || !inputValue.trim()} className="bg-secondary hover:bg-secondary/90">
          {status === "streaming" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </Card>
  )
}

