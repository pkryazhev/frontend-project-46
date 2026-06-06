### Hexlet tests and linter status:
[![Actions Status](https://github.com/pkryazhev/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/pkryazhev/frontend-project-46/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pkryazhev_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=pkryazhev_frontend-project-46)

<h1>Difference Calculator</h1>
<p>Difference Calculator is a command-line utility that compares two configuration files and displays the differences between them.</p>
<h2>Features</h2>
<ul>
    <li>Supports JSON and YAML (.yml, .yaml) files</li>
    <li>Recursive comparison of nested structures</li>
    <li>Multiple output formats (stylish by default, plain, json)</li>
    <li>Can be used both as a CLI utility and as a JavaScript library</li>
</ul>
<h2>Installation</h2>

```bash
npm install
```

<h2>Usage</h2>
<h3>CLI</h3>

```bash
gendiff filepath1 filepath2
```

<h3>Specify output format:</h3>

```bash
gendiff --format plain filepath1 filepath2
gendiff --format json filepath1 filepath2
```

<h3>Library example</h3>

```bash
import genDiff from './src/index.js';

const diff = genDiff('file1.json', 'file2.json');
console.log(diff);
```

<h2>Available Formats</h2>

<h3>stylish</h3>
<p>Human-readable tree representation of differences.</p>
<a href='https://asciinema.org/a/EF6etK1pyoOLb7XN'>Демонстрация работы</a>

<h3>plain</h3>
<p>Text description of changes.</p>
<a href='https://asciinema.org/a/KAnVgGGy8NdLtwML'>Демонстрация работы</a>

<h3>JSON</h3>
<p>Machine-readable JSON representation of the diff tree.</p>
<a href='https://asciinema.org/a/7MHbNeWTGnY4UUAt'>Демонстрация работы</a>