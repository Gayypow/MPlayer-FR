import React from 'react';
import styles from '../styles/cardComponent.module.scss';
import { useTranslation } from 'react-i18next';
import { Divider } from 'antd';

type TRow = {
	label: string;
	value: any;
	display?: 'row' | 'column';
	divider?: boolean;
};
type TProps = {
	rows: TRow[];
	header: any;
	onClick: () => void;
	buttons?: any;
};
function CardComponent(props: TProps) {
	const { rows, header, onClick, buttons } = props;
	const { t } = useTranslation();

	return (
		<div className={styles['card-component']} onClick={onClick}>
			<div>
				<div className={styles['header']}>{header}</div>
				<Divider style={{ margin: '8px 0' }} />
				<div className={styles['rows']}>
					{rows?.map((row: TRow) => {
						const { label, value, display, divider } = row;
						return (
							<>
								<div
									className={styles['one-row']}
									style={{
										flexDirection: display ?? 'row',
										alignItems: display === 'row' ? 'center' : 'flex-start',
									}}
								>
									<div className={styles['left']}>{t(label)}</div>
									<div
										className={styles['right']}
										style={{ width: display === 'column' ? '100%' : 'auto' }}
									>
										{value}
									</div>
								</div>
								{divider ? <Divider style={{ margin: '8px 0' }} /> : null}
							</>
						);
					})}
				</div>
			</div>
			{buttons ? (
				<div className={styles['buttons']}>
					<Divider style={{ margin: '10px 0' }} />
					{buttons}
				</div>
			) : null}
		</div>
	);
}

export default React.memo(CardComponent);
