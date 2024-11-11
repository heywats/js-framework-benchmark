import React, { useState } from 'react'
import Button from './Button'

const ControlPanel = (
    ({ }) => {

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

export default ControlPanel