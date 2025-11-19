/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SMART_CONTRACT_ADDRESS?: string;
	readonly VITE_POLYGON_MUMBAI_RPC?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
