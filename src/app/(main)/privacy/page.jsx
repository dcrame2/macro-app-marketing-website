import React from 'react'
import { Container } from '@/components/Container'

function PrivacyPolicy() {
  return (
    <Container>
      <div className="my-10 rounded-2xl bg-white p-6 text-gray-900 sm:p-10">
        <h1 className="mb-6 text-center text-4xl font-bold">
          Privacy Policy for InstaCal
        </h1>
        <p className="mb-4 text-lg font-semibold">
          <strong>Last Updated: March 12, 2026</strong>
        </p>

        {/* 1. Introduction */}
        <h2 className="mb-4 mt-6 text-2xl font-semibold">1. Introduction</h2>
        <p className="mb-4">
          Welcome to <strong>InstaCal</strong> (&quot;App&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), an AI-powered
          nutrition tracking app with social features, including meal scanning,
          barcode scanning, nutrition label scanning, food search, saved meals,
          build-your-own meal capabilities, a social feed, stories (Slides), a
          nearby meals map, fitness integrations, and AI-powered nutrition coaching.
        </p>
        <p className="mb-4">
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our App. By using InstaCal, you
          consent to the practices described in this Privacy Policy.
        </p>

        {/* 2. Information Collection */}
        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          2. Information We Collect
        </h2>
        <p className="mb-4">
          We collect the following types of data when you use our App:
        </p>

        <h3 className="mb-2 mt-4 text-lg font-semibold">Account &amp; Profile Information:</h3>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>Email address</li>
          <li>Username and display name</li>
          <li>Profile photo</li>
          <li>Birthday</li>
          <li>Gender</li>
        </ul>

        <h3 className="mb-2 mt-4 text-lg font-semibold">Health &amp; Body Data:</h3>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>Height and weight</li>
          <li>Calorie and macronutrient intake data</li>
          <li>Nutrition goals and progress</li>
          <li>
            Fitness data synced from connected services (Apple Health, Strava),
            including calories burned and workout activity
          </li>
        </ul>

        <h3 className="mb-2 mt-4 text-lg font-semibold">User-Generated Content:</h3>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>Meal photos taken or uploaded through the App</li>
          <li>Social feed posts, Slides (stories), likes, comments, and bookmarks</li>
          <li>Meal logs and custom meal creations</li>
        </ul>

        <h3 className="mb-2 mt-4 text-lg font-semibold">Location Data:</h3>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>
            Approximate or precise location data when you use the nearby meals
            map feature. Location access is only used when you grant permission
            and can be revoked at any time through your device settings.
          </li>
        </ul>

        <h3 className="mb-2 mt-4 text-lg font-semibold">Payment Information:</h3>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>
            Payment and subscription information processed securely through Apple
            Pay, Google Pay, and RevenueCat. We do not store your credit card or
            payment details directly.
          </li>
        </ul>

        <h3 className="mb-2 mt-4 text-lg font-semibold">Device &amp; Usage Data:</h3>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>Device type and model</li>
          <li>Operating system version</li>
          <li>App usage statistics and feature interactions</li>
          <li>Crash reports and performance data</li>
        </ul>

        <h3 className="mb-2 mt-4 text-lg font-semibold">Camera &amp; Photo Access:</h3>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>
            Camera access is used for AI meal scanning, barcode scanning,
            nutrition label scanning, and meal photo uploads for social posts.
            Photos are only captured or accessed when you initiate these actions.
          </li>
        </ul>

        {/* 3. Use of Information */}
        <h2 className="mb-4 mt-6 text-2xl font-semibold">3. How We Use Your Information</h2>
        <p className="mb-4">The information collected is used to:</p>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>Provide and maintain the App&apos;s core tracking and logging features</li>
          <li>Authenticate users and manage accounts via Supabase</li>
          <li>Process payments and manage subscriptions through RevenueCat</li>
          <li>Analyze app usage and improve user experience using PostHog</li>
          <li>
            Power AI features including meal recognition, AI meal fixing, AI
            Dietitian chat, and personalized calorie and macronutrient goals
            using OpenAI
          </li>
          <li>
            Display your profile, posts, and meal content to other users through
            the social feed, Slides, and nearby meals map
          </li>
          <li>
            Show meals logged near your location on the map feature (when
            location access is granted)
          </li>
          <li>
            Sync fitness and activity data from Apple Health and Strava to
            display alongside your nutrition data
          </li>
          <li>Send notifications related to social interactions (likes, comments, follows)</li>
          <li>Communicate with you regarding your account and services</li>
        </ul>

        {/* 4. Social Features & Visibility */}
        <h2 className="mb-4 mt-6 text-2xl font-semibold">4. Social Features &amp; Content Visibility</h2>
        <p className="mb-4">
          InstaCal includes social features that allow you to share meal posts,
          Slides (stories), and interact with other users. When you use these
          features, please be aware of the following:
        </p>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>
            <strong>Public content:</strong> Meal posts, Slides, and profile
            information (username, display name, profile photo) you share on the
            social feed are visible to other InstaCal users.
          </li>
          <li>
            <strong>Nearby meals map:</strong> If you log a meal while using the
            map feature, the meal and its approximate location may be visible to
            other users browsing the map. Exact addresses are not shared.
          </li>
          <li>
            <strong>Interactions:</strong> Your likes, comments, and bookmarks
            may be visible to other users.
          </li>
          <li>
            <strong>Control:</strong> You can delete your posts and content at
            any time through the App.
          </li>
        </ul>

        {/* 5. Fitness Integrations */}
        <h2 className="mb-4 mt-6 text-2xl font-semibold">5. Fitness &amp; Health Integrations</h2>
        <p className="mb-4">
          InstaCal can connect to third-party fitness services to enhance your
          tracking experience:
        </p>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>
            <strong>Apple Health:</strong> With your permission, we read and
            write health and fitness data (such as calories burned, workouts, and
            nutrition data) to Apple Health. This data stays on your device and
            is governed by Apple&apos;s privacy policies.
          </li>
          <li>
            <strong>Strava:</strong> With your permission, we read workout and
            activity data from your Strava account to display calories burned
            alongside your nutrition tracking.
          </li>
        </ul>
        <p className="mt-4">
          These integrations are optional and require your explicit permission.
          You can disconnect them at any time through the App or your device
          settings.
        </p>

        {/* 6. Data Sharing */}
        <h2 className="mb-4 mt-6 text-2xl font-semibold">6. Data Sharing &amp; Third-Party Services</h2>
        <p className="mb-4">
          We share your information only with trusted third-party service
          providers essential for the App&apos;s operation:
        </p>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>
            <strong>RevenueCat:</strong> Payment processing and subscription
            management
          </li>
          <li>
            <strong>PostHog:</strong> Analytics and user behavior tracking
          </li>
          <li>
            <strong>Supabase:</strong> User authentication, database management,
            and storage of user-generated content
          </li>
          <li>
            <strong>OpenAI:</strong> AI-powered meal recognition, meal fixing, AI
            Dietitian chat, and generation of calorie and macronutrient goals.
            Meal photos and text you submit to AI features are processed by
            OpenAI.
          </li>
          <li>
            <strong>Apple Health:</strong> Fitness and health data sync (on-device only)
          </li>
          <li>
            <strong>Strava:</strong> Workout and activity data sync
          </li>
        </ul>
        <p className="mt-4">
          We do not sell, rent, or trade your personal information to third
          parties for marketing purposes.
        </p>

        {/* 7. Data Protection */}
        <h2 className="mb-4 mt-6 text-2xl font-semibold">7. Data Protection</h2>
        <p className="mb-4">
          We take appropriate technical and organizational measures to protect
          your personal data against unauthorized access, disclosure,
          alteration, and destruction. These measures include encryption, secure
          servers, and access control protocols. However, no method of
          transmission over the internet is completely secure, and we cannot
          guarantee absolute security.
        </p>

        {/* 8. Data Retention & Deletion */}
        <h2 className="mb-4 mt-6 text-2xl font-semibold">8. Data Retention &amp; Deletion</h2>
        <p className="mb-4">
          We retain your personal data for as long as your account is active or
          as needed to provide you with our services. You may request deletion
          of your account and associated data at any time by contacting us at{' '}
          <a
            href="mailto:support@theinstacal.app"
            className="text-blue-500 underline"
          >
            support@theinstacal.app
          </a>
          . Upon receiving a deletion request, we will delete or anonymize your
          data within 30 days, except where we are required to retain it by law.
        </p>
        <p className="mb-4">
          Please note that content you have shared publicly on the social feed
          (such as meal posts and comments) may have been viewed or saved by
          other users before deletion.
        </p>

        {/* 9. Your Rights */}
        <h2 className="mb-4 mt-6 text-2xl font-semibold">9. Your Rights</h2>
        <p className="mb-4">
          Depending on your location, you may have the following rights
          regarding your personal data:
        </p>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>
            <strong>Access:</strong> Request a copy of the personal data we hold
            about you
          </li>
          <li>
            <strong>Correction:</strong> Request correction of inaccurate
            personal data
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your personal data
            and account
          </li>
          <li>
            <strong>Portability:</strong> Request a copy of your data in a
            portable format
          </li>
          <li>
            <strong>Withdraw consent:</strong> Withdraw consent for location
            access, fitness integrations, or other optional data collection at
            any time
          </li>
        </ul>
        <p className="mt-4">
          To exercise any of these rights, contact us at{' '}
          <a
            href="mailto:support@theinstacal.app"
            className="text-blue-500 underline"
          >
            support@theinstacal.app
          </a>
          .
        </p>

        {/* 10. Health Disclaimer */}
        <h2 className="mb-4 mt-6 text-2xl font-semibold">10. Health &amp; Nutrition Disclaimer</h2>
        <p className="mb-4">
          InstaCal tracks food intake, macronutrients, and related nutrition
          data that may be considered health-related information. Please be
          aware:
        </p>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>
            This app is <strong>not intended to provide medical advice</strong>,
            diagnose any condition, or replace professional medical guidance.
          </li>
          <li>
            AI-generated nutrition insights, calorie goals, and AI Dietitian
            responses are for informational purposes only and should not be
            treated as medical or dietary prescriptions.
          </li>
          <li>
            Always consult a qualified healthcare professional before making
            significant changes to your diet or nutrition plan.
          </li>
        </ul>

        {/* 11. Children's Privacy */}
        <h2 className="mb-4 mt-6 text-2xl font-semibold">11. Children&apos;s Privacy</h2>
        <p className="mb-4">
          InstaCal is not intended for children under the age of 13. We do not
          knowingly collect personal information from children under 13. If you
          are a parent or guardian and believe that your child has provided
          personal information, please contact us so we can delete it.
        </p>

        {/* 12. Updates to Privacy Policy */}
        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          12. Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy periodically to reflect changes in
          our practices, features, or legal requirements. When we make changes:
        </p>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>
            We will update the &quot;Last Updated&quot; date at the top of this page.
          </li>
          <li>
            For material changes, we will notify users through the App or other
            reasonable means (such as an in-app notification or email).
          </li>
          <li>
            Your continued use of InstaCal after changes are posted constitutes
            your acceptance of the updated Privacy Policy.
          </li>
        </ul>
        <p className="mt-4">
          We encourage you to review this policy regularly to stay informed
          about how we protect your data.
        </p>

        {/* 13. Contact Information */}
        <h2 className="mb-4 mt-6 text-2xl font-semibold">13. Contact Information</h2>
        <p className="mb-2">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <p>
          <strong>Email: </strong>
          <a
            href="mailto:support@theinstacal.app"
            className="text-blue-500 underline"
          >
            support@theinstacal.app
          </a>
        </p>
        <p>
          <strong>Address:</strong> 2345 W Monroe St, Chicago, IL 60612, USA
        </p>

        <p className="mt-6 text-center font-semibold">
          By using InstaCal, you agree to the terms outlined in this Privacy
          Policy.
        </p>
      </div>
    </Container>
  )
}

export default PrivacyPolicy
