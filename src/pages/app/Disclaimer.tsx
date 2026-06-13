import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, Info, Shield, ExternalLink, FileWarning, Mail } from 'lucide-react'

export default function Disclaimer() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
        <p className="text-muted-foreground mb-2">Last updated: June 13, 2026</p>
        <p className="text-lg text-muted-foreground mb-12">
          Please read this disclaimer carefully before using the Harar Mart platform.
        </p>

        {/* General Information */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">General Information</h2>
                <p className="text-muted-foreground">
                  The information provided on Harar Mart is for general informational and business purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the Platform for any purpose.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Marketplace Role */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Marketplace Role</h2>
                <p className="text-muted-foreground">
                  Harar Mart acts solely as an intermediary marketplace connecting buyers and sellers. We do not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                  <li>Own, produce, sell, or resell any products listed on the Platform</li>
                  <li>Take possession of, inspect, or guarantee products listed by sellers</li>
                  <li>Provide warranties or guarantees for products or services offered by sellers</li>
                  <li>Act as an agent for either buyers or sellers in transactions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Listings */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileWarning className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Product Listings</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Product listings on Harar Mart are provided by independent sellers. While we verify seller credentials, we do not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Guarantee the accuracy of product descriptions, images, or specifications</li>
                    <li>Warrant the quality, safety, or legality of any products</li>
                    <li>Ensure that products comply with local laws or regulations in your jurisdiction</li>
                    <li>Verify that sellers have all necessary licenses or permits</li>
                  </ul>
                  <p>
                    Buyers are encouraged to conduct their own due diligence before making purchases, particularly for high-value transactions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Links */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <ExternalLink className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Third-Party Links</h2>
                <p className="text-muted-foreground">
                  Our Platform may contain links to third-party websites or services that are not owned or controlled by Harar Mart. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that Harar Mart shall not be liable for any damage or loss caused by or in connection with the use of any such third-party websites or services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  In no event shall Harar Mart, its directors, employees, partners, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                  <li>Your use or inability to use the Platform</li>
                  <li>Any transactions conducted through the Platform</li>
                  <li>Any products or services purchased through the Platform</li>
                  <li>Unauthorized access to or alteration of your data</li>
                  <li>Statements or conduct of any third party on the Platform</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Disclaimer, please contact us:
                </p>
                <div className="mt-4 space-y-2 text-muted-foreground">
                  <p>Email: legal@hararmart.com</p>
                  <p>Phone: +251919054807</p>
                  <p>Address: Harar, Ethiopia</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
