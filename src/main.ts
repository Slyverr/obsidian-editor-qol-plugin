import { Plugin } from "obsidian";
import checkboxTreeSync from "./addons/checkbox-tree-sync";
import SettingsTab, { DEFAULT_SETTINGS, Settings } from "./settings";
import { Addon } from "./types/global";

export const addons: Addon[] = [checkboxTreeSync];

export default class EditorQoLPlugin extends Plugin {
	settings: Settings;

	async onload() {
		await this.loadSettings();

		if (!Object.isEmpty(this.settings))
			this.addSettingTab(new SettingsTab(this));

		addons.forEach((addon) => addon.register(this));
	}

	async onunload() {
		addons.forEach((addon) => addon.unregister(this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
