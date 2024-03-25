import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { DefaultTFuncReturn } from 'i18next';
import { TButtonLoading, TOptions, TPrinters } from '../../types/generalType';
import { TEmployee } from '../../types/employee';

type TWarningModalInfo = {
	title?: DefaultTFuncReturn;
	body?: DefaultTFuncReturn;
	buttonTitle?: DefaultTFuncReturn;
};

type SliceState = {
	tableSearchValue: string;
	tableDisplayMode: string;
	isSidebarOpen: boolean;
	breadcrumbs: { title: any; path?: string }[];
	isSearchModalOpen: any;
	companyOptions: TOptions;
	modelOptions: string[];
	employeeOptions: TOptions;
	jobOptions: TOptions;
	groupOptions: TOptions;
	divisionOptions: TOptions;
	departmentOptions: TOptions;
	treeOptions: TOptions;
	assetOptions: TOptions;
	responsibilityOptions: TOptions;
	isWarningModalOpen: boolean;
	warningModalInfo: TWarningModalInfo;
	isPrintModalOpen: boolean;
	isSelectModalOpen: boolean;
	isSettingsModalOpen: boolean;
	isTokenConflictModalOpen: boolean;
	transferModalOpen: boolean;
	printersData: TPrinters;
	filterExists: boolean;
	isPopoverOpen: boolean;
	myReviewOpen: boolean;
	myControlOpen: boolean;
	myReControlOpen: boolean;
	revalidateAll: boolean;
	buttonLoading: TButtonLoading;
	fileListState: any;
	isInstallModalOpen: boolean;
	languages: { label: string; key: string }[];
	language: string;
	me: TEmployee;
};

const initialState: SliceState = {
	tableSearchValue: '',
	tableDisplayMode: localStorage.getItem('tableDisplayMode') || 'table',
	isSidebarOpen: false,
	breadcrumbs: [],
	isSearchModalOpen: {},
	modelOptions: [],
	companyOptions: { data: [], isEnd: false },
	employeeOptions: { data: [], isEnd: false },
	jobOptions: { data: [], isEnd: false },
	groupOptions: { data: [], isEnd: false },
	divisionOptions: { data: [], isEnd: false },
	departmentOptions: { data: [], isEnd: false },
	treeOptions: { data: [], isEnd: false },
	assetOptions: { data: [], isEnd: false },
	responsibilityOptions: { data: [], isEnd: false },
	isWarningModalOpen: false,
	warningModalInfo: {},
	isPrintModalOpen: false,
	isSelectModalOpen: false,
	isSettingsModalOpen: false,
	transferModalOpen: false,
	isPopoverOpen: false,
	myReviewOpen: false,
	myControlOpen: false,
	myReControlOpen: false,
	printersData: { data: [] },
	filterExists: false,
	revalidateAll: false,
	buttonLoading: {
		save: false,
		transferResponsibility: false,
		delete: false,
		submit: false,
		readNotification: false,
		unreadNotification: false,
		reassignTask: false,
		makeTaskDone: false,
		rejectTask: false,
		reevaluateTask: false,
		ok: false,
		ficheItemDelete: false,
	},
	fileListState: '',
	isTokenConflictModalOpen: false,
	isInstallModalOpen: false,
	languages: [],
	language: localStorage.getItem('I18N_LANGUAGE') ?? 'tk',
	me: {} as TEmployee,
};

