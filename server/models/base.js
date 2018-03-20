export const add2Db = async (model, query, data) => {
    let info = null
    try {
        if (!await model.count(query)) {
            info = await new model(data).save()
        }
    } catch(err) {
        console.log('存储失败')
    }
    return info
}

export const getInfo = async (model, query) => {
    let count = 0
    let info = null
    let success = false
    try {
        count = await model.count(query)
        if (count) {
            info = await model.find(query)
        }
        success = true
    } catch(err) {
        console.log('存储失败')
    }
    return {
        rst: {
            count,
            list: info
        },
        success
    }
}