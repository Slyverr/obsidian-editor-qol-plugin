import EditorQoLPlugin from "src/main";

export interface Addon {
	register(plugin: EditorQoLPlugin): void;
	unregister(plugin: EditorQoLPlugin): void;
}
