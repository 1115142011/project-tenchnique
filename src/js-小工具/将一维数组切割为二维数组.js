/**
 * @author painter
 * @date 2021-12-09 Thursday
 * @function 将一维数组分割为二维数组
 */
 function chunk(arr: any[], size: number = 3) {
    size = Math.max(size, 1)
    const length = Array.isArray(arr) ? arr.length : 0
    if (size < 1 || !length) return []
    let index = 0
    let resindex = 0
    const result = new Array(Math.ceil(length / size))
    while (index < length) {
        result[resindex++] = Array.prototype.slice.call(arr, index, (index += size))
    }
    return result
}