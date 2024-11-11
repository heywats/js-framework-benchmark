import React, { memo } from 'react'

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


export default Row;