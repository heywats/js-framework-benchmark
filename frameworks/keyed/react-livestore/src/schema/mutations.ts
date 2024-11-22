import { defineMutation, sql } from '@livestore/livestore'
import { Schema } from 'effect'

import { Filter } from '../types.js'

// export const addMultipleTodos = defineMutation(
//   'addMultipleTodos',
//   Schema.Array(Schema.Struct({ id: Schema.String, text: Schema.String })),
//   (todos) => {
//     const values = todos.map(({ id, text }) => `('${id}', '${text}')`).join(", ");
//     return sql`INSERT INTO todos (id, text) VALUES ${values}`;
//   }
// );

export const addMultipleTodos = defineMutation(
  'addMultipleTodos',
  Schema.Array(Schema.Struct({ id: Schema.String, text: Schema.String })),
  (todos) => {

    const values = todos.map(({ id, text }) => `('${id}', '${text}')`).join(", ");
    return sql`
     DELETE FROM todos WHERE EXISTS (SELECT 1 FROM todos);
     INSERT INTO todos (id, text) VALUES ${values};
    `;
  }
);

export const deleteTodo = defineMutation(
  'deleteTodo',
  Schema.Struct({ id: Schema.String }),
  (params) => `DELETE FROM todos WHERE id = '${params.id}'`
);

export const clearAll = defineMutation(
  'clearAll',
  Schema.Struct({}),
  sql`DELETE FROM todos`
)

export const updateTenthTodos = defineMutation(
  'updateTenthTodos',
  Schema.Struct({}),
  sql`UPDATE todos SET text = text || '!!!' WHERE (rowid - 1) % 10 = 0`
);

export const swapRows = defineMutation(
  'swapRows',
  Schema.Struct({ idA: Schema.Number, idB: Schema.Number }),
  (params) => sql`
    UPDATE todos SET rowid = -1 WHERE rowid = ${params.idA};
    UPDATE todos SET rowid = '${params.idA}' WHERE rowid = '${params.idB}';
    UPDATE todos SET rowid = '${params.idB}' WHERE rowid = -1;
  `
);

export const setFilter = defineMutation(
  'setFilter',
  Schema.Struct({ filter: Filter, sessionId: Schema.String }),
  sql`UPDATE app SET filter = $filter WHERE id = $sessionId`,
  { localOnly: true },
)

export const selectTodoById = defineMutation(
  'selectTodoById',
  Schema.Struct({ id: Schema.String }),
  (params) => sql`
    UPDATE todos SET selected = false;
    UPDATE todos SET selected = true WHERE id = '${params.id}';
  `
);