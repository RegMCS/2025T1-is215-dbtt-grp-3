"use client"

import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface CasketCardProps {
  id: string
  name: string
  material?: string
  type?: string
  priceRange: {
    display: string
  }
  description: string
  image: string
  learnMoreUrl: string
  features: string[]
}

export default function CasketCardInline({ casket }: { casket: CasketCardProps }) {
  return (
    <Card className="flex flex-col max-w-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="relative w-full h-40 mb-3 bg-muted rounded-md overflow-hidden">
          <Image
            src={casket.image}
            alt={casket.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{casket.name}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {casket.priceRange.display}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {casket.material || casket.type}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-3">{casket.description}</p>

        <div className="space-y-1">
          <h4 className="font-semibold text-xs">Key Features:</h4>
          <ul className="list-disc list-inside space-y-0.5 text-xs text-muted-foreground">
            {casket.features.slice(0, 3).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          size="sm"
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          onClick={() => window.open(casket.learnMoreUrl, "_blank", "noopener,noreferrer")}
        >
          Learn More
          <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}

