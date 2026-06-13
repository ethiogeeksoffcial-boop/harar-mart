import { Card, CardContent } from '@/components/ui/card'
import { Shield, Lock, Eye, Database, Mail, Globe } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-2">Last updated: June 13, 2026</p>
        <p className="text-lg text-muted-foreground mb-12">
          At Harar Mart, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
        </p>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Information We Collect</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>We collect information you provide directly to us, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Account Information:</strong> Name, email address, phone number, and password when you create an account.</li>
                    <li><strong>Profile Information:</strong> Business details, company name, tax ID, and other information you add to your profile.</li>
                    <li><strong>Transaction Data:</strong> Information about purchases, orders, and transactions you conduct on our platform.</li>
                    <li><strong>Communications:</strong> Messages you send through our platform, including support inquiries and seller communications.</li>
                    <li><strong>Verification Documents:</strong> Business licenses, certifications, and other documents you upload for verification.</li>
                  </ul>
                  <p>We also automatically collect certain information when you use our platform:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Usage Data:</strong> Pages visited, features used, and actions taken on our platform.</li>
                    <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
                    <li><strong>Location Data:</strong> General location based on IP address for fraud prevention and compliance.</li>
                    <li><strong>Cookies:</strong> As described in our Cookie Policy.</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Your Information */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">How We Use Your Information</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our marketplace platform</li>
                    <li>Process transactions and send related information</li>
                    <li>Verify supplier identities and business credentials</li>
                    <li>Communicate with you about products, services, and promotions</li>
                    <li>Detect and prevent fraud, abuse, and security incidents</li>
                    <li>Comply with legal obligations and regulatory requirements</li>
                    <li>Analyze usage patterns to enhance user experience</li>
                    <li>Provide customer support and resolve disputes</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information Sharing */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Information Sharing</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>We may share your information in the following circumstances:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>With Other Users:</strong> Your business name and profile information are visible to other users as part of the marketplace.</li>
                    <li><strong>With Service Providers:</strong> We engage trusted third parties to help us operate our platform (payment processing, delivery services, analytics).</li>
                    <li><strong>For Legal Reasons:</strong> When required by law, court order, or governmental regulation.</li>
                    <li><strong>With Your Consent:</strong> We may share your information for other purposes with your explicit consent.</li>
                  </ul>
                  <p className="mt-4">We do not sell your personal information to third parties.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures to protect your information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure authentication and access controls</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Employee training on data protection best practices</li>
                  <li>Incident response procedures for data breaches</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Your Rights</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Depending on your jurisdiction, you may have the following rights:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal requirements.</li>
                    <li><strong>Portability:</strong> Request transfer of your data to another service provider.</li>
                    <li><strong>Objection:</strong> Object to processing of your personal data for certain purposes.</li>
                    <li><strong>Withdrawal of Consent:</strong> Withdraw consent at any time where processing is based on consent.</li>
                  </ul>
                  <p className="mt-4">To exercise any of these rights, please contact us at <strong>privacy@hararmart.com</strong>.</p>
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
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="mt-4 space-y-2 text-muted-foreground">
                  <p>Email: privacy@hararmart.com</p>
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
