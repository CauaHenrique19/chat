export const formatDate = (initialDate: Date) : string => {
    let dateToTime = new Date(initialDate.getTime() - 180 * 60 * 1000).toISOString()
    let time = dateToTime.substring(dateToTime.indexOf('T') + 1, dateToTime.indexOf('.'))

    let dateString = dateToTime.substring(0, dateToTime.indexOf('T')).replace('-', '/').replace('-', '/')
    let day = new Date(dateString).getDate().toString().length === 1 ? `0${new Date(dateString).getDate()}` : new Date(dateString).getDate()
    let month = new Date(dateString).getMonth() + 1
    let year = new Date(dateString).getFullYear()

    return `${day}/${month}/${year} às ${time}`
}