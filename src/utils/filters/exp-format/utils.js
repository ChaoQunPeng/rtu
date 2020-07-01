function getPhaseInfo(totalExp) {
  if (totalExp >= 0 && totalExp < 1000) {
    const expRange = [
      [0, 199],
      [200, 399],
      [400, 599],
      [600, 799],
      [800, 999]
    ];
    return this.getLevelInfo(totalExp, expRange, "新手", 199);
  } else if (totalExp >= 1000 && totalExp < 3000) {
    const expRange = [
      [1000, 1399],
      [1400, 1799],
      [1800, 2199],
      [2200, 2599],
      [2600, 2999]
    ];
    return this.getLevelInfo(totalExp, expRange, "高级新手", 399);
  } else if (totalExp >= 3000 && totalExp < 6000) {
    const expRange = [
      [3000, 3599],
      [3600, 4199],
      [4200, 4799],
      [4800, 5399],
      [5400, 5999]
    ];
    return this.getLevelInfo(totalExp, expRange, "胜任者", 599);
  } else if (totalExp >= 6000 && totalExp < 10000) {
    const expRange = [
      [6000, 6799],
      [6800, 7599],
      [7600, 8399],
      [8400, 9199],
      [9200, 9999]
    ];
    return this.getLevelInfo(totalExp, expRange, "精通者", 799);
  } else {
    return { name: "专家", level: "" };
  }
}

function getLevelInfo(totalExp, expRange, levelName, levelExp) {
  const data = {
    name: levelName,
    level: 0,
    romanNum: 0,
    levelBaseExp: levelExp,
    range: [],
    width: {} // 赋值给:style
  };
  for (let i = 0; i < expRange.length; i++) {
    if (totalExp >= expRange[i][0] && totalExp <= expRange[i][1]) {
      switch (i) {
        case 0:
          data.romanNum = "I";
          break;
        case 1:
          data.romanNum = "II";
          break;
        case 2:
          data.romanNum = "III";
          break;
        case 3:
          data.romanNum = "IV";
          break;
        case 4:
          data.romanNum = "V";
          break;
      }

      data.level = i + 1;
      data.currentExp = totalExp - expRange[i][0];
      data.range = expRange[i];
      data.width = getProgressLength(totalExp, data);
    }
  }

  return data;
}

function getProgressLength(totalExp, levelData) {
  // totalExp 可能为null,即0
  // [0,199]  (2-0) / 199
  // [6000, 6799] (6500-6000) / 799
  // let width = Number(totalExp) / Number(levelData.range[1]); // 这是总的经验条
  let width = (totalExp - levelData.range[0]) / levelData.levelBaseExp; // 这是每个等级的基础经验条
  return { width: width * 100 + "%" };
  // return width * 100 + "%";
}

const tools = {
  getPhaseInfo,
  getLevelInfo,
  getProgressLength
};

export {
  tools
}