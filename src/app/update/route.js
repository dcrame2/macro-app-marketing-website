/**
 * theinstacal.app/update - one link that lands each phone in its own store.
 *
 * It exists for the button on a Team InstaCal broadcast ("Update now"): the
 * app opens any full URL on that button in the phone's browser, so builds
 * already on people's phones reach the right store without knowing which
 * store that is. The server reads the User-Agent and redirects.
 *
 * Android goes to Google Play; everything else goes to the App Store. An iPad
 * asks for desktop sites by default and calls itself a Mac, so "not Android"
 * is the only test that sends it the right way, and a real desktop lands on
 * the App Store's web page, which is a fine place to be.
 *
 * Keep this path OUT of /.well-known/apple-app-site-association and the
 * app's Android intentFilters. A path claimed there opens the app instead of
 * the browser, and the button would go nowhere.
 */
const APP_STORE_URL = 'https://apps.apple.com/us/app/instacal/id6743951306'
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.digitaldelight.InstaCal'

// The answer depends on who asks, so it is never prerendered or cached.
export const dynamic = 'force-dynamic'

export function GET(request) {
  const ua = request.headers.get('user-agent') ?? ''
  const target = /Android/i.test(ua) ? PLAY_STORE_URL : APP_STORE_URL

  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      'Cache-Control': 'no-store',
      Vary: 'User-Agent',
    },
  })
}
