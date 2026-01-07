// ============================================
// JavaScript 版本
// ============================================

/**
 * 按 pageNo 分组比较两个数组并返回带有版本信息的结果数组
 * @param {Array} list1 - 第一个数组
 * @param {Array} list2 - 第二个数组
 * @param {Array<string>} keyList - 需要比较的属性键列表
 * @returns {Array} 包含版本信息的结果数组
 */
function compareArraysWithPageNo(list1, list2, keyList) {
  // 步骤1: 按 pageNo 分组
  const groupedList1 = groupByPageNo(list1);
  const groupedList2 = groupByPageNo(list2);

  // 步骤2: 获取所有 pageNo（合并并排序）
  const allPageNos = [...new Set([
    ...Object.keys(groupedList1).map(Number),
    ...Object.keys(groupedList2).map(Number)
  ])].sort((a, b) => a - b);

  const resultList = [];

  // 步骤3: 遍历每个 pageNo 进行比较
  allPageNos.forEach(pageNo => {
    const pageList1 = groupedList1[pageNo] || [];
    const pageList2 = groupedList2[pageNo] || [];

    // 取当前 pageNo 下较长的列表长度
    const maxLength = Math.max(pageList1.length, pageList2.length);

    // 步骤4: 比较当前 pageNo 下的每一项
    for (let i = 0; i < maxLength; i++) {
      const obj1 = pageList1[i];
      const obj2 = pageList2[i];

      // 创建结果对象
      let resultItem;

      if (obj1) {
        // 基于 list1 的数据
        resultItem = { ...obj1 };
      } else if (obj2) {
        // list1 中不存在，基于 list2 创建，但 keyList 属性设为空值
        resultItem = { pageNo: pageNo };
        keyList.forEach(key => {
          resultItem[key] = obj2[key] || '';
        });
        // 保留 list2 中的其他属性
        Object.keys(obj2).forEach(key => {
          if (!keyList.includes(key) && key !== 'pageNo') {
            resultItem[key] = obj2[key];
          }
        });
      } else {
        // 两个都不存在（理论上不会发生）
        resultItem = { pageNo: pageNo };
        keyList.forEach(key => {
          resultItem[key] = '';
        });
      }

      // 步骤5: 比较 keyList 中的属性，生成 versionInfo
      const versionInfo = {};

      keyList.forEach(key => {
        const value1 = obj1 ? obj1[key] : '';
        const value2 = obj2 ? obj2[key] : '';

        // 只有当值不同时才添加到 versionInfo
        if (value1 !== value2) {
          versionInfo[key] = [value1, value2];
        }
      });

      // 只有存在差异时才添加 versionInfo 属性
      if (Object.keys(versionInfo).length > 0) {
        resultItem.versionInfo = versionInfo;
      }

      resultList.push(resultItem);
    }
  });

  return resultList;
}

/**
 * 按 pageNo 分组数据
 * @param {Array} list - 原始数组
 * @returns {Object} 分组后的对象 {pageNo: [items]}
 */
function groupByPageNo(list) {
  const grouped = {};
  
  list.forEach(item => {
    const pageNo = item.pageNo || 1; // 默认 pageNo 为 1
    if (!grouped[pageNo]) {
      grouped[pageNo] = [];
    }
    grouped[pageNo].push(item);
  });

  return grouped;
}

// ============================================
// TypeScript 版本（注释形式）
// ============================================

/*
interface DataObject {
  pageNo: number;
  [key: string]: any;
}

interface VersionInfo {
  [key: string]: [any, any];
}

interface ResultItem extends DataObject {
  versionInfo?: VersionInfo;
}

function compareArraysWithPageNoTS(
  list1: DataObject[],
  list2: DataObject[],
  keyList: string[]
): ResultItem[] {
  // 实现逻辑与上面 JavaScript 版本相同
  // 只需添加类型注解即可
}

function groupByPageNoTS(list: DataObject[]): Record<number, DataObject[]> {
  const grouped: Record<number, DataObject[]> = {};
  
  list.forEach(item => {
    const pageNo = item.pageNo || 1;
    if (!grouped[pageNo]) {
      grouped[pageNo] = [];
    }
    grouped[pageNo].push(item);
  });

  return grouped;
}
*/

