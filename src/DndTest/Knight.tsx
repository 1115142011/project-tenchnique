import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '.'

export default function Knight() {
    const [{ isDragging }, drag] = useDrag(() => {
        return {
            type: ItemTypes.KNIGHT,
            collect: (monitor: any) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }
    })

    return (
        <span ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
            ♘
        </span>
    )
}
