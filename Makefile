gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
install:
	npm ci
test:
	npm test -- --coverage

.PHONY: install lint test