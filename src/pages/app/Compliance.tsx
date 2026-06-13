import { Card, CardContent } from '@/components/ui/card'
import { Shield, Scale, FileCheck, Gavel, BookOpen, Mail } from 'lucide-react'

export default function Compliance() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Compliance</h1>
        <p className="text-muted-foreground mb-2">Last updated: June 13, 2026</p>
        <p className="text-lg text-muted-foreground mb-12">
          Harar Mart is committed to operating in full compliance with all applicable laws, regulations, and industry standards.
        </p>

        {/* Regulatory Compliance */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Regulatory Compliance</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Harar Mart operates in accordance with the laws and regulations of the Federal Democratic Republic of Ethiopia and applicable international trade laws. We are committed to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Complying with Ethiopian commercial and trade regulations</li>
                    <li>Adhering to international trade sanctions and export control laws</li>
                    <li>Following anti-money laundering (AML) regulations</li>
                    <li>Complying with know-your-customer (KYC) requirements</li>
                    <li>Respecting data protection and privacy laws</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Anti-Money Laundering (AML) */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Anti-Money Laundering (AML) Policy</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Harar Mart maintains a robust AML compliance program to detect and prevent money laundering activities. Our program includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Customer due diligence and identity verification</li>
                    <li>Transaction monitoring and suspicious activity reporting</li>
                    <li>Risk-based assessment of users and transactions</li>
                    <li>Regular employee training on AML compliance</li>
                    <li>Record keeping and reporting as required by law</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Know Your Customer (KYC) */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Know Your Customer (KYC) Policy</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    To maintain a trusted marketplace, we implement KYC procedures for all users, especially sellers. Our KYC process includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Verification of government-issued identification documents</li>
                    <li>Business registration and license verification for sellers</li>
                    <li>Address verification for business entities</li>
                    <li>Beneficial ownership disclosure for corporate accounts</li>
                    <li>Ongoing monitoring and periodic re-verification</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Data Protection & Privacy</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We are committed to protecting the personal data of our users. Our data protection practices include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Compliance with applicable data protection laws</li>
                    <li>Implementation of technical and organizational security measures</li>
                    <li>Data minimization and purpose limitation</li>
                    <li>Secure data storage and transmission</li>
                    <li>User rights management (access, correction, deletion)</li>
                    <li>Data breach notification procedures</li>
                  </ul>
                  <p>
                    For more details, please refer to our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trade Compliance */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Gavel className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Trade Compliance</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    As an international B2B marketplace, Harar Mart is committed to lawful and ethical trade practices:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Prohibition of trade with sanctioned countries and entities</li>
                    <li>Restrictions on the sale of controlled and regulated products</li>
                    <li>Export control classification and screening</li>
                    <li>Customs documentation and tariff compliance</li>
                    <li>Ethical sourcing and supply chain transparency</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reporting Concerns */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Reporting Compliance Concerns</h2>
                <p className="text-muted-foreground">
                  If you suspect any violation of laws, regulations, or our policies, please report your concerns through our confidential reporting channel. We take all reports seriously and will investigate promptly.
                </p>
                <div className="mt-4 space-y-2 text-muted-foreground">
                  <p>Email: compliance@hararmart.com</p>
                  <p>Phone: +251919054807</p>
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
                <h2 className="text-2xl font-bold mb-3">Contact Our Compliance Team</h2>
                <p className="text-muted-foreground">
                  For compliance-related inquiries, please contact our compliance team:
                </p>
                <div className="mt-4 space-y-2 text-muted-foreground">
                  <p>Email: compliance@hararmart.com</p>
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