// ============================================
// 测试示例
// ============================================

const keyList = ['attr1', 'attr2', 'attr3'];

// 测试数据 1：正常情况，多个 pageNo
console.log('=== 测试 1：多个 pageNo，长度不同 ===');
const list1_test1 = [
  { attr1: 'v1', attr2: 'vx', attr3: 'data1', pageNo: 1, extra: 'e1' },
  { attr1: 'v2', attr2: 'vy', attr3: 'data2', pageNo: 1, extra: 'e2' },
  { attr1: 'v3', attr2: 'vz', attr3: 'data3', pageNo: 2, extra: 'e3' },
  { attr1: 'v4', attr2: 'va', attr3: 'data4', pageNo: 3, extra: 'e4' }
];

const list2_test1 = [
  { attr1: 'v1', attr2: 'vx-changed', attr3: 'data1', pageNo: 1, other: 'o1' },
  { attr1: 'v2-new', attr2: 'vy', attr3: 'data2', pageNo: 1, other: 'o2' },
  { attr1: 'v2-extra', attr2: 'vy-extra', attr3: 'data-extra', pageNo: 1, other: 'o3' },
  { attr1: 'v3-changed', attr2: 'vz', attr3: 'data3', pageNo: 2, other: 'o4' },
  { attr1: 'v5', attr2: 'vb', attr3: 'data5', pageNo: 4, other: 'o5' }
];

const result1 = compareArraysWithPageNo(list1_test1, list2_test1, keyList);
console.log(JSON.stringify(result1, null, 2));

// 测试数据 2：pageNo 不连续
console.log('\n=== 测试 2：pageNo 不连续 ===');
const list1_test2 = [
  { attr1: 'a1', attr2: 'a2', attr3: 'a3', pageNo: 1 },
  { attr1: 'b1', attr2: 'b2', attr3: 'b3', pageNo: 5 },
  { attr1: 'c1', attr2: 'c2', attr3: 'c3', pageNo: 10 }
];

const list2_test2 = [
  { attr1: 'a1-new', attr2: 'a2', attr3: 'a3', pageNo: 1 },
  { attr1: 'x1', attr2: 'x2', attr3: 'x3', pageNo: 3 },
  { attr1: 'b1', attr2: 'b2-new', attr3: 'b3', pageNo: 5 }
];

const result2 = compareArraysWithPageNo(list1_test2, list2_test2, keyList);
console.log(JSON.stringify(result2, null, 2));

// 测试数据 3：某个 pageNo 只存在于一个列表
console.log('\n=== 测试 3：list2 独有的 pageNo ===');
const list1_test3 = [
  { attr1: 'v1', attr2: 'vx', attr3: 'data1', pageNo: 1 }
];

const list2_test3 = [
  { attr1: 'v1', attr2: 'vx', attr3: 'data1', pageNo: 1 },
  { attr1: 'v2', attr2: 'vy', attr3: 'data2', pageNo: 2 },
  { attr1: 'v3', attr2: 'vz', attr3: 'data3', pageNo: 2 }
];

const result3 = compareArraysWithPageNo(list1_test3, list2_test3, keyList);
console.log(JSON.stringify(result3, null, 2));

// 输出说明
console.log('\n=== 功能说明 ===');
console.log('1. 先按 pageNo 对 list1 和 list2 进行分组');
console.log('2. 合并所有 pageNo，按升序处理');
console.log('3. 对于每个 pageNo，取两个列表中较长的长度');
console.log('4. 基于较长的列表生成结果，逐项比较 keyList 中的属性');
console.log('5. 只有差异的属性才会出现在 versionInfo 中');
console.log('6. 结果数组保持 pageNo 的排序顺序');
