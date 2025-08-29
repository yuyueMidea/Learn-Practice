// 1) 联合类型 & 交叉类型 + 类型收窄（narrowing）

type Id = string | number;

function toString(id: Id) {
    // 收窄方式 1：typeof
    if(typeof id === 'number') return id.toFixed(0)
    return id.toUpperCase()
}

type Success = { type: 'ok', data: string }
type Fail = { type: 'err', message: string }

type Result = Success | Fail;

function handle1(r: Result) {
    // 收窄方式 2：可辨识联合（discriminated union）
    switch(r.type) {
        case 'ok': return r.data;
        case 'err': return r.message;
    }
}
