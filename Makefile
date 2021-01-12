install: install-deps

make:
	bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test