export async function GET() {
  const data = {
    applinks: {
      apps: [],
      details: [
        {
          appID: 'SRHQX85SN8.com.digitaldelight.InstaCal',
          paths: ['/meal/*', '/workout/*', '/user/*', '/r/*'],
        },
        {
          appID: 'SRHQX85SN8.com.digitaldelight.InstaCal.staging',
          paths: ['/meal/*', '/workout/*', '/user/*', '/r/*'],
        },
      ],
    },
  }

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
