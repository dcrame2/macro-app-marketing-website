import React from 'react'
import { Container } from '@/components/Container'

export const metadata = {
  title: 'Prize Race Official Rules',
  description: 'The official rules for InstaCal prize races: who can enter, how a race starts, how the winner is decided and how the prize is paid.',
}

const H2 = ({ children }) => <h2 className="mb-4 mt-8 text-2xl font-semibold">{children}</h2>
const P = ({ children }) => <p className="mb-4">{children}</p>
const UL = ({ children }) => <ul className="mb-4 ml-4 list-outside list-disc space-y-2 pl-4">{children}</ul>

/**
 * The official rules every prize race links to (`challenge_prizes.rules_url`).
 * One page for all races: the prize, distance, sport, number of entrants and
 * dates of a given race are the ones shown on that race's own page.
 * Not claimed by the app (not in the AASA file or the Android intent filters),
 * so the link always opens in a browser.
 */
function PrizeRaceRules() {
  return (
    <Container>
      <div className="my-10 rounded-2xl bg-white p-6 text-gray-900 sm:p-10">
        <h1 className="mb-6 text-center text-4xl font-bold">InstaCal Prize Race Official Rules</h1>
        <p className="mb-4 text-lg font-semibold">
          <strong>Last Updated: November 23, 2026</strong>
        </p>
        <P>
          <strong>No purchase or payment of any kind is necessary to enter or win.</strong> A purchase or an InstaCal Pro subscription does not improve your chances. Void
          where prohibited by law.
        </P>
        <P>
          These rules apply to every prize race run in the InstaCal app (each one a &quot;Race&quot;). A Race is a contest of skill: the winner is decided by athletic
          performance, not by chance. The details of a given Race (its prize, sport, distance, the number of entrants it needs to start, how long it lasts and how the winner
          is decided) are shown on that Race&apos;s page in the app and at theinstacal.app, and are part of these rules. If a Race&apos;s page and these rules disagree, these
          rules control.
        </P>

        <H2>1. Sponsor</H2>
        <P>
          Each Race is sponsored and run by Digital Delight LLC, the maker of the InstaCal app, 2345 W Monroe St, Chicago, IL 60612, USA (&quot;Sponsor&quot;, &quot;we&quot;, &quot;us&quot;). Questions:{' '}
          <a className="text-blue-600 underline" href="mailto:support@theinstacal.app">
            support@theinstacal.app
          </a>
          .
        </P>
        <P>
          <strong>Apple and Google are not sponsors of any Race and are not involved in any way.</strong> X Corp. and any other social network where a Race is announced do not sponsor, endorse or administer it. Strava, Garmin and any other fitness service whose data may be used
          to record activities are not sponsors and do not endorse or administer any Race.
        </P>

        <H2>2. Who can enter</H2>
        <UL>
          <li>You must be a legal resident of one of the fifty United States or the District of Columbia, physically located there, and at least 18 years old (or the age of majority where you live, if older) when you enter.</li>
          <li>You need a free InstaCal account in good standing. One account per person, and one entry per person per Race.</li>
          <li>Employees, contractors, officers and directors of the Sponsor, and members of their immediate families and households, may take part in a Race but cannot win its prize.</li>
          <li>You are responsible for making sure taking part is lawful where you live. Races are void where prohibited or restricted by law.</li>
        </UL>

        <H2>3. How to enter</H2>
        <P>
          Open the Race in the InstaCal app, connect a fitness service that records your activities (Apple Health, Health Connect or Strava) if you have not already, tap the button to join, and confirm that you meet the eligibility requirements. You cannot join without a connected service. Entry is free. You can leave a Race at any time
          before it ends from the Race&apos;s page. You can join after a Race has started: your qualifying activities from inside the Race window count, including
          ones from before you joined, but the Race window does not get longer for late entrants.
        </P>

        <H2>4. When a Race starts and ends</H2>
        <UL>
          <li>
            <strong>The start.</strong> A Race&apos;s page states how many entrants it needs. When that number is reached, the start time is set for a stated number of hours
            later (the &quot;notice period&quot;), and every entrant is sent a message in the app with the exact start time. The Race starts at the same instant for
            everyone.
          </li>
          <li>
            <strong>If it does not fill.</strong> If the needed number of entrants is not reached by the fill-by date set for the Race, the start time is set on that date
            with the entrants who have joined, after the same notice period. The Sponsor may instead cancel a Race before it starts, in which case no prize is awarded.
          </li>
          <li>
            <strong>The end.</strong> A Race lasts the number of days shown on its page, measured from the start time (the &quot;Race window&quot;). A Race whose page says
            the first to finish wins ends when the first eligible entrant completes the distance.
          </li>
        </UL>

        <H2>5. What counts</H2>
        <UL>
          <li>Only activities of the Race&apos;s sport (for example, runs for a running Race) that start inside the Race window count.</li>
          <li>
            Where a Race&apos;s page says activities must be tracked, only activities recorded by a watch, phone or fitness device and brought into InstaCal through a
            connected service (such as Strava, Apple Health, Garmin Connect or Health Connect) count. Activities typed in by hand do not count, whether typed into InstaCal or into the connected service (for example a manual activity added in Strava or a workout added by hand in Apple Health).
          </li>
          <li>Activities must be completed by you, on foot or on a human-powered bicycle as the sport requires, under your own power. No motorized or assisted travel, no treadmill or indoor distances unless they are recorded by a device, and no one else carrying your device.</li>
          <li>An activity must have reached InstaCal before the Sponsor confirms the result to count. We are not responsible for a device or a connected service that syncs late or not at all.</li>
        </UL>

        <H2>6. How the winner is decided</H2>
        <UL>
          <li>
            <strong>Fastest total time.</strong> Your qualifying activities are taken in the order you did them until they add up to the Race distance. Your time is the
            total moving time, as recorded by your device, that it took to cover that distance; the activity during which you reach the distance counts in proportion to
            the part of it that was needed. The eligible entrant with the lowest time wins. You may use any number of activities.
          </li>
          <li>
            <strong>First to finish.</strong> Where a Race&apos;s page says the first to finish wins, the winner is the eligible entrant whose qualifying activities reach
            the Race distance at the earliest moment after the start.
          </li>
          <li>
            <strong>Ties.</strong> If two or more eligible entrants have the same result to the second, the one who reached the Race distance earlier wins.
          </li>
          <li>If no eligible entrant completes the Race distance inside the Race window, no prize is awarded.</li>
          <li>The leaderboard shown during a Race is provisional. Only the Sponsor&apos;s confirmed result is final.</li>
        </UL>

        <H2>7. Verification and fair play</H2>
        <P>
          After a Race ends, the Sponsor reviews the leading entrants&apos; activities before naming a winner. We may ask a potential winner for more information about an
          activity, such as the original recording from the device. We may exclude an activity, or disqualify an entrant, where we reasonably believe that:
        </P>
        <UL>
          <li>an activity was not done by the entrant, not done on foot or by bicycle as required, or was edited, fabricated or duplicated;</li>
          <li>an activity has no GPS route or other device data that supports its distance and time, or shows a pace or speed that is not plausible for the sport;</li>
          <li>the entrant used more than one account, entered on behalf of someone else, or does not meet the eligibility requirements;</li>
          <li>the entrant tampered with the app or the Race, harassed other members, or broke InstaCal&apos;s terms.</li>
        </UL>
        <P>The Sponsor&apos;s decisions on eligibility, what counts and the result are final and binding.</P>

        <H2>8. The prize</H2>
        <UL>
          <li>Each Race has one prize, in the amount in U.S. dollars shown on its page, unless the page states more than one prize.</li>
          <li>The prize is paid by the Sponsor outside the app, by the payment method stated on the Race&apos;s page (for example Venmo or PayPal) or another method we agree with the winner. The winner must have, or open, an account that can receive it.</li>
          <li>Prizes cannot be transferred or exchanged. The winner is responsible for any taxes on the prize. If the total value of prizes you receive from the Sponsor in a calendar year reaches the amount at which U.S. tax reporting is required, we will ask you for a completed IRS Form W-9 before paying.</li>
        </UL>

        <H2>9. Telling and paying the winner</H2>
        <P>
          The winner is told by a message from Team InstaCal in the app once the result is confirmed, normally within 72 hours of the end of the Race. The winner must reply
          within 7 days with the details we need to pay the prize and, if asked, confirm their eligibility. If the winner does not reply in time, cannot be verified, or is
          found ineligible, the prize goes to the eligible entrant with the next best result. Prizes are normally paid within 14 days of the winner providing what we need.
        </P>
        <P>Every entrant is told the result in the app. The winner&apos;s first name, profile photo and result may be shown on the Race&apos;s page in the app and on theinstacal.app.</P>

        <H2>10. Your safety</H2>
        <P>
          Running, walking and cycling carry real risk of injury. Take part only if you are fit and healthy enough to do so, check with a doctor if you are unsure, obey
          traffic laws and stay aware of your surroundings. Do not push past what is safe for you to win a Race. You take part entirely at your own risk.
        </P>

        <H2>11. Publicity</H2>
        <P>
          Except where prohibited by law, by accepting a prize the winner agrees that the Sponsor may use their first name, InstaCal username, profile photo and Race result
          to announce the result and to promote InstaCal and future Races, without further payment.
        </P>

        <H2>12. Release and limits of liability</H2>
        <P>
          To the fullest extent the law allows, by entering you release the Sponsor, Apple Inc., Google LLC and their respective affiliates, officers, employees and agents
          from any claim, injury, loss or damage arising from taking part in a Race, from any activity you do in connection with one, or from receiving or using a prize.
          We are not responsible for lost, late or inaccurate activity data, for failures of devices, networks or connected services, or for errors in the app. Nothing in
          these rules limits liability that cannot be limited by law.
        </P>

        <H2>13. Changes and cancellation</H2>
        <P>
          We may cancel, suspend or change a Race if fraud, a technical failure or anything else outside our reasonable control stops it from being run fairly. If a Race is
          cancelled after it has started, we may at our discretion award the prize on the basis of qualifying activities received before the cancellation. We will tell
          entrants in the app.
        </P>

        <H2>14. Privacy</H2>
        <P>
          We use the information you give us and your activity data to run the Race, verify results and pay the prize, as described in our{' '}
          <a className="text-blue-600 underline" href="/privacy">
            Privacy Policy
          </a>
          . Payment details the winner sends us are used only to pay the prize.
        </P>

        <H2>15. Governing law</H2>
        <P>
          These rules and every Race are governed by the laws of the State of Illinois, without regard to its conflict-of-law rules. Any dispute will be resolved
          individually, not as part of a class action, in the state or federal courts located in Cook County, Illinois.
        </P>

        <H2>16. Winner&apos;s name</H2>
        <P>
          For the first name of the winner of a Race, email{' '}
          <a className="text-blue-600 underline" href="mailto:support@theinstacal.app">
            support@theinstacal.app
          </a>{' '}
          within 60 days of the end of that Race.
        </P>
      </div>
    </Container>
  )
}

export default PrizeRaceRules
