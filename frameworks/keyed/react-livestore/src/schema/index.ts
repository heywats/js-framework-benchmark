import { Schema } from '@effect/schema'
import { DbSchema, defineMutation, makeSchema, sql } from '@livestore/livestore'

const data = DbSchema.table(
    'data',
    {
        id: DbSchema.text({ primaryKey: true }),
        label: DbSchema.text({ default: '' }),
    },
    { deriveMutations: true },
)

export const tables = { data }

const addItem = defineMutation(
    'addItem',
    Schema.Struct({ id: Schema.String, text: Schema.String }),
    sql`INSERT INTO data (id, text) VALUES ($id, $text)`,
)

export const deleteItem = defineMutation(
    'deleteItem',
    Schema.Struct({ id: Schema.String, deleted: Schema.Number }),
    sql`DELETE FROM data WHERE id = $id`,
)

export const clearItems = defineMutation(
    'clearItems',
    Schema.Struct({}),
    sql`DELETE * from data`,
)

const updateItemText = defineMutation(
    'updateItemText',
    Schema.Struct({ text: Schema.String }),
    sql`UPDATE app SET newTodoText = $text`,
)

export const mutations = {
    addItem,
    deleteItem,
    clearItems,
    updateItemText,

}

export const schema = makeSchema({ tables, mutations, storeId: 'livestore-benchmarks' })