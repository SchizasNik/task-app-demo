import { EventEmitter } from "events";
import axios from 'axios';
import { getToken } from 'services/auth'
import { objectToQueryParams } from "utils/objectToQueryParams";

export const apiEvents = new EventEmitter();

function handleError(error) {
    apiEvents.emit('api-error', error);
    console.error('api:', error)
}

const headerOptions = () => ({
    headers: {
        Authorization: getToken()
    }
})

export const createPost = <REQ, RES>(url: string) => {
    return async (req: REQ): Promise<RES> => {
        try {
            const response = await axios.post(url, req, headerOptions());
            return response.data as RES;
        } catch (error) {
            handleError(error)
            throw error;
        }
    }
}


export const createPut = <REQ, RES>(url: string) => {
    return async (req: REQ): Promise<RES> => {
        try {
            const response = await axios.put(url, req, headerOptions());
            return response.data as RES;
        } catch (error) {
            handleError(error)
            throw error;
        }
    }
}

export const createDelete = <REQ, RES>(url: string) => {
    return async (req: REQ): Promise<RES> => {
        try {
            const response = await axios.delete(url, { 
                params: req, 
                ...headerOptions()
            })
            return response.data as RES;
        } catch (error) {
            handleError(error)
            throw error;
        }
    }
}


export const createGet = <REQ, RES>(url: string) => {
    return async (req: REQ): Promise<RES> => {
        try {
            const response = await axios.get(url, { 
                params: req, 
                ...headerOptions()
            })
            return response.data as RES;
        } catch (error) {
            handleError(error)
            throw error;
        }
    }
}

export const createGetDownload = <REQ>(url: string) => {
    return (req: REQ) => {
        window.open( url + objectToQueryParams(req), '_self');
    }
}