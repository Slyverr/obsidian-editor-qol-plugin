# Contributing to the project

Thanks for considering contributing! Every fix, feature, or idea helps improve the plugin for all Obsidian users.

## Ways to Contribute

- Report bugs or usability issues
- Suggest new features or improvements
- Submit pull requests (code or docs)
- Improve documentation or examples
- Help other users in discussions

## Getting Started

1. **Fork & Clone**:

    ```bash
    git clone https://github.com/Slyverr/obsidian-editor-qol-plugin.git
    ```

2. **Install Dependencies**:

    ```bash
    pnpm install
    ```

3. **Create a Branch**:

    ```bash
    git checkout -b feature/your-branch-name
    ```

4. **Build & Test in Obsidian**
    - Run the dev build:

        ```bash
        pnpm dev
        ```

    - Link the folder to your Obsidian vault’s `.obsidian/plugins/` directory for testing.

## Submitting Changes

1. **Commit Messages** must follow [Conventional Commits](https://www.conventionalcommits.org/) with **scopes**:

    ```
    feat(ui): add command palette option
    fix(settings): save hotkey properly
    docs(readme): update installation guide
    ```

    - **types**: `feat`, `fix`, `docs`, `refactor`, `chore`
    - **scopes** (suggested):
        - `ui` → user interface changes
        - `commands` → new commands or fixes
        - `settings` → plugin settings/config handling
        - `core` → logic not tied to UI or settings
        - `docs` → documentation updates

2. **Push**:

    ```bash
    git push origin feature/your-branch-name
    ```

3. **Open a Pull Request**:
    - Describe what you changed and why
    - Add screenshots/GIFs if it’s a UI change

4. **Review**:  
   Make updates if requested. Merges happen once it meets project standards.

## Style Guidelines

- Follow existing code conventions
- Keep code readable and documented
- Use meaningful names for commands and settings

## Reporting Issues

When filing an issue, please include:

- Clear, descriptive title
- Steps to reproduce (if a bug)
- Expected vs. actual behavior
- Screenshots or logs (if relevant)

Thanks for helping improve this project! 🎉