const generalSlice = createSlice({
	name: 'general',
	initialState,
	reducers: {
		setTableSearchValue(state, action: PayloadAction<string>) {
			state.tableSearchValue = action.payload;
		},
		setTableDisplayMode(state, action: PayloadAction<string>) {
			state.tableDisplayMode = action.payload;
			localStorage.setItem('tableDisplayMode', action.payload);
		},
		setIsSidebarOpen(state, action: PayloadAction<boolean>) {
			state.isSidebarOpen = action.payload;
		},
		setBreadcrumbs(state, action: PayloadAction<{ title: any; path?: string }[]>) {
			state.breadcrumbs = action.payload;
		},

		setIsSearchModalOpen(state, action: PayloadAction<any>) {
			state.isSearchModalOpen = action.payload;
		},
		setCompanyOptions(state, action: PayloadAction<TOptions>) {
			state.companyOptions = action.payload;
		},
		setModelOptions(state, action: PayloadAction<{ data: string[] }>) {
			state.modelOptions = action.payload.data;
		},
		setEmployeeOptions(state, action: PayloadAction<TOptions>) {
			state.employeeOptions = action.payload;
		},
		setJobOptions(state, action: PayloadAction<TOptions>) {
			state.jobOptions = action.payload;
		},
		setGroupOptions(state, action: PayloadAction<TOptions>) {
			state.groupOptions = action.payload;
		},
		setDivisionOptions(state, action: PayloadAction<TOptions>) {
			state.divisionOptions = action.payload;
		},
		setDepartmentOptions(state, action: PayloadAction<TOptions>) {
			state.departmentOptions = action.payload;
		},
		setTreeOptions(state, action: PayloadAction<TOptions>) {
			state.treeOptions = action.payload;
		},
		setAssetOptions(state, action: PayloadAction<TOptions>) {
			state.assetOptions = action.payload;
		},
		setResponsibilityOptions(state, action: PayloadAction<TOptions>) {
			state.responsibilityOptions = action.payload;
		},

		setIsWarningModalOpen(state, action: PayloadAction<boolean>) {
			state.isWarningModalOpen = action.payload;
		},
		setWarningModalInfo(state, action: PayloadAction<TWarningModalInfo>) {
			state.warningModalInfo = action.payload;
		},
		setIsPrintModalOpen(state, action: PayloadAction<boolean>) {
			state.isPrintModalOpen = action.payload;
		},
		setIsSelectModalOpen(state, action: PayloadAction<boolean>) {
			state.isSelectModalOpen = action.payload;
		},
		setIsSettingsModalOpen(state, action: PayloadAction<boolean>) {
			state.isSettingsModalOpen = action.payload;
		},
		setIsTransferModalOpen(state, action: PayloadAction<boolean>) {
			state.transferModalOpen = action.payload;
		},
		setIsPopoverOpen(state, action: PayloadAction<boolean>) {
			state.isPopoverOpen = action.payload;
		},
		setMyReviewOpen(state, action: PayloadAction<boolean>) {
			state.myReviewOpen = action.payload;
		},
		setMyСontrolOpen(state, action: PayloadAction<boolean>) {
			state.myControlOpen = action.payload;
		},
		setMyReСontrolOpen(state, action: PayloadAction<boolean>) {
			state.myReControlOpen = action.payload;
		},
		setPrintersData(state, action: PayloadAction<TPrinters>) {
			state.printersData = action.payload;
		},
		setFilterExists(state, action: PayloadAction<boolean>) {
			state.filterExists = action.payload;
		},
		setRevalidateAll(state, action: PayloadAction<boolean>) {
			state.revalidateAll = action.payload;
		},
		setButtonLoading(state, action: PayloadAction<TButtonLoading>) {
			state.buttonLoading = { ...state.buttonLoading, ...action.payload };
		},
		setFileListState(state, action: PayloadAction<any>) {
			state.fileListState = action.payload;
		},
		setIsTokenConflictModalOpen(state, action: PayloadAction<any>) {
			state.isTokenConflictModalOpen = action.payload;
		},

		setIsInstallModalOpen(state, action: PayloadAction<boolean>) {
			state.isInstallModalOpen = action.payload;
		},
		setLanguages(state, action: PayloadAction<{ label: string; key: string }[]>) {
			state.languages = action.payload;
		},
		setLanguage(state, action: PayloadAction<string>) {
			state.language = action.payload;
		},
		setMe(state, action: PayloadAction<TEmployee>) {
			state.me = action.payload;
		},
	},
});

export const {
	setTableSearchValue,
	setTableDisplayMode,
	setIsSidebarOpen,
	setBreadcrumbs,
	setIsSearchModalOpen,
	setModelOptions,
	setCompanyOptions,
	setEmployeeOptions,
	setJobOptions,
	setGroupOptions,
	setDivisionOptions,
	setDepartmentOptions,
	setTreeOptions,
	setAssetOptions,
	setIsWarningModalOpen,
	setWarningModalInfo,
	setIsPrintModalOpen,
	setIsSelectModalOpen,
	setResponsibilityOptions,
	setPrintersData,
	setFilterExists,
	setIsSettingsModalOpen,
	setIsPopoverOpen,
	setMyReviewOpen,
	setMyСontrolOpen,
	setMyReСontrolOpen,
	setRevalidateAll,
	setButtonLoading,
	setFileListState,
	setIsTokenConflictModalOpen,
	setIsTransferModalOpen,
	setIsInstallModalOpen,
	setLanguages,
	setLanguage,
	setMe,
} = generalSlice.actions;
export default generalSlice.reducer;
