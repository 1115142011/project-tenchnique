/**
 * @author painter
 * @filename index.tsx
 * @date 2022-07-25 Monday
 * @description dnd demo delete later
 */
import React, { useEffect, useState } from 'react'
import MinebaseComponent from '@/components/Layout/MinebaseComponent'
import Board from './Board'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const ItemTypes = {
    KNIGHT: 'knight',
}
const DndTest: React.FC<any> = () => {
    const [position, setPosition] = useState<[number, number]>([0, 1])

    const move = (toX, toY) => {
        const [x, y] = position
        const dx = toX - x
        const dy = toY - y

        if ((Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2)) {
            setPosition([toX, toY])
        }
    }

    return (
        <MinebaseComponent style={{ margin: 8, background: '#e6fffb' }}>
            <div style={{ height: '100%' }}>
                <DndProvider backend={HTML5Backend}>
                    <Board knightPosition={position} move={move} />
                </DndProvider>
            </div>
        </MinebaseComponent>
    )
}

export default DndTest
