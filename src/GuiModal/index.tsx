/**
 * @author 倪涛
 * @filename gui-modal.tsx
 * @date 2020-12-25 星期五
 * @description 弹框统一封装
 */

import { Modal, Space } from 'antd'
import { TypeUnion } from '../global'
import React, { ReactNode, useCallback, useEffect } from 'react'
import GuiButton, { GuiButtonType } from '../Button/GuiButton'
import { useThrottleFn } from 'ahooks'
import './index.less'

export type GuiModalProps = {
    children?: React.ReactNode
    /** 标题 */
    title: React.ReactNode
    /** 是否可见 */
    visible: boolean
    /** 抽屉宽度或者是高度 默认420 */
    size?: TypeUnion<'420' | '840' | '1260', string>
    /** 类名 */
    className?: string
    /** 确认按钮文字 */
    okTitle?: string
    /** 取消按钮文字 */
    cancelTitle?: string
    /** 确认按钮类型 */
    okType?: GuiButtonType
    /** 取消按钮类型 */
    cancelType?: GuiButtonType
    /** 是否隐藏底部操作栏 默认false */
    hiddenFooter?: boolean
    /** 自定义底部操作栏 */
    customFooter?: ReactNode[]
    /** 确认按钮loading, 默认false */
    loading?: boolean
    /** 是否类容滚动 默认为true */
    scroll?: boolean
    /** 关闭时销毁 Modal 里的子元素 */
    destroyOnClose?: boolean
    /** 设置 抽屉 的 z-index */
    zIndex?: number
    /** 指定 抽屉 挂载的 HTML 节点, false 为挂载在当前 dom */
    getContainer?: string | HTMLElement | (() => HTMLElement) | false
    /** 是否显示右上角的关闭按钮 */
    closable?: boolean
    /** 点击蒙层是否允许关闭 */
    maskClosable?: boolean
    /** 确认按钮回调 */
    onOk?: () => void
    /** 取消按钮回调 */
    onCancel?: () => void
    /** 强制渲染 Modal	 */
    forceRender?: boolean
}

