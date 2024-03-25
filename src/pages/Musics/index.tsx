import { useState, type FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useSwrInfiniteFetch from '../../hooks/useSwrInfiniteFetch';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaMusic } from 'react-icons/fa';
import { Button, Divider, Input, Modal, Spin, Typography, notification } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadFile } from 'antd/lib';
import { CloseOutlined, CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setButtonLoading, setRevalidateAll } from '../../store/general/generalSlice';
import api from '../../plugins/axios';
import { AxiosResponse } from 'axios';

const Musics: FC = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { buttonLoading } = useAppSelector(state => state.general);
	const [sendInfo, setSendInfo] = useState<{
		composer?: string;
		musicName?: string;
	}>({});
	const [uuid, setUuid] = useState('');

	let tempSendInfo = {
		limit: 20,
	};

	const { data, isLoading, isError, isEnd, loadMore, refreshData } = useSwrInfiniteFetch(
		'/get-all',
		{
			...tempSendInfo,
		}
	);
	const handleFetchMore = () => {
		loadMore();
	};

	const deleteMusic = async (id: string): Promise<AxiosResponse> =>
		api.delete(`/v1/admin/delete-one/${id}`);
	const deleteAll = async (): Promise<AxiosResponse> => api.delete(`/v1/admin/delete-all`);
	const deleteEmptyRows = async (): Promise<AxiosResponse> =>
		api.delete(`/v1/admin/delete-empty-rows`);

	useEffect(() => {
		const func = async () => {
			try {
				await deleteEmptyRows();
			} catch (error) {
				console.log(error);
			}
		};
		func();
	}, []);

	const renderCardComponent = () => {
		return data?.map((e: { uuid: string; filename: string; composer: string; path: string }, i) => {
			return (
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
					<div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
						<audio controls src={import.meta.env.VITE_STATIC_URL?.toString() + e.path} />
						<Button
							type='primary'
							danger
							icon={<DeleteOutlined />}
							onClick={async () => {
								try {
									await deleteMusic(e.uuid);
									notification.success({
										message: t('Success'),
										description: t('Deleted Successfully'),
									});
									refreshData();
								} catch (error) {
									notification.error({
										message: t('Error'),
										description: t('Error on Delete'),
									});
								}
							}}
						></Button>
					</div>
				</div>
			);
		});
	};

	const showModal = () => {
		setSendInfo({});
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		dispatch(setButtonLoading({ save: true }));
		try {
			const response = await api.post(`v1/admin/set-file-name/${uuid}`, {
				...sendInfo,
			});
			if (response?.status?.toString()?.startsWith('2')) {
				notification.success({
					message: t('Success'),
					description: t('Added Successfully'),
				});
			}
			refreshData();
			dispatch(setButtonLoading({ save: false }));
			setIsModalOpen(false);
		} catch (err) {
			dispatch(setButtonLoading({ save: false }));
			notification.error({
				message: t('Error'),
				description: t('Some server error'),
			});
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
		console.log('info', info);
		let fileList = info.file.response?.uuid;
		setUuid(fileList ?? '');

		// You can set the fileList state here
	};
	console.log('didar', sendInfo);
	return (
		<div style={{ margin: '0 5px' }}>
			<div>
				<Button
					type='dashed'
					onClick={showModal}
					style={{ margin: '10px 0 0 30px', float: 'right' }}
				>
					Add music
				</Button>
				<Button
					type='primary'
					style={{ margin: '10px 0', float: 'right' }}
					onClick={async () => {
						try {
							await deleteAll();
							notification.success({
								message: t('Success'),
								description: t('Deleted Successfully'),
							});
							refreshData();
						} catch (error) {
							notification.error({
								message: t('Error'),
								description: t('Error on Delete'),
							});
						}
					}}
				>
					Delete all
				</Button>
				<Divider style={{ margin: '10px 0' }} />
			</div>
			{data?.length ? (
				<InfiniteScroll
					dataLength={data?.length}
					next={() => handleFetchMore()}
					hasMore={!isEnd}
					loader={<Spin />}
					endMessage={
						<div style={{ textAlign: 'center', padding: '40px' }}>
							<div style={{ marginBottom: '20px', color: 'rgba(0, 0, 0, 0.3)' }}>No Data</div>
						</div>
					}
				>
					{renderCardComponent()}
				</InfiniteScroll>
			) : isLoading ? (
				<Spin />
			) : (
				'No data'
			)}
			<Modal
				title='Add Music'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okButtonProps={{ loading: buttonLoading.save }}
			>
				<Input
					placeholder='Composer'
					value={sendInfo.composer}
					onChange={e => setSendInfo({ ...sendInfo, composer: e.target.value })}
				/>
				<Input
					style={{ marginTop: '10px' }}
					placeholder='Music name'
					value={sendInfo.musicName}
					onChange={e => setSendInfo({ ...sendInfo, musicName: e.target.value })}
				/>

				<Dragger
					action={import.meta.env.VITE_API_URL?.toString() + 'v1/admin/upload-file'}
					onChange={handleChange}
					maxCount={1}
					name='file'
					multiple
					style={{ borderRadius: '2px', marginTop: '10px' }}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column',
						}}
					>
						<p className='ant-upload-drag-icon'>
							<CloudUploadOutlined style={{ color: '#002453', width: '26px' }} />
						</p>
					</div>
				</Dragger>
			</Modal>
		</div>
	);
};

export default Musics;
