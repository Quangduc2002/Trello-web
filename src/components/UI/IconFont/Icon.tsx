/* eslint-disable react/prop-types */
import React from 'react';

import classNames from 'classnames';

import { Ticon } from '../../../../public/svgtocss/icon-type';

export const Icon = ({
  className = '',
  color = 'text-primary',
  ...props
}: React.SVGProps<SVGSVGElement> & { icon: Ticon }) => {
  // @ts-ignore
  return <i className={classNames(props.icon, className, color)} {...props} />;
};
