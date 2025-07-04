import { DurableObject } from 'cloudflare:workers';

export class UserDO extends DurableObject {
	/**
	 * @param {DurableObjectState} state
	 * @param {Object} env
	 */
	constructor(state, env) {
		this.state = state;
		this.env = env;
	}

	/**
	 * RPC: Read a value by key from storage.
	 * @param {string} key
	 * @returns {Promise<any>} Stored value or undefined
	 */
	async read(key) {
		return await this.state.storage.get(key);
	}

	/**
	 * RPC: Write a value under a key in storage.
	 * @param {string} key
	 * @param {any} value
	 * @returns {Promise<any>} The written value
	 */
	async write(key, value) {
		await this.state.storage.put(key, value);
		return value;
	}

	/**
	 * RPC: Delete a key from storage.
	 * @param {string} key
	 * @returns {Promise<boolean>} True if deleted
	 */
	async delete(key) {
		await this.state.storage.delete(key);
		return true;
	}
}
