"use client"

import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import productsData from "@/data/products.json"

export default function CasketCatalog() {
  // Group caskets by category
  const categories = productsData.caskets.reduce(
    (acc, casket) => {
      if (!acc[casket.category]) {
        acc[casket.category] = []
      }
      acc[casket.category].push(casket)
      return acc
    },
    {} as Record<string, typeof productsData.caskets>
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Our Casket Collection</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our thoughtfully curated selection of caskets. Each option is designed with dignity and respect in
          mind.
        </p>
      </div>

      {Object.entries(categories).map(([category, caskets]) => (
        <div key={category} className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-foreground border-b-2 border-secondary pb-2">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caskets.map((casket) => (
              <Card key={casket.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="relative w-full h-48 mb-4 bg-muted rounded-md overflow-hidden">
                    <Image
                      src={casket.image}
                      alt={casket.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{casket.name}</CardTitle>
                    <Badge variant="secondary" className="text-sm">
                      {casket.priceRange.display}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">{casket.material}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">{casket.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Features:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {casket.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    onClick={() => window.open(casket.learnMoreUrl, "_blank", "noopener,noreferrer")}
                  >
                    Learn More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-16 bg-card border-2 border-secondary/20 rounded-lg p-8">
        <h3 className="text-2xl font-semibold mb-4 text-center">All Caskets Include:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {productsData.includedFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-secondary text-xl">✓</span>
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

