
import React from 'react'
import { useStore } from '@livestore/react'
import { v4 as uuid } from 'uuid'
import { mutations, tables } from '../schema/index.js'
import phrasings from '../schema/data.js'
import Button from './Button'

// let id = 1;
const random = (max) => Math.round(Math.random() * 1000) % max;

const Controls: React.FC = () => {
    const { store } = useStore()

    const buildData = (count) => {
        const todos = [];
        for (let i = 0; i < count; i++) {
            const text = `${phrasings.adjectives[random(phrasings.adjectives.length)]} 
            ${phrasings.colours[random(phrasings.colours.length)]} 
            ${phrasings.nouns[random(phrasings.nouns.length)]}`;

            todos.push({ id: uuid(), text: text });
        }
        store.mutate(mutations.addMultipleTodos(todos));
    };

    // 1. Run function to insert 1,000 records
    const run = () => {
        buildData(1000);
    };

    // 2. RunLots function to insert 10,000 records
    const runLots = () => {
        buildData(10000);
    };

    // 3. Add function to append 1,000 records
    const add = () => {
        buildData(1000);
    };

    // 4. Update function to modify every 10th record
    const update = () => {
        store.mutate(mutations.updateTodos({}));
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
}


export default Controls