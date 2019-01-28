import {apiBase} from './apiBase';

export const BATCH_URL = apiBase() + '/batch';

export default {
    //获取任务列表
    LIST: BATCH_URL + "/list.action",
    //获取单个任务
    GET: BATCH_URL + "/get.action",
    //删除
    DELETE: BATCH_URL + "/delete.action",
    //保存任务
    SAVE: BATCH_URL + "/save.action",


    UPDATE: BATCH_URL + "/save.action",
    //暂停
    PAUSE: BATCH_URL + "/pause.action",
    //恢复
    RESUME: BATCH_URL + "/resume.action",
    //运行一次
    RUNONC: BATCH_URL + "/runOnc.action",
    /**
     * 脚本列表
     */
    JOBLIST: BATCH_URL + "/job/list.action"
}