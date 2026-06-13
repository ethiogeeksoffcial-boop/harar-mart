import { Card, CardContent } from '@/components/ui/card'
import { Cookie, Settings, Shield, Sliders, Info, Mail } from 'lucide-react'

export default function Cookies() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground mb-2">Last updated: June 13, 2026</p>
        <p className="text-lg text-muted-foreground mb-12">
          This Cookie Policy explains how Harar Mart uses cookies and similar tracking technologies on our platform.
        </p>

        {/* What Are Cookies */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">What Are Cookies?</h2>
                <p className="text-muted-foreground">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies allow us to recognize your browser and remember certain information about your visit.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Types of Cookies We Use */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Types of Cookies We Use</h2>
                <div className="space-y-6 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Essential Cookies</h3>
                    <p>These cookies are necessary for the Platform to function properly. They enable core functionality such as security, network management, and account access. Without these cookies, certain services cannot be provided.</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Session management and authentication</li>
                      <li>Security and fraud prevention</li>
                      <li>Shopping cart functionality</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Functional Cookies</h3>
                    <p>These cookies allow the Platform to remember choices you make and provide enhanced, personalized features. They may be set by us or by third-party providers whose services we have added to our pages.</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Remembering your language preferences</li>
                      <li>Remembering your login details</li>
                      <li>Personalized product recommendations</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Analytics Cookies</h3>
                    <p>These cookies help us understand how visitors interact with our Platform by collecting and reporting information anonymously. This helps us improve our Platform and user experience.</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Page visit counts and traffic sources</li>
                      <li>User behavior and navigation patterns</li>
                      <li>Performance monitoring and optimization</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Marketing Cookies</h3>
                    <p>These cookies are used to track visitors across websites to display relevant advertisements. They may be set by our advertising partners to build a profile of your interests.</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Targeted advertising and promotions</li>
                      <li>Social media integration</li>
                      <li>Retargeting campaigns</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Cookies */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sliders className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Third-Party Cookies</h2>
                <p className="text-muted-foreground">
                  In addition to our own cookies, we may also use various third-party cookies to support our Platform's functionality and understand how you use our services. These include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                  <li><strong>Google Analytics:</strong> For analyzing website traffic and user behavior</li>
                  <li><strong>Payment Processors:</strong> For secure payment processing</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing features</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Managing Cookies */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Managing Cookies</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>You can control and manage cookies in various ways:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Browser Settings:</strong> Most browsers allow you to view, block, or delete cookies through their settings. Check your browser's help section for instructions.</li>
                    <li><strong>Opt-Out Tools:</strong> You can opt out of certain third-party cookies through industry opt-out tools like the Network Advertising Initiative opt-out page.</li>
                    <li><strong>Do Not Track:</strong> Some browsers support "Do Not Track" signals. We respect these signals when received.</li>
                  </ul>
                  <p className="mt-4">
                    Please note that blocking or deleting essential cookies may affect the functionality of our Platform and your ability to use certain features.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Updates to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically to stay informed about how we use cookies.
                </p>
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
                  If you have any questions about our use of cookies, please contact us:
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
