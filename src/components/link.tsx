import * as Headless from '@headlessui/react'
import { Link as RouterLink, type LinkProps } from 'react-router-dom'
import React, { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  props: { href: string } & Omit<LinkProps, 'to'> & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive>
      <RouterLink {...props} to={props.href} ref={ref} />
    </Headless.DataInteractive>
  )
})