const GuiModal = (props: GuiModalProps) => {
    const {
        onOk,
        onCancel,
        children,
        title,
        okTitle,
        cancelTitle,
        visible,
        size = '600',
        className = '',
        hiddenFooter,
        customFooter,
        okType,
        cancelType,
        loading,
        scroll = true,
        destroyOnClose,
        maskClosable,
        zIndex = undefined,
        getContainer = false,
        closable = true,
        forceRender = true,
    } = props

    /*** 拖拽相关 ****/
    const uniqueClassRef = React.useRef<string>(Math.random().toString(36).substring(2))
    const eleBoundingRef = React.useRef<any>()
    const headerEleRef = React.useRef<HTMLDivElement>()
    const startPointRef = React.useRef<{ mouseDownX: number; mouseDownY: number; moveFlag: boolean }>({
        mouseDownX: 0,
        mouseDownY: 0,
        moveFlag: false,
    })
    const moveRef = React.useRef<{ deltaX: number; deltaY: number }>({ deltaX: 0, deltaY: 0 })

    const accumulatedRef = React.useRef<{ sumX: number; sumY: number }>({ sumX: 0, sumY: 0 })

    let modalContent: any = React.useRef()

    const moveHandleDelete = useCallback(() => {
        cancelMove()
        window.removeEventListener('mousemove', handleMove)
    }, [])

    const onmousedownHandle = useCallback((e: MouseEvent) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        startPointRef.current.mouseDownX = e.clientX
        startPointRef.current.mouseDownY = e.clientY
        document.body.onselectstart = () => false
        window.addEventListener('mousemove', handleMove, false)
    }, [])

    /** 鼠标移动 */
    const { run: handleMove, cancel: cancelMove } = useThrottleFn(
        (event: any) => {
            event.preventDefault()
            event.stopImmediatePropagation()
            startPointRef.current.moveFlag = true

            const movedeltaX = event.clientX - startPointRef.current.mouseDownX
            const movedeltaY = event.clientY - startPointRef.current.mouseDownY
            moveRef.current.deltaX = movedeltaX
            moveRef.current.deltaY = movedeltaY
            let moveX = moveRef.current.deltaX + accumulatedRef.current.sumX
            let moveY = moveRef.current.deltaY + accumulatedRef.current.sumY

            /** 计算top 阈值 */
            if (moveY < 0) {
                //向上
                if (eleBoundingRef.current.top && Math.abs(moveY) > eleBoundingRef.current.top) {
                    moveY = -eleBoundingRef.current.top
                }
            }

            modalContent.current.style.transform = `translate(${moveX}px, ${moveY}px)`
        },
        { wait: 10 }
    )

    /** 鼠标放开 */
    const removeUp = useCallback((e: any) => {
        e.preventDefault()
        e.stopImmediatePropagation()

        /** 状态重置 */
        if (startPointRef.current.moveFlag) {
            startPointRef.current.moveFlag = false
            accumulatedRef.current.sumX = accumulatedRef.current.sumX + moveRef.current.deltaX
            accumulatedRef.current.sumY = accumulatedRef.current.sumY + moveRef.current.deltaY
        }

        document.body.onselectstart = () => true
        moveHandleDelete()
    }, [])

    /* 初始化 */
    const initialEvent = useCallback((visible: boolean) => {
        if (title && visible) {
            setTimeout(() => {
                window.removeEventListener('mouseup', removeUp, false)
                let contain: any = document.getElementsByClassName(uniqueClassRef.current)[0]
                headerEleRef.current = contain.getElementsByClassName('ant-modal-header')[0]
                modalContent.current = contain.getElementsByClassName('ant-modal-content')[0]
                eleBoundingRef.current = modalContent.current.getBoundingClientRect()
                /** @ts-ignore next-line */
                headerEleRef.current?.style.cursor = 'all-scroll'
                headerEleRef.current?.addEventListener('mousedown', onmousedownHandle, false)
                window.addEventListener('mouseup', removeUp, false)
            }, 0)
        } else {
            moveHandleDelete()
        }
    }, [])

    useEffect(() => {
        initialEvent(visible)
        return () => {
            moveHandleDelete()
            window.removeEventListener('mouseup', removeUp, false)
            headerEleRef.current?.removeEventListener('mousedown', onmousedownHandle)
        }
    }, [visible, Boolean(title)])

    return (
        <Modal
            zIndex={zIndex}
            title={title}
            visible={visible}
            footer={null}
            closable={closable}
            closeIcon={<img style={{ userSelect: 'none' }} src={require('@/assets/base/modal_close.svg')} />}
            onCancel={onCancel}
            width={isNaN(Number(size)) ? size : Number(size)}
            maskClosable={maskClosable}
            centered
            destroyOnClose={destroyOnClose}
            getContainer={getContainer}
            className={`gui-modal ${className} ${uniqueClassRef.current}`}
            forceRender={forceRender}
        >
            <div className="gui-modal_content" style={{ overflowY: scroll ? 'auto' : 'hidden' }}>
                {children}
            </div>

            {hiddenFooter ? null : customFooter?.length ? (
                <div className="gui-modal_footer">
                    <Space>
                        {customFooter.map((item: React.ReactNode, index: number) => (
                            <React.Fragment key={index}>{item}</React.Fragment>
                        ))}
                    </Space>
                </div>
            ) : (
                <div className="gui-modal_footer">
                    <Space>
                        {!!onOk && (
                            <GuiButton key="save" type={okType ?? 'save'} loading={loading} onClick={onOk}>
                                {okTitle || '保存'}
                            </GuiButton>
                        )}

                        <GuiButton key="cancel" type={cancelType ?? 'cancel'} onClick={onCancel}>
                            {cancelTitle || '取消'}
                        </GuiButton>
                    </Space>
                </div>
            )}
        </Modal>
    )
}

export default GuiModal
