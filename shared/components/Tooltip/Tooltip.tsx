import { PropsWithChildren } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import style from './styles.module.css';

type TooltipProps = PropsWithChildren<{
	title: string;
	placement?: 'top' | 'bottom' | 'left' | 'right';
}>;

export const Tooltip = (props: TooltipProps) => {
	const { title, placement = 'top', children } = props;

	return (
		<TooltipPrimitive.Provider delayDuration={800} skipDelayDuration={500}>
			<TooltipPrimitive.Root delayDuration={0}>
				<TooltipPrimitive.Trigger asChild>
					{children}
				</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Content
					className={style['tooltip-content']}
					side={placement}
				>
					{title}
				</TooltipPrimitive.Content>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
};

Tooltip.displayName = 'Tooltip';
