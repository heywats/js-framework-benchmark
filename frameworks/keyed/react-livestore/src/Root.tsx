import { LiveStoreProvider } from '@livestore/react'
import { makeAdapter } from '@livestore/web'
import LiveStoreSharedWorker from '@livestore/web/shared-worker?sharedworker'
import React from 'react'
import { unstable_batchedUpdates as batchUpdates } from 'react-dom'

import Controls from './components/Controls.js'

import LiveStoreWorker from './livestore.worker?worker'
import { schema } from './schema/index.js'
import { MainSection } from './components/MainSection.js'

const AppBody: React.FC = () => (
  <div className="container">
    <Controls />
    <MainSection />
  </div>
)

const adapter = makeAdapter({
  storage: { type: 'opfs' },
  worker: LiveStoreWorker,
  sharedWorker: LiveStoreSharedWorker,
})

export const App: React.FC = () => (
  <LiveStoreProvider
    schema={schema}
    renderLoading={(_) => <div>Loading LiveStore ({_.stage})...</div>}
    renderError={(error: any) => <div>Error: {error.toString()}</div>}
    adapter={adapter}
    batchUpdates={batchUpdates}
  >
    <AppBody />
  </LiveStoreProvider>
)
