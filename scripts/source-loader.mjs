import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
export function sourceLoader(mocks = {}) {
  const cache = new Map();
  function load(filename) {
    const absolute = path.resolve(filename);
    if (cache.has(absolute)) return cache.get(absolute).exports;
    const loadedModule = { exports: {} };
    cache.set(absolute, loadedModule);
    const source = ts.transpileModule(fs.readFileSync(absolute, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    const localRequire = (name) => {
      if (Object.hasOwn(mocks, name)) return mocks[name];
      if (!name.startsWith("@/") && !name.startsWith(".")) return require(name);
      const base = name.startsWith("@/") ? path.resolve("src", name.slice(2)) : path.resolve(path.dirname(absolute), name);
      const found = [base, base + ".ts", base + ".tsx"].find((file) => fs.existsSync(file) && fs.statSync(file).isFile());
      if (!found) throw new Error("Cannot load " + name);
      return load(found);
    };
    vm.runInThisContext("(function(require,module,exports){" + source + "\n})", { filename: absolute })(localRequire, loadedModule, loadedModule.exports);
    return loadedModule.exports;
  }
  return load;
}
