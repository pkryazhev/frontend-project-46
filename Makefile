gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
install:
	npm ci
test:
	npm test

.PHONY: install lint test