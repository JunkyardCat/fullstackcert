import {apiBaseUrl} from '../constants'
import {DiagnosesEntry} from '../types'
import axios from 'axios'
const getAll = async () => {
    const {data} = await axios.get<DiagnosesEntry[]>(`${apiBaseUrl}/diagnoses`)
    return data
}

const getCode = async (codes: string[])=>{
    const {data} = await axios.get<DiagnosesEntry[]>(
        `${apiBaseUrl}/diagnoses/${codes.join(',')}`
    )
    return data
}

export default {
    getAll, getCode
}