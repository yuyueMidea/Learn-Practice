let s1:string='asd'
s1='aas'
let n1:number = 12
n1 = 3
function fn1(a: string,b: string){
    return a + b;
}
let nameAge = fn1('zhangsna','33')
console.log(nameAge)

//定义接口，后面obj引用的时候需要按照这个规则来写了
interface Obj {
    name: string,
    age: number
}
let o1: Obj = {
    name:'zzhan',
    age:33
}

//定义一个类型别名【可以是字符串或数值这两种类型】，方便后面引用
type stringNumber = string | number;
let name1: stringNumber = 'zhangas';
let age1: stringNumber = 25;
//返回一个数组类型的numberarray
function fn2(a:number, b:number): number[] {
    return [a,b];
}
// 使用泛型，下面的调用是按照数值的方式来使用
function fn3<T>(a:T, b: T): T[] {
    return [a,b];
}
fn3<number>(1,33);
fn3<string>('a', 'c');
