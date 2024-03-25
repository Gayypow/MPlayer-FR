import { Divider, Typography } from 'antd';
import { FaMusic } from 'react-icons/fa';

const Musics = ({
	data,
}: {
	data: { uuid: string; filename: string; composer: string; path: string }[];
}) => {
	return data?.map((e: { uuid: string; filename: string; composer: string; path: string }, i) => {
		return (
			<>
				{i > 0 && <Divider style={{ margin: '5px 0' }} />}
				<div
					key={e.uuid}
					style={{
						padding: '20px',
						backgroundColor: '#FFFFFF',
						borderRadius: '10px',
						marginTop: i > 0 ? '10px' : 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
						<FaMusic style={{ fontSize: '20px' }} />
						<div>
							<Typography.Paragraph style={{ marginBottom: '0' }}>
								{e.filename}
							</Typography.Paragraph>
							<Typography.Paragraph style={{ marginBottom: '0' }}>
								{e.composer}
							</Typography.Paragraph>
						</div>
					</div>
					<audio controls src={import.meta.env.VITE_STATIC_URL?.toString() + e.path} />
				</div>
			</>
		);
	});
};

export default Musics;
