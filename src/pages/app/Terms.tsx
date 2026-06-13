import { Card, CardContent } from '@/components/ui/card'
import { FileText, UserCheck, ShoppingCart, AlertTriangle, Scale, Ban, Mail } from 'lucide-react'

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-2">Last updated: June 13, 2026</p>
        <p className="text-lg text-muted-foreground mb-12">
          Please read these terms carefully before using the Harar Mart platform.
        </p>

        {/* Acceptance */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using Harar Mart ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to all the terms, you may not access or use the Platform. These terms apply to all visitors, users, and others who access or use the Platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Registration */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Account Registration</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>To access certain features of the Platform, you must register for an account. You agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate, current, and complete registration information</li>
                    <li>Maintain and update your account information as needed</li>
                    <li>Keep your password secure and confidential</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>Be responsible for all activities that occur under your account</li>
                  </ul>
                  <p>You must be at least 18 years old to create an account. By registering, you represent that you meet this requirement.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buying and Selling */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Buying and Selling</h2>
                <div className="space-y-4 text-muted-foreground">
                  <h3 className="font-semibold text-foreground">For Buyers:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You agree to provide accurate payment and shipping information</li>
                    <li>You are responsible for all purchases made through your account</li>
                    <li>You agree to pay all charges at the prices displayed at the time of purchase</li>
                    <li>Returns and refunds are subject to the seller's return policy</li>
                  </ul>
                  <h3 className="font-semibold text-foreground mt-4">For Sellers:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You represent that you have the legal right to sell the products you list</li>
                    <li>All product listings must be accurate, truthful, and comply with applicable laws</li>
                    <li>You agree to fulfill orders in a timely manner as described in your listings</li>
                    <li>You are responsible for complying with all tax obligations related to your sales</li>
                    <li>Harar Mart may verify your business credentials and request documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prohibited Activities */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Ban className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Prohibited Activities</h2>
                <p className="text-muted-foreground mb-4">You agree not to engage in any of the following prohibited activities:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Violating any applicable laws or regulations</li>
                  <li>Infringing on intellectual property rights of others</li>
                  <li>Listing counterfeit, stolen, or prohibited products</li>
                  <li>Manipulating prices or interfering with other users' listings</li>
                  <li>Engaging in fraudulent transactions or money laundering</li>
                  <li>Attempting to gain unauthorized access to the Platform or other users' accounts</li>
                  <li>Using the Platform to distribute malware, spam, or harmful content</li>
                  <li>Harassing, abusing, or harming other users</li>
                  <li>Circumventing any Platform policies or restrictions</li>
                </ul>
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
                  To the maximum extent permitted by law, Harar Mart shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Platform. Harar Mart acts as an intermediary marketplace and is not directly responsible for transactions between buyers and sellers. We do not guarantee the quality, safety, or legality of products listed by sellers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dispute Resolution */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Dispute Resolution</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Any disputes arising from these Terms shall be resolved through the following process:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Informal resolution through customer support</li>
                    <li>Mediation through a mutually agreed mediator</li>
                    <li>Binding arbitration in accordance with Ethiopian arbitration laws</li>
                  </ol>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the Federal Democratic Republic of Ethiopia.
                  </p>
                </div>
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
                  If you have any questions about these Terms, please contact us:
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
