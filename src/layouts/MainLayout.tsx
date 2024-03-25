import { FloatButton, Image, Spin, Table, Tooltip } from 'antd';
import useSwrInfiniteFetch from '../hooks/useSwrInfiniteFetch';
import InfiniteScroll from 'react-infinite-scroll-component';
import MainNavbar from './MainNavbar';
import './MainLayout.scss';
import { ColumnsType } from 'antd/es/table';
import { Suspense, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import picture from '../assets/pexels-barthy-bonhomme-185030.jpg';
import { FaPause, FaPlay } from 'react-icons/fa';
const MainLayout = () => {
	const [play, setPlay] = useState<{
		path: string;
		playing: boolean;
	}>({ path: '', playing: false });
	let tempSendInfo = {
		limit: 20,
	};

	const { data, isLoading, isError, isEnd, loadMore } = useSwrInfiniteFetch('/get-all', {
		...tempSendInfo,
	});

	const handleFetchMore = () => {
		loadMore();
	};

	const columns: ColumnsType<{
		downloaded?: number;
		filename?: string;
		path?: string;
		uuid?: string;
	}> = [
		{
			title: '',
			dataIndex: 'logos',
			width: 150,
			render: (_, record) => (
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Image src={picture} style={{ height: '60px' }} preview={false} />
				</div>
			),
		},
		{
			title: 'Artist & Title',
			dataIndex: 'name',
			render: (_, record) => (
				<div>
					<p>{record.filename}</p>
				</div>
			),
		},
		{
			title: 'Play',
			key: 'Actions',
			// fixed: 'right',
			width: 100,
			render: (_, record) => (
				<Tooltip title={play.playing ? 'Pause' : 'Play'}>
					{play.path === record?.path && play.playing ? (
						<FaPause
							style={{ fontSize: '16px' }}
							onClick={() =>
								setPlay({
									path: '',
									playing: false,
								})
							}
						/>
					) : (
						<FaPlay
							style={{ fontSize: '16px', cursor: 'pointer' }}
							onClick={() =>
								setPlay({
									path: record?.path ?? '',
									playing: true,
								})
							}
						/>
					)}
				</Tooltip>
			),
		},
	];

	return (
		<div style={{ minHeight: '100vh', overflowX: 'auto', height: '100%', position: 'relative' }}>
			<MainNavbar />
			<FloatButton.BackTop visibilityHeight={400} />
			<Suspense fallback={<Spin />}>
				<Content style={{ marginTop: '90px' }}>
					{data?.length ? (
						<InfiniteScroll
							style={{ overflow: 'hidden' }}
							dataLength={data?.length}
							next={() => handleFetchMore()}
							hasMore={!isEnd}
							loader={<Spin />}
							endMessage={
								<div style={{ textAlign: 'center', padding: '40px' }}>
									<div style={{ marginBottom: '20px', color: 'rgba(0, 0, 0, 0.3)' }}>
										No more data!
									</div>
								</div>
							}
						>
							{/* <Musics data={data} /> */}
							<Table
								// onRow={record => handleRowClick(record)}
								columns={columns}
								dataSource={data}
								scroll={{ x: '100%' }}
								pagination={false}
							/>
						</InfiniteScroll>
					) : isLoading ? (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								height: '100vh',
								width: '100%',
							}}
						>
							<Spin size='large' />
						</div>
					) : (
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							No data
						</div>
					)}
				</Content>
				{data?.length ? (
					<audio
						onPause={() =>
							setPlay({
								...play,
								playing: false,
							})
						}
						onPlay={() =>
							setPlay({
								...play,
								playing: true,
							})
						}
						autoPlay
						style={{
							width: '100%',
							position: 'fixed',
							bottom: '0',
						}}
						controls
						src={import.meta.env.VITE_STATIC_URL?.toString() + play.path}
					/>
				) : (
					''
				)}
			</Suspense>

			{/* </div> */}
		</div>
	);
};

export default MainLayout;
