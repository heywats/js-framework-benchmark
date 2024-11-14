import { defineMutation, sql } from '@livestore/livestore'
import { Schema } from 'effect'

import { Filter } from '../types.js'

export const addMultipleTodos = defineMutation(
  'addMultipleTodos',
  Schema.Array(Schema.Struct({ id: Schema.String, text: Schema.String })),
  (todos) => {
    const values = todos.map(({ id, text }) => `('${id}', '${text}')`).join(", ");
    return sql`INSERT INTO todos (id, text) VALUES ${values}`;
  }
);

export const deleteTodo = defineMutation(
  'deleteTodo',
  Schema.Struct({ id: Schema.String }),
  (params) => sql`DELETE FROM todos WHERE id = ${params.id}`
);

export const clearAll = defineMutation(
  'clearAll',
  Schema.Struct({}),
  sql`DELETE FROM todos`
)

export const updateTodos = defineMutation(
  'updateTodos',
  Schema.Array(Schema.Struct({ id: Schema.String })),
  sql`UPDATE todos SET text = text || '!!!' WHERE (rowid - 1) % 10 = 0`
)([])

export const swapRows = defineMutation(
  'swapRows',
  Schema.Array(Schema.Struct({ idA: Schema.Number, idB: Schema.Number })),
  sql`UPDATE todos SET rowid = CASE 
      WHEN rowid = $idA THEN $idB
      WHEN rowid = $idB THEN $idA 
      ELSE rowid END 
  WHERE rowid IN ($idA, $idB)`
)([{ idA: 999, idB: 1000 }])

export const setFilter = defineMutation(
  'setFilter',
  Schema.Struct({ filter: Filter, sessionId: Schema.String }),
  sql`UPDATE app SET filter = $filter WHERE id = $sessionId`,
  { localOnly: true },
)

export const selectTodoById = defineMutation(
  'selectTodoById',
  Schema.Struct({ id: Schema.String }),
  (params) => sql`UPDATE todos SET selected = true WHERE id = ${params.id}`
)