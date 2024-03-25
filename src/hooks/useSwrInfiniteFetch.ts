import api from '../plugins/axios';
import useSWRInfinite from 'swr/infinite';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setRevalidateAll } from '../store/general/generalSlice';

const useSwrInfiniteFetch = (url: string, params: any, cb?: any) => {
	const { revalidateAll } = useAppSelector(state => state.general);
	const dispatch = useAppDispatch();
	const isObject = (obj: { label: string; value: any } | string | any) => {
		if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
			return obj.value;
		}
		return obj;
	};
	type ParamsType = Record<string, any>;
	const emptyRemover = <T extends ParamsType>(params: T): T => {
		let returnParams = { ...params };
		for (let value in returnParams) {
			if (
				returnParams[value] === '' ||
				returnParams[value] === undefined ||
				returnParams[value] === null
			) {
				delete returnParams[value];
			}
			if (Array.isArray(returnParams[value])) {
				if (returnParams[value]?.length) {
					returnParams[value] = returnParams[value]
						.map((rp: any) => isObject(rp))
						.filter((rpf: any) => rpf !== '');
				} else {
					delete returnParams[value];
				}
			}
		}
		return returnParams;
	};
	// const { mutate } = useSWRConfig();
	const fetcher = async (url: any) => {
		const response = await api.get(url[0], { params: url[1] });
		dispatch(setRevalidateAll(false));
		return response?.data;
	};

	const getKey = (pageIndex: number, previousPageData: any) => {
		if (previousPageData && !previousPageData.length) return null; // Reached the end

		let paramsCopy = { ...params };
		paramsCopy = emptyRemover(paramsCopy);
		Object.keys(paramsCopy).forEach(key => {
			if (Array.isArray(paramsCopy[key])) {
				paramsCopy[key] = paramsCopy[key].map((info: any) => isObject(info));
			} else if (
				typeof paramsCopy[key] === 'object' &&
				paramsCopy[key] !== null &&
				!Array.isArray(paramsCopy[key])
			) {
				paramsCopy[key] = isObject(paramsCopy[key]);
			}
		});

		return [url, { ...paramsCopy, offset: pageIndex * paramsCopy?.limit }];
	};

	const { data, error, size, setSize, mutate } = useSWRInfinite(getKey, fetcher, {
		revalidateFirstPage: false,
		revalidateAll,
	});

	const isLoadingInitialData = !data && !error;
	const isLoadingMore = isLoadingInitialData || (data && typeof data[size - 1] === 'undefined');

	const isError = error ? true : false;
	const isEnd = data ? data?.[data?.length - 1]?.length < params.limit : false;

	const loadMore = () => {
		if (!isEnd && !isLoadingMore) {
			setSize(size + 1);
		}
	};

	const refreshData = () => {
		mutate();
	};

	let returnData = data ? [].concat(...data) : [];
	if (cb) {
		returnData = cb(returnData);
	}
	return {
		data: returnData,
		isLoading: isLoadingInitialData,
		isLoadingMore,
		isError,
		isEnd,
		loadMore,
		refreshData,
	};
};

export default useSwrInfiniteFetch;
