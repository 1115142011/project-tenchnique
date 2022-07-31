import React from 'react'
import Square from './Square'
import Knight from './Knight'
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ItemTypes } from '.'

function renderSquare(i, knightPosition, move) {
    const x = i % 8
    const y = Math.floor(i / 8)

    return (
        <div key={i} style={{ width: '12.5%', height: '12.5%' }} onClick={() => move(x, y)}>
            <BoardSquare x={x} y={y} moveKnight={move}>
                {renderPiece(x, y, knightPosition)}
            </BoardSquare>
        </div>
    )
}

export function BoardSquare({ x, y, children, moveKnight }) {
    const black = (x + y) % 2 === 1
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.KNIGHT,
            drop: () => moveKnight(x, y),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }),
        [x, y]
    )
    return (
        <div
            ref={drop}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <Square black={black}>{children}</Square>
            {isOver && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        opacity: 0.5,
                        backgroundColor: 'yellow',
                    }}
                />
            )}
        </div>
    )
    // <Square black={black}>{children}</Square>
}

function renderPiece(x, y, [knightX, knightY]) {
    if (x === knightX && y === knightY) {
        return <Knight />
    }
}
export default function Board({ knightPosition, move }) {
    const squares = []
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, knightPosition, move))
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
            }}
        >
            {squares}
        </div>
    )
}
