import React, { memo } from 'react'

const Row = memo(
    ({ item, onRemove, onSelect }) => {
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
            </tr>
        )
    },
    (prevProps, nextProps) => prevProps.item === nextProps.item
)

export default Row;