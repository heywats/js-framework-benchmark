
import { LiveStoreProvider } from '@livestore/react'
import { makeAdapter } from '@livestore/web'
import LiveStoreSharedWorker from '@livestore/web/shared-worker?sharedworker'
import React from 'react'
import { unstable_batchedUpdates as batchUpdates } from 'react-dom'

import ControlPanel from './components/Controls.js'
import Main from './components/Main.js'

import LiveStoreWorker from './livestore.worker?worker'
import { schema } from './schema/index.js'

const AppBody: React.FC = () => (
    <div className="container">
        <ControlPanel />
        <Main />
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
        adapter={adapter}
        batchUpdates={batchUpdates}
    >
        <AppBody />
    </LiveStoreProvider>
)