import React from 'react'
import Row from './Row'

const Main = () => {
    const data = [{ label: "hello", id: 1 }]

    return (
        <table className="table table-hover table-striped test-data">
            <tbody>
                {data.map((item) => (
                    <Row key={item.id} item={item} />
                ))}
            </tbody>
        </table>
    )
}

export default Main
