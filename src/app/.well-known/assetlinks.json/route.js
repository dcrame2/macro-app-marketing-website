export async function GET() {
  const data = [
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'com.digitaldelight.InstaCal',
        sha256_cert_fingerprints: [
          '24:88:35:9D:59:01:46:B5:1B:DC:82:C9:C0:C3:F5:D4:9C:F6:B7:23:A6:71:53:6D:B3:53:31:CE:45:40:05:0F',
        ],
      },
    },
  ]

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
