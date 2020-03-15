import { Icon as BaseIcon } from '@material-ui/core'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import '@fortawesome/fontawesome-pro/css/all.css'

const variants = {
  solid: 'fas',
  regular: 'far',
  light: 'fal',
  duotone: 'fad',
  brands: 'fab',
}

export default function Icon({
  className,
  name,
  title,
  label,
  variant,
  color,
  size,
  ...props
}) {
  return (
    <BaseIcon
      {...props}
      aria-hidden={false}
      title={title || label}
      className={cx(className, `${variants[variant]} fa-${name}`)}
      color={color}
      fontSize={size}
    />
  )
}

Icon.defaultProps = {
  variant: 'solid',
}

Icon.propTypes = {
  /** A class to apply to the element. */
  className: PropTypes.string,

  /** The name of the icon. */
  name: PropTypes.string.isRequired,
  /** The tooltip title. */
  title: PropTypes.string,
  /** The icon label. */
  label: PropTypes.string,
  /** The name of the icon. */
  variant: PropTypes.oneOf(Object.keys(variants)),
  /** The size to show the icon. */
  color: PropTypes.oneOf([ 'primary', 'secondary', 'action', 'error', 'disabled' ]),
  /** The color to show the icon. */
  size: PropTypes.oneOf([ 'default', 'small', 'large' ]),
}
