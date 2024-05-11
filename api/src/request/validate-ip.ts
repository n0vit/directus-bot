import { useEnv } from '@directus/env';
import os from 'node:os';

export const validateIP = async (ip: string, url: string) => {
	const env = useEnv();

	if ((env['IMPORT_IP_DENY_LIST'] as string[]).includes(ip)) {
		throw new Error(`Requested URL "${url}" resolves to a denied IP address`);
	}

	if ((env['IMPORT_IP_DENY_LIST'] as string[]).includes('0.0.0.0')) {
		const networkInterfaces = os.networkInterfaces();

		for (const networkInfo of Object.values(networkInterfaces)) {
			if (!networkInfo) continue;

			for (const info of networkInfo) {
				if (info.address === ip) {
					throw new Error(`Requested URL "${url}" resolves to a denied IP address`);
				}
			}
		}
	}
};