import { querySQL, rowQuery, SessionIdSymbol, sql } from '@livestore/livestore'
import { useQuery, useStore } from '@livestore/react'
import { Schema } from 'effect'
import React from 'react'
import Row from './Row'
import { mutations, tables } from '../schema/index.js'

// Define the reactive queries for this component

// First, we create a reactive query which defines the filter clause for the SQL query.
// It gets all the rows from the app table, and pipes them into a transform function.
// The result is a reactive query whose value is a string containing the filter clause.
const filterClause$ = rowQuery(tables.app, SessionIdSymbol, {
  map: ({ filter }) => `where ${filter === 'all' ? '' : `completed = ${filter === 'completed'} and `}deleted is null`,
  label: 'filterClause',
})

// Next, we create the actual query for the visible todos.
// We create a new reactive SQL query which interpolates the filterClause.
// Notice how we call filterClause() as a function--
// that gets the latest value of that reactive query.
const visibleTodos$ = querySQL((get) => sql`select * from todos ${get(filterClause$)}`, {
  schema: Schema.Array(tables.todos.schema),
  label: 'visibleTodos',
})

export const MainSection: React.FC = () => {
  const { store } = useStore()

  const visibleTodos = useQuery(visibleTodos$)

  return (
    <section className="main">
      <table className="table table-hover table-striped test-data">
        <tbody>
          {visibleTodos.map((item) => (
            <Row key={item.id} item={item}
              onSelect={(id) => store.mutate(mutations.selectTodoById({ id }))}
              onRemove={(id) => store.mutate(mutations.deleteTodo({ id }))} />
          ))}
        </tbody>
      </table>
    </section>
  )
}
