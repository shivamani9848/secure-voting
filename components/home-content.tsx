"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Globe, Settings, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { SecureVotingLogo } from "@/components/secure-voting-logo"
import { useLanguage } from "@/contexts/language-context"

export function HomeContent() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SecureVotingLogo size="md" showText={false} />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("site.title")}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link href="/admin/login">
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <SecureVotingLogo size="xl" showText={true} />
          </div>
          <Badge className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            Blockchain Secured
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">{t("home.hero.title")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">{t("home.hero.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                {t("home.register.button")}
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
              >
                {t("home.login.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t("home.features.title")}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-gray-900 dark:text-white">{t("home.feature.blockchain.title")}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {t("home.feature.blockchain.desc")}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-gray-900 dark:text-white">{t("home.feature.voterid.title")}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {t("home.feature.voterid.desc")}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <Globe className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-gray-900 dark:text-white">{t("home.feature.multilang.title")}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {t("home.feature.multilang.desc")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Main Footer Content */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <SecureVotingLogo size="sm" showText={false} />
                <h3 className="text-xl font-bold">{t("site.title")}</h3>
              </div>
              <p className="text-gray-400 mb-4">{t("common.footer.subtitle")}</p>
              <p className="text-gray-400">{t("common.footer")}</p>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-orange-400">{t("footer.contact.title")}</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="text-sm text-gray-400">{t("footer.helpline")}</p>
                    <a href="tel:+911800123456" className="text-white hover:text-orange-400 transition-colors">
                      +91 1800-123-456
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="text-sm text-gray-400">{t("footer.support.email")}</p>
                    <a
                      href="mailto:support@indiaevoting.gov.in"
                      className="text-white hover:text-orange-400 transition-colors"
                    >
                      support@indiaevoting.gov.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="text-sm text-gray-400">{t("footer.hours")}</p>
                    <p className="text-white text-sm">{t("footer.hours.time")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-gray-400 text-sm">{t("footer.emergency.note")}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
