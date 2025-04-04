import React from 'react'
import { Container } from '@/components/Container'

function PrivacyPolicy() {
  return (
    <Container>
      <div class="my-10">
        <h1 class="mb-6 text-center text-4xl font-bold">
          Privacy Policy for InstaCal
        </h1>
        <p class="mb-4 text-lg font-semibold">
          <strong>Effective Date: April 3, 2025</strong>
        </p>

        <h2 class="mb-4 mt-6 text-2xl font-semibold">1. Introduction</h2>
        <p class="mb-4">
          Welcome to <strong>InstaCal</strong> ("App"), the smartest and fastest
          calorie tracking app featuring meal scanning using AI, barcode
          scanning, nutrition label scanning, food search, saved meals, and
          build-your-own meal capabilities. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you use
          our App. By using InstaCal, you consent to the practices described in
          this Privacy Policy.
        </p>

        <h2 class="mb-4 mt-6 text-2xl font-semibold">
          2. Information Collection
        </h2>
        <p class="mb-4">
          We collect the following types of data when you use our App:
        </p>

        <h3 class="mb-2 mt-4 text-lg font-semibold">Personal Data:</h3>
        <ul class="ml-4 list-inside list-disc space-y-2">
          <li>Birthday</li>
          <li>Height</li>
          <li>Weight</li>
          <li>Gender</li>
          <li>Email address</li>
          <li>
            Payment information (processed securely through Apple Pay, Google
            Pay, and RevenueCat)
          </li>
          <li>Usage data and preferences</li>
        </ul>

        <h3 class="mb-2 mt-4 text-lg font-semibold">Non-Personal Data:</h3>
        <ul class="ml-4 list-inside list-disc space-y-2">
          <li>Device type and model</li>
          <li>Operating system version</li>
          <li>App usage statistics</li>
          <li>Crash reports</li>
        </ul>

        <h2 class="mb-4 mt-6 text-2xl font-semibold">3. Use of Information</h2>
        <p class="mb-4">The information collected is used to:</p>
        <ul class="ml-4 list-inside list-disc space-y-2">
          <li>Provide and maintain the App's services</li>
          <li>Authenticate users and manage accounts via Supabase</li>
          <li>Process payments and manage subscriptions through RevenueCat</li>
          <li>Analyze app usage and improve user experience using PostHog</li>
          <li>Communicate with you regarding your account and services</li>
          <li>
            Generate personalized calorie and macronutrient goals using OpenAI
          </li>
        </ul>

        <h2 class="mb-4 mt-6 text-2xl font-semibold">4. Data Sharing</h2>
        <p class="mb-4">
          We share your information only with trusted third-party service
          providers essential for the App's operation:
        </p>
        <ul class="ml-4 list-inside list-disc space-y-2">
          <li>
            <strong>RevenueCat:</strong> Payment processing and subscription
            management
          </li>
          <li>
            <strong>PostHog:</strong> Analytics and user behavior tracking
          </li>
          <li>
            <strong>Supabase:</strong> User authentication and database
            management
          </li>
          <li>
            <strong>OpenAI:</strong> Generation of calorie and macronutrient
            goals
          </li>
        </ul>
        <p class="mt-4">
          We do not sell, rent, or trade your personal information to third
          parties for marketing purposes.
        </p>

        <h2 class="mb-4 mt-6 text-2xl font-semibold">5. Data Protection</h2>
        <p class="mb-4">
          We take appropriate technical and organizational measures to protect
          your personal data against unauthorized access, disclosure,
          alteration, and destruction. These measures include encryption, secure
          servers, and access control protocols. However, no method of
          transmission over the internet is completely secure.
        </p>

        <h2 class="mb-4 mt-6 text-2xl font-semibold">6. Children's Privacy</h2>
        <p class="mb-4">
          InstaCal is not intended for children under the age of 13. We do not
          knowingly collect personal information from children under 13. If you
          are a parent or guardian and believe that your child has provided
          personal information, please contact us so we can delete it.
        </p>

        <h2 class="mb-4 mt-6 text-2xl font-semibold">
          7. Updates to This Privacy Policy
        </h2>
        <p class="mb-4">
          We may update this Privacy Policy periodically. Any changes will be
          posted on this page with the "Last updated" date. We encourage you to
          review this policy regularly to stay informed about how we protect
          your data.
        </p>

        <h2 class="mb-4 mt-6 text-2xl font-semibold">8. Contact Information</h2>
        <p class="mb-2">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <p>
          <strong>Email: </strong>
          <a
            href="mailto:support@theinstacal.app"
            class="text-blue-500 underline"
          >
            support@theinstacal.app
          </a>
        </p>
        <p>
          <strong>Address:</strong> 2345 W Monroe St, Chicago, IL 60612, USA
        </p>

        <p class="mt-6 text-center font-semibold">
          By using InstaCal, you agree to the terms outlined in this Privacy
          Policy.
        </p>
      </div>
    </Container>
  )
}

export default PrivacyPolicy
