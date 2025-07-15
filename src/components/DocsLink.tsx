import { CLink } from '@coreui/react'
import { memo } from 'react'

type DocsLinkProps = {
  href?: string
  name?: string
  text?: string
}

const DocsLink = (props: DocsLinkProps) => {
  const { href, name, text, ...rest } = props

  const _href = name ? `https://coreui.io/react/docs/components/${name}` : href

  return (
    <div className="float-end">
      <CLink
        {...rest}
        href={_href}
        rel="noreferrer noopener"
        target="_blank"
        className="card-header-action"
      >
        <small className="text-body-secondary">{text || 'docs'}</small>
      </CLink>
    </div>
  )
}

export default memo(DocsLink)
