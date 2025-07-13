```
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

//使用extends进行接口继承、复用
interface Parent {
    prop1: string,
    prop2: number
}
interface Child extends Parent {
    prop3: number
}
const o2: Child = {
    prop1: 'zhang',
    prop2: 12,
    prop3: 44
}

// 在类中添加私有属性
class Article {
    title: string
    content: string
    aaa?: string
    private temdata?: string
    constructor(title: string, content: string) {
        this.title = title
        this.content = content
    }
}
const a = new Article('title1', 'connn')
console.log(a.content)
//temdata是私有属性，实例化`a`不可访问，只能在类的内部访问

// 函数重载【就是创建名称一样，但是参数类型和返回值不同的函数；编写一个函数实现多种功能】
function hello (value: string | number): string {
    if (typeof value ==='string') {
        //
    } else if (typeof value === 'number') {
        //
    }
}
```
