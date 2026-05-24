import Link from 'next/link'
import { MessageCircle, Phone, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    redirect('/chat')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Chattify</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-16">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                Connect Instantly with{' '}
                <span className="text-primary">Chattify</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed text-pretty">
                Experience seamless messaging and crystal-clear voice calls. 
                Stay connected with friends and colleagues anytime, anywhere.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="w-full sm:w-auto px-8">
                    Start Chatting Free
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Why Choose Chattify?
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Built for modern communication needs
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<MessageCircle className="w-6 h-6" />}
                title="Real-time Messaging"
                description="Instant message delivery with read receipts and typing indicators"
              />
              <FeatureCard
                icon={<Phone className="w-6 h-6" />}
                title="Voice Calls"
                description="Crystal-clear voice calls with your contacts in one click"
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6" />}
                title="Secure & Private"
                description="OTP verification and secure authentication protect your account"
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="Lightning Fast"
                description="Optimized for speed with real-time updates and notifications"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-primary/10 rounded-2xl p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Join thousands of users who trust Chattify for their daily communication.
              </p>
              <Link href="/auth/signup" className="mt-8 inline-block">
                <Button size="lg" className="px-8">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Chattify</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2024 Chattify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-background rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
