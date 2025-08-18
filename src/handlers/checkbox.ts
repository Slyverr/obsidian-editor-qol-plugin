import { MarkdownView } from "obsidian";
import EditorQoLPlugin from "src/main";

type MarkdownCheckbox = {
	line: number;
	text: string;
	level: number;
	checked: boolean;
	updated: boolean;
};

const CHECKBOX_REGEX = /^(\t*)[-*+]\s+\[([ xX])\] /;

let oldContent: string = "";
let active: string = "";
let locked = false;

function extractUpdatedGroups(
	oldContent: string,
	newContent: string,
): MarkdownCheckbox[][] {
	const oldLines = oldContent.split("\n");
	const newLines = newContent.split("\n");

	const groups: MarkdownCheckbox[][] = [];
	let group: MarkdownCheckbox[] = [];

	let groupLevel = -1;
	let updated = false;

	for (let i = 0; i < Math.max(oldLines.length, newLines.length); i++) {
		const oldLine = oldLines[i];
		const newLine = newLines[i];

		const oldMatch = oldLine?.match(CHECKBOX_REGEX);
		const newMatch = newLine?.match(CHECKBOX_REGEX);
		if (!newMatch) continue;

		if (groupLevel == -1) {
			groupLevel = newMatch[1].length;
		}

		const checkbox: MarkdownCheckbox = {
			line: i,
			text: newLine,
			level: newMatch[1].length,
			checked: newMatch[2].toLowerCase() === "x",

			updated: Boolean(
				oldMatch && oldMatch[2]?.toLowerCase() !== newMatch[2]?.toLowerCase(),
			),
		};

		if (newMatch && newMatch[1].length <= groupLevel) {
			if (updated) groups.push(group); // Ignore group if no checkbox inside changed

			group = [];
			updated = false;
			groupLevel = newMatch[1].length;
		}

		if ((oldMatch || newMatch) && oldLine !== newLine) {
			updated = true;
		}
		updated ||= checkbox.updated;
		group.push(checkbox);
	}

	if (updated && group.length > 0) groups.push(group);
	return groups;
}

function syncGroup(
	lines: MarkdownCheckbox[],
	start: number,
): [number, boolean] {
	console.log("Calling with: ", start);
	if (start < 0 || start >= lines.length) return [start, false];

	const current = lines[start];
	let i = start + 1;

	// If current is updatd, set all children to match
	if (current.updated) {
		while (i < lines.length && lines[i].level > current.level) {
			lines[i++].checked = current.checked;
		}

		return [i, current.checked];
	}

	let checked = true;

	while (i < lines.length && lines[i].level > current.level) {
		const [nextIndex, childChecked] = syncGroup(lines, i);
		checked &&= childChecked;

		i = nextIndex;
	}

	// If there are children update checked status
	if (i > start + 1) current.checked = checked;

	return [i, current.checked];
}

export default function registerCheckboxHandlers(plugin: EditorQoLPlugin) {
	plugin.registerEvent(
		plugin.app.workspace.on("active-leaf-change", () => {
			if (!plugin.settings.checkbox.enabled) return;

			const view = plugin.app.workspace.getActiveViewOfType(MarkdownView);

			oldContent = view?.editor.getValue() || "";
			active = view?.getDisplayText() || "";
		}),
	);

	plugin.registerEvent(
		plugin.app.workspace.on("editor-change", (editor) => {
			if (!plugin.settings.checkbox.enabled || locked) return;

			const groups = extractUpdatedGroups(oldContent, editor.getValue());
			if (groups.length === 0) return;

			locked = true;

			groups.forEach((group) => {
				syncGroup(group, 0);

				group.forEach((line) => {
					editor.setLine(
						line.line,
						line.text.replace(/\[([ xX])\]/, `[${line.checked ? "x" : " "}]`),
					);
				});
			});

			oldContent = editor.getValue();
			locked = false;
		}),
	);
}
