import React, { memo, useState } from 'react'
import { createRoot, unstable_batchedUpdates as batchUpdates } from 'react-dom/client'
import { A, C, N } from './constants.js'
import { schema } from './schema/index.js'

// LiveStore
import LiveStoreWorker from './livestore.worker?worker'
import { LiveStoreProvider } from '@livestore/livestore/react'
import { makeAdapter } from '@livestore/web'
import LiveStoreSharedWorker from '@livestore/web/shared-worker?sharedworker'

const adapter = makeAdapter({
  storage: { type: 'opfs' },
  worker: LiveStoreWorker,
  sharedWorker: LiveStoreSharedWorker,
})


const random = (max) => Math.round(Math.random() * 1000) % max

let nextId = 1;
const buildData = (count) => {
  const data = new Array(count)

  for (let i = 0; i < count; i++) {
    data[i] = {
      id: nextId++,
      label: `${A[random(A.length)]} ${C[random(C.length)]} ${N[random(N.length)]
        }`,
    }
  }

  return data
}

const Row = memo(
  ({ item }) => {
    const select = (item) => {
      console.log("selected item", item)
    } // selectors
    const remove = (item) => {
      console.log("removing item", item)
    }
    const isSelected = false

    return (
      <tr className={isSelected ? "danger" : ""}>
        <td className="col-md-1">{item.id}</td>
        <td className="col-md-4">
          <a onClick={() => select(item.id)}>{item.label}</a>
        </td>
        <td className="col-md-1">
          <a onClick={() => remove(item.id)}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true" />
          </a>
        </td>
        <td className="col-md-6" />
      </tr>
    )
  },
  (prevProps, nextProps) => prevProps.item === nextProps.item
)

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

const ControlPanel = memo(
  ({ run, runLots, add, update, clear, swapRows }) => {
    return (
      <div className="control-panel">
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

    )
  },
  () => true
)

const Main = () => {
  const [data, setData] = useState([])
  // const data = buildData(1000)
  /**
   * 
   * 
   * run = set 1000
   * runLots =  set 10,000
   * add = append 1k to the data
   * update = every 10 set by adding !!! to label
   * clear = empty data back to []
   * swapRows = swap 2 rows if > 998
   * remove = remove an id
   * select = get by an id as selected
   * 
   * 
   */
  const run = () => {
    //  * run = set 1000
    console.log("build 1000");
    setData(buildData(1000))
  }
  const runLots = () => {
    // * runLots =  set 10,000
    // const data = buildData(10000)
    console.log("build 10,000");
    setData(buildData(10000))
  }
  const add = () => {
    // add = append 1k to the data
    console.log("append 1000");
  }
  const update = () => {
    // * update = every 10 set by adding !!! to label
  }
  const clear = () => {
    //  clear = empty data back to []
    setData([])
  }
  const swapRows = () => {
    // swapRows = swap 2 rows if > 998
  }


  return (
    <div className="container">
      <ControlPanel run={run} runLots={runLots} add={add} update={update} clear={clear} swapRows={swapRows} />
      <table className="table table-hover table-striped test-data">
        <tbody>
          {data.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </tbody>
      </table>
      <span
        className="preloadicon glyphicon glyphicon-remove"
        aria-hidden="true"
      />
    </div>

  )
}


const App = () => {
  return <LiveStoreProvider
    schema={schema}
    boot={(db) => {
      console.log(db, "boot loading yo")
      // if (db.select<{ count: number }>(sql`SELECT count(*) as count FROM todos`)[0]!.count === 0) {
      //   db.mutate(mutations.addTodo({ id: cuid(), text: 'Make coffee' }))
      // }
    }}
    renderLoading={(_) => <div>Loading LiveStore ({_.stage})...</div>}
    renderError={(error) => <Text>Error: {error.toString()}</Text>}
    adapter={adapter}
    batchUpdates={batchUpdates}><Main /></LiveStoreProvider>
}

ReactDOM.createRoot(document.getElementById('react-app')!).render(<App />)

// const container = document.getElementById('main');
// const root = createRoot(container);
// root.render(<App />);
