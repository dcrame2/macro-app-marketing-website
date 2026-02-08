export async function GET() {
  const data = {
    applinks: {
      apps: [],
      details: [
        {
          appID: 'SRHQX85SN8.com.digitaldelight.InstaCal',
          paths: ['/meal/*', '/workout/*', '/user/*'],
        },
        {
          appID: 'SRHQX85SN8.com.digitaldelight.InstaCal.staging',
          paths: ['/meal/*', '/workout/*', '/user/*'],
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
