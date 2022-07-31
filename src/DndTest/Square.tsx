import React from 'react'

export default function Square(props: any) {
    const { black, ...rest } = props
    const fill = black ? 'black' : 'white'
    const stroke = black ? 'white' : 'black'
    return (
        <div
            style={{
                backgroundColor: fill,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexBasis:'column',
                justifyContent:'center',
                alignItems:'center',
                fontSize: 48,
                color: stroke,
            }}
            {...rest}
        />
    )
}
