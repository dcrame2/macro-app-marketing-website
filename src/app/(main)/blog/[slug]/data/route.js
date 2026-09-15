import { getPost } from '@/lib/blog/data'
export async function GET(_request, { params }) {
  const post = await getPost(params.slug)
  if (!post?.content.data_snapshot)
    return Response.json({ error: 'Dataset not found' }, { status: 404 })
  return Response.json(
    {
      article: post.title,
      published_at: post.published_at,
      ...post.content.data_snapshot,
    },
    { headers: { 'Cache-Control': 'public, s-maxage=300' } },
  )
}
