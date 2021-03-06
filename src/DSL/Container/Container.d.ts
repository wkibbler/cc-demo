
import * as React from "react";

import {BsPrefixComponent} from "../tshelpers";

export interface ContainerProps {
  fluid?: boolean | 'sm' | 'md' | 'lg' | 'xl';
}

declare class Container<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, ContainerProps> {}

export default Container;