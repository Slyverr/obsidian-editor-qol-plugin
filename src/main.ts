import { Plugin } from "obsidian";
import registerCheckboxHandlers from "./handlers/checkbox";
import SettingsTab, { DEFAULT_SETTINGS, Settings } from "./settings";
import { HandlerRegistrar } from "./types/event-handlers";

const handlers: HandlerRegistrar[] = [registerCheckboxHandlers];

export default class EditorQoLPlugin extends Plugin {
	settings: Settings;

	async onload() {
		await this.loadSettings();

		if (!Object.isEmpty(this.settings))
			this.addSettingTab(new SettingsTab(this));

		handlers.forEach((register) => register(this));
	}

	async onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
