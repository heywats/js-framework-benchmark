
import React from 'react'
import { unstable_batchedUpdates as batchUpdates } from 'react-dom'

import { makeAdapter } from '@livestore/web'
import { querySQL, rowQuery, SessionIdSymbol, sql } from '@livestore/livestore'
import { LiveStoreProvider, useQuery, useStore } from '@livestore/react'
import LiveStoreSharedWorker from '@livestore/web/shared-worker?sharedworker'
import LiveStoreWorker from './livestore.worker?worker'
import { mutations, tables, schema } from './schema/index.js'
import { Schema } from 'effect'

import phrasings from './schema/data.js'


let id = 1;

const adapter = makeAdapter({
  storage: { type: 'opfs' },
  worker: LiveStoreWorker,
  sharedWorker: LiveStoreSharedWorker,
})


const filterClause$ = rowQuery(tables.app, SessionIdSymbol, {
  map: ({ filter }) => `where ${filter === 'all' ? '' : `completed = ${filter === 'completed'} and `}deleted is null`,
  label: 'filterClause',
})

const visibleTodos$ = querySQL((get) => sql`select * from todos ${get(filterClause$)}`, {
  schema: Schema.Array(tables.todos.schema),
  label: 'visibleTodos',
})

const random = (max) => Math.round(Math.random() * 1000) % max;

const buildData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const text = `${phrasings.adjectives[random(phrasings.adjectives.length)]} 
      ${phrasings.colours[random(phrasings.colours.length)]} 
      ${phrasings.nouns[random(phrasings.nouns.length)]}`;

    data.push({ id: `${id++}`, text: text });
  }
  return data;
};

const Row = ({ item, onRemove, onSelect }) => {
  const isSelected = item.selected ? true : false;

  return (
    <tr className={isSelected ? "danger" : ""}>
      <td className="col-md-1">{item.id}</td>
      <td className="col-md-4">
        <a onClick={() => onSelect(item.id)}>{item.text}</a>
      </td>
      <td className="col-md-1">
        <a onClick={() => onRemove(item.id)}>
          <span
            className="glyphicon glyphicon-remove"
            aria-hidden="true" />
        </a>
      </td>
      <td className="col-md-6"></td>
    </tr>
  )
}

const Button = ({ id, cb, title }) => (
  <div className="col-sm-6 smallpad">
    <button
      type="button"
      className="btn btn-primary btn-block"
      id={id}
      onClick={cb}
    >
      {title}
    </button>
  </div>
)

const AppBody: React.FC = () => {
  const { store } = useStore()
  const visibleTodos = useQuery(visibleTodos$)

  // 1. Run function to insert 1,000 records
  const run = () => {
    const data = buildData(1000);
    store.mutate(mutations.addMultipleTodos(data));
  };

  // 2. RunLots function to insert 10,000 records
  const runLots = () => {
    const data = buildData(10000);
    store.mutate(mutations.addMultipleTodos(data));
  };

  // 3. Add function to append 1,000 records
  const add = () => {
    const data = buildData(1000);
    store.mutate(mutations.addMultipleTodos(data));
  };

  // 4. Update function to modify every 10th record
  const update = () => {
    store.mutate(mutations.updateTenthTodos({}));
  };

  // 5. Clear function to delete all records
  const clear = () => {
    store.mutate(mutations.clearAll({}));
  };

  // 6. SwapRows function to swap rows
  const swapRows = () => {
    // SQL logic for swapping two rows based on rowids
    store.mutate(mutations.swapRows({ idA: 999, idB: 1000 }));
  };


  return (<div className="container">
    <div className="jumbotron">
      <div className="row">
        <div className="col-md-6">
          <h1>React LiveStore keyed</h1>
        </div>
        <div className="col-md-6">
          <div className="row">
            <Button id="run" title="Create 1,000 rows" cb={() => run()} />
            <Button
              id="runlots"
              title="Create 10,000 rows"
              cb={() => runLots()}
            />
            <Button id="add" title="Append 1,000 rows" cb={() => add()} />
            <Button
              id="update"
              title="Update every 10th row"
              cb={() => update()}
            />
            <Button id="clear" title="Clear" cb={() => clear()} />
            <Button id="swaprows" title="Swap Rows" cb={() => swapRows()} />
          </div>
        </div>
      </div>
    </div>
    <table className="table table-hover table-striped test-data">
      <tbody>
        {visibleTodos.map((item) => (
          <Row key={item.id} item={item}
            onSelect={(id) => store.mutate(mutations.selectTodoById({ id }))}
            onRemove={(id) => store.mutate(mutations.deleteTodo({ id }))} />
        ))}
      </tbody>
    </table>
    <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
  </div>)

}


export const App: React.FC = () => (
  <LiveStoreProvider
    schema={schema}
    renderLoading={(_) => <div>Loading LiveStore ({_.stage})...</div>}
    renderError={(error) => <div>Error: {error.toString()}</div>}
    adapter={adapter}
    batchUpdates={batchUpdates}
  >
    <AppBody />
  </LiveStoreProvider>
)
