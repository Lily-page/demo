

let list = new Array(5).fill(0).map((value, index) => {
    return {
        id: index,
        name: "xxx" + value + index,
        marriage: false
    }
})



export const getList = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(list)
        }, 1000);
    })
}


export const getSearchList = (value?: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const _list = value ? list.filter(item => item.name.includes(value)) : list
            resolve(_list)
        }, 100);
    })
}


export const addItem = (item): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let id = list.length;
            list.push({ id, ...item })
            resolve()
        }, 100);
    })
}

export const deleteItem = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const _list = list.filter(item => item.id !== id)
            list = _list
            resolve()
        }, 100);
    })
}


export const editItem = (item): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            list = list.map((_item) => {
                if (_item.id === item.id) {
                    return item
                } else return _item
            })
            resolve()
        }, 100);
    })
}
