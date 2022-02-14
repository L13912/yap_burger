export const WS_START: 'WS_START' = 'WS_START';
export const WS_PRIVAT_START: 'WS_PRIVAT_START' = 'WS_PRIVAT_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';

export type TWsActions =
    IWsStart |
    IWsPrivatStart |
    IWsConnectionSuccess |
    IWsGetMessage |
    IWsConnectionClose;

export interface IWsStart {
    readonly type: typeof WS_START;
    readonly payload: any;
}

export interface IWsPrivatStart {
    readonly type: typeof WS_PRIVAT_START;
    readonly payload: any;
}

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: any;
}

export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: any;
}

export interface IWsConnectionClose {
    readonly type: typeof WS_CONNECTION_CLOSE;
    readonly payload: any;
}
