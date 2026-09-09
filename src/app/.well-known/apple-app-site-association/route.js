export const dynamic = 'force-static'

export async function GET() {
  const data = {
    applinks: {
      apps: [],
      details: [
        // Keep this list in step with the Android `intentFilters` block in the
        // app's app.config.js. Android names each path there; iOS claims the
        // whole domain and lets this file decide, so a path missing here just
        // opens the website instead of the app, silently.
        {
          appID: 'SRHQX85SN8.com.digitaldelight.InstaCal',
          paths: ['/meal/*', '/workout/*', '/user/*', '/r/*', '/challenges/*'],
        },
        {
          appID: 'SRHQX85SN8.com.digitaldelight.InstaCal.staging',
          paths: ['/meal/*', '/workout/*', '/user/*', '/r/*', '/challenges/*'],
        },
      ],
    },
  }

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  })
}
