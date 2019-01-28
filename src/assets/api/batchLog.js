import {apiBase} from './apiBase';

export const BATCH_LOG_URL = apiBase() + '/batch/log';

export default {
    //获取任务列表
    LIST: BATCH_LOG_URL + "/list.action",
}