## ES6 Class 的优势简介

ES6引入的class语法，为JavaScript提供了更清晰，更接近传统面向对象语言的类定义方式，有以下优势：
- 语法更简洁直观：
   - 使用class关键字替代了ES5的原型链语法；
   - 方法直接定义在类中，不再需要prototype；
   - 构造方法使用了专门的constructor；
```
// ES6
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, ${this.name}`);
  }
}

// 对比 ES5
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log("Hello, " + this.name);
};
```

- 更好的继承机制：
   - 使用extends实现继承，比ES5的原型链更直观；
   - super关键字简化了父类构造函数和方法的调用；
 
```
class Student extends Person {
  constructor(name, grade) {
    super(name);  // 调用父类构造函数
    this.grade = grade;
  }
}
```

- 内置静态方法支持：
   - 使用static关键字定义静态方法，更符合传统OOP习惯；
 ```
class MathUtils {
  static add(a, b) {
    return a + b;
  }
}
```



