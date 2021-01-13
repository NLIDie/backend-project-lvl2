# @hexlet/code

[![Node CI](https://github.com/NLIDie/backend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/NLIDie/backend-project-lvl2/actions?query=workflow%3A%22Node+CI%22)
[![Maintainability](https://api.codeclimate.com/v1/badges/140de6ed10660c022546/maintainability)](https://codeclimate.com/github/NLIDie/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/140de6ed10660c022546/test_coverage)](https://codeclimate.com/github/NLIDie/backend-project-lvl2/test_coverage)

## Development
### Setup

```sh
$ make install
```

### Run lint

```sh
$ make lint
```


### Run tests

```sh
$ make test
```

### Install package for testing

```sh
$ make link
```

### Uninstall package for testing

```sh
$ make unlink
```

## Use CLI 

### Get diff JSON files

```sh
$ gendiff filePath1.json filePath2.json
```

[![asciicast](https://asciinema.org/a/JWCKGcp8xWSj9b67cWmiMinmn.svg)](https://asciinema.org/a/JWCKGcp8xWSj9b67cWmiMinmn)

### Get diff YML, YAML files

```sh
$ gendiff filePath1.yml filePath2.yml
```

#
[![asciicast](https://asciinema.org/a/gfkqAGBNC4wb3Z5hsSAXdGZaN.svg)](https://asciinema.org/a/gfkqAGBNC4wb3Z5hsSAXdGZaN)

## Use in JavaScript code

```javascript
import genDiff from 'gendiff';

const diff = genDiff(filePath1, filePath2);
```
