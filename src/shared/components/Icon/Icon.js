import { Icon as BaseIcon, Tooltip } from '@material-ui/core'
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
  variant,
  color,
  size,
  ...props
}) {
  if (title) {
    return (
      <Tooltip title={title}>
        <BaseIcon
          {...props}
          aria-label={title}
          className={cx(className, `${variants[variant]} fa-${name}`)}
          color={color}
          fontSize={size}
        />
      </Tooltip>
    )
  }

  return (
    <BaseIcon
      {...props}
      aria-label={title}
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
  /** The icon title. */
  title: PropTypes.string,
  /** The name of the icon. */
  variant: PropTypes.oneOf(Object.keys(variants)),
  /** The size to show the icon. */
  color: PropTypes.oneOf([ 'primary', 'secondary', 'action', 'error', 'disabled' ]),
  /** The color to show the icon. */
  size: PropTypes.oneOf([ 'default', 'small', 'large' ]),
}
