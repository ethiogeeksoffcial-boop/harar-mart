import { Helmet } from 'react-helmet-async'

interface Props {
  title?: string
  description?: string
  path?: string
}

const BASE = 'Harar Mart'
const BASE_DESC = "Ethiopia's B2B wholesale marketplace — verified suppliers, bulk pricing, global trade."
const DOMAIN = 'https://hararmart.com'

export function SEO({ title, description, path = '' }: Props) {
  const fullTitle = title ? `${title} — ${BASE}` : BASE
  const desc      = description ?? BASE_DESC
  const url       = `${DOMAIN}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url"         content={url} />
      <meta property="og:type"        content="website" />
    </Helmet>
  )
}
