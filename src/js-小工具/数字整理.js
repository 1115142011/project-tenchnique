    /** 整理数字格式 */
    const trimNumberval = (val?: string, prssion?: number) => {
        let sNum = ''
        if (val) {
            sNum = val.replace(/[\u4e00-\u9fa5\A-Za-z/\`~!@#$^&*()=|{}'’:;,?~！% @ # ￥ 《》 …… ^ & * `、（）——|{}「」【】‘；：”“'。，、+ ？\\//]/g, '')
            sNum = sNum.replace(/[^\d.\-/]/g, '') // 清除“数字”和“.”以外的字符
            sNum = sNum.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
            sNum = sNum.replace(/\-{2,}/g, '-') // 只保留第一个- 清除多余的
        }

        onChange(sNum)
    }