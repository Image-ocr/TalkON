# Contributing to TalkON

Thank you for your interest in contributing to TalkON! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and professional in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/talkon.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Run tests: `npm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to your fork: `git push origin feature/amazing-feature`
8. Open a Pull Request

## Development Setup

See the main README.md for detailed setup instructions.

## Coding Standards

- Follow TypeScript best practices
- Use ESLint and Prettier (configuration provided)
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Keep functions small and focused
- Use descriptive variable names

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Example:
```
feat(auth): add two-factor authentication

Implement TOTP-based 2FA for enhanced security.
Users can now enable 2FA in their settings.

Closes #123
```

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the documentation
3. Ensure all tests pass
4. Ensure code follows style guidelines
5. Request review from maintainers
6. Address review feedback
7. Once approved, your PR will be merged

## Testing

- Write unit tests for all new features
- Ensure existing tests pass
- Add integration tests where appropriate
- Test edge cases and error scenarios

## Security

If you discover a security vulnerability, please email security@talkon.app instead of creating a public issue.

## Questions?

Feel free to open an issue for questions or join our Discord community.

Thank you for contributing to TalkON! 🚀
