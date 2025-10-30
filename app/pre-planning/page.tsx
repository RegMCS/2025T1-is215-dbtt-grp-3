"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  User,
  Package,
  MessageSquare,
  FileText,
  Heart,
  CreditCard,
  Users,
  Music,
  CheckCircle2,
  Clock,
  Home,
  Scale,
  FileCheck,
} from "lucide-react"

export default function PrePlanningPortal() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6 px-4 border-b-4 border-secondary">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Pre-Planning Portal</h1>
              <p className="text-sm md:text-base mt-2 opacity-90">Plan ahead with peace of mind</p>
            </div>
            <Link href="/">
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl p-4 md:p-8 flex-1">
        {/* Welcome Section */}
        <Card className="mb-8 border-2 border-secondary/30">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to Your Personal Planning Dashboard</CardTitle>
            <CardDescription className="text-base">
              Take control of your future arrangements and give your loved ones the gift of clarity and peace of mind.
              Complete your planning at your own pace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm">No pressure, no rush</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm">Save and update anytime</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm">Lock in today's prices</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">In Progress</Badge>
                <span className="text-xs text-muted-foreground">60%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4" />
                Service Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Not Started</Badge>
                <span className="text-xs text-muted-foreground">0%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Legal Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Not Started</Badge>
                <span className="text-xs text-muted-foreground">0%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Not Started</Badge>
                <span className="text-xs text-muted-foreground">0%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="personal">Personal Wishes</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Service Selection */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Package className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle>Select Your Service</CardTitle>
                  <CardDescription>Choose from caskets, packages, and service options</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="default">
                    Browse Options
                  </Button>
                </CardContent>
              </Card>

              {/* Chat with Advisor */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <MessageSquare className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle>Chat with AI Advisor</CardTitle>
                  <CardDescription>Get instant answers to your questions 24/7</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/">
                    <Button className="w-full" variant="default">
                      Start Chat
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Will & Estate */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Scale className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle>Will & Estate Planning</CardTitle>
                  <CardDescription>Connect with legal professionals for will preparation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="default">
                    Request Lawyer
                  </Button>
                </CardContent>
              </Card>

              {/* Personal Wishes */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Heart className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle>Personal Wishes</CardTitle>
                  <CardDescription>Music, readings, special requests, and more</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="default">
                    Add Details
                  </Button>
                </CardContent>
              </Card>

              {/* Payment Plans */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CreditCard className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle>Payment Plans</CardTitle>
                  <CardDescription>Flexible payment options to fit your budget</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="default">
                    View Plans
                  </Button>
                </CardContent>
              </Card>

              {/* Beneficiaries */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle>Beneficiary Information</CardTitle>
                  <CardDescription>Add family members and decision makers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="default">
                    Manage Contacts
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks to help you get started</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start">
                  <FileCheck className="mr-2 h-4 w-4" />
                  Complete Personal Information Form
                </Button>
                <Button variant="outline" className="justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Compare Service Packages
                </Button>
                <Button variant="outline" className="justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Consultation Call
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Planning Checklist
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service & Product Selection</CardTitle>
                <CardDescription>
                  Choose your preferred casket, funeral package, and service details. You can update your selections at
                  any time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Casket Selection</CardTitle>
                      <CardDescription>Browse our full collection of caskets</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Current Selection: <strong>None selected</strong>
                      </p>
                      <Link href="/products">
                        <Button className="w-full">View Casket Catalog</Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Funeral Package</CardTitle>
                      <CardDescription>Choose a service package that fits your needs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Current Selection: <strong>None selected</strong>
                      </p>
                      <Button className="w-full">Browse Packages</Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Price Lock Guarantee</h4>
                  <p className="text-sm text-muted-foreground">
                    Lock in today's prices for your selected services. Prices are guaranteed for the life of your
                    pre-arrangement contract, protecting you from future increases.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Legal Tab */}
          <TabsContent value="legal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Legal Documents & Will Preparation</CardTitle>
                <CardDescription>
                  Get professional help with wills, advance directives, and other important legal documents.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-2">
                    <CardHeader>
                      <Scale className="h-6 w-6 text-secondary mb-2" />
                      <CardTitle className="text-lg">Last Will & Testament</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect with experienced estate planning attorneys to draft your will.
                      </p>
                      <ul className="text-sm space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>Asset distribution</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>Executor appointment</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>Guardian designation</span>
                        </li>
                      </ul>
                      <Button className="w-full">Request Attorney Consultation</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <FileText className="h-6 w-6 text-secondary mb-2" />
                      <CardTitle className="text-lg">Advance Healthcare Directive</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Document your healthcare wishes and designate a healthcare proxy.
                      </p>
                      <ul className="text-sm space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>Medical treatment preferences</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>Healthcare proxy</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>DNR orders</span>
                        </li>
                      </ul>
                      <Button className="w-full" variant="outline">
                        Create Directive
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-2 border-secondary/20 bg-secondary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Partner Law Firms</CardTitle>
                    <CardDescription>We work with trusted, experienced estate planning attorneys</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Our partner law firms specialize in estate planning and offer discounted rates for our
                      pre-planning clients.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="default">Schedule Free Consultation</Button>
                      <Button variant="outline">View Attorney Profiles</Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personal Wishes Tab */}
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Wishes & Special Requests</CardTitle>
                <CardDescription>
                  Share your preferences for music, readings, speakers, flowers, and other personal touches.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-2">
                    <CardHeader>
                      <Music className="h-6 w-6 text-secondary mb-2" />
                      <CardTitle className="text-lg">Music & Ceremony</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2 mb-4">
                        <li>• Favorite songs and hymns</li>
                        <li>• Religious or secular ceremony</li>
                        <li>• Special readings or poems</li>
                        <li>• Speakers and eulogists</li>
                      </ul>
                      <Button className="w-full" variant="outline">
                        Add Preferences
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <Heart className="h-6 w-6 text-secondary mb-2" />
                      <CardTitle className="text-lg">Memorial Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2 mb-4">
                        <li>• Flower preferences</li>
                        <li>• Charity donations in lieu of flowers</li>
                        <li>• Photo selections for displays</li>
                        <li>• Memorial video tribute</li>
                      </ul>
                      <Button className="w-full" variant="outline">
                        Customize Memorial
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <Users className="h-6 w-6 text-secondary mb-2" />
                      <CardTitle className="text-lg">Reception & Gathering</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2 mb-4">
                        <li>• Preferred location</li>
                        <li>• Food and beverage preferences</li>
                        <li>• Guest list considerations</li>
                        <li>• Special activities or tributes</li>
                      </ul>
                      <Button className="w-full" variant="outline">
                        Plan Reception
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <FileText className="h-6 w-6 text-secondary mb-2" />
                      <CardTitle className="text-lg">Obituary & Notices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2 mb-4">
                        <li>• Draft obituary text</li>
                        <li>• Important life highlights</li>
                        <li>• Organization memberships</li>
                        <li>• Publication preferences</li>
                      </ul>
                      <Button className="w-full" variant="outline">
                        Draft Obituary
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Plans & Options</CardTitle>
                <CardDescription>
                  Flexible payment plans designed to make pre-planning affordable and stress-free.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-2 border-secondary">
                    <CardHeader>
                      <CardTitle className="text-lg">Pay in Full</CardTitle>
                      <div className="text-3xl font-bold text-secondary mt-2">5% Off</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>Immediate price protection</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>Maximum savings</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>No future payments</span>
                        </li>
                      </ul>
                      <Button className="w-full">Select Plan</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary">
                    <CardHeader>
                      <Badge className="mb-2">Most Popular</Badge>
                      <CardTitle className="text-lg">Monthly Plan</CardTitle>
                      <div className="text-3xl font-bold text-primary mt-2">0% APR</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>12-60 month terms</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>No interest charges</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>Flexible payment dates</span>
                        </li>
                      </ul>
                      <Button className="w-full">Select Plan</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Insurance Assignment</CardTitle>
                      <div className="text-2xl font-bold mt-2">Transfer Policy</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>Use existing life insurance</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>No out-of-pocket cost</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span>Simple assignment process</span>
                        </li>
                      </ul>
                      <Button className="w-full" variant="outline">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Protection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>
                      ✓ All funds are placed in a secure trust account or insurance policy
                      <br />
                      ✓ Your money is protected and can only be used for funeral services
                      <br />
                      ✓ Transferable if you relocate or change your mind
                      <br />✓ Refundable under certain conditions (see terms)
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-primary text-primary-foreground py-4 px-4 border-t-4 border-secondary mt-auto">
        <div className="container mx-auto max-w-7xl text-center text-sm">
          <p>© 2025 Direct Funeral Services Pre-Planning Portal. Your information is secure and confidential.</p>
        </div>
      </footer>
    </main>
  )
}

