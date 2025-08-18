import { PluginSettingTab, Setting } from "obsidian";
import EditorQoLPlugin from "./main";

export interface Settings {
	checkbox: {
		enabled: boolean;
	};
}

export const DEFAULT_SETTINGS: Partial<Settings> = {
	checkbox: {
		enabled: true,
	},
};

export default class SettingsTab extends PluginSettingTab {
	private plugin: EditorQoLPlugin;

	constructor(plugin: EditorQoLPlugin) {
		super(plugin.app, plugin);

		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl).setName("Checkbox").setHeading();

		new Setting(containerEl)
			.setName("Checkbox Tree Sync")
			.setDesc(
				"Synchronizes parent and child checkboxes in a hierarchy within a note.",
			)
			.addToggle((toggle) => {
				toggle.setValue(this.plugin.settings.checkbox.enabled);

				toggle.onChange(async (value) => {
					this.plugin.settings.checkbox.enabled = value;
					await this.plugin.saveSettings();
				});
			});
	}
}
