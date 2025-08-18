import { PluginSettingTab } from "obsidian";
import EditorQoLPlugin from "./main";

export interface Settings {}

export const DEFAULT_SETTINGS: Partial<Settings> = {};

export default class SettingsTab extends PluginSettingTab {
	private plugin: EditorQoLPlugin;

	constructor(plugin: EditorQoLPlugin) {
		super(plugin.app, plugin);

		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
	}
}
