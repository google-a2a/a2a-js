import { compile, compileFromFile } from 'json-schema-to-typescript'
import fs from 'fs';
import path from 'path';

function clearAndUpper(text) {
  return text.replace(/-/, "").toUpperCase();
}

function toPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

const typeSchemaContents = fs.readFileSync(path.join(process.cwd(), 'spec.json'), 'utf8');
const typeSchema = JSON.parse(typeSchemaContents.toString());

// Manually injecting TaskState enum names in pascal case.
// https://github.com/bcherny/json-schema-to-typescript/tree/master?tab=readme-ov-file#custom-schema-properties
typeSchema.definitions.TaskState["tsEnumNames"] = typeSchema.definitions.TaskState.enum.map(name => toPascalCase(name))

compile(typeSchema, 'MySchema', {
    additionalProperties: false,
    enableConstEnums: false,
    unreachableDefinitions: true,
    unknownAny: true,
  })
  .then(ts => fs.writeFileSync('src/types.ts', ts))
