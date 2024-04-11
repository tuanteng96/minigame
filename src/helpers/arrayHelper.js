export const ArrayHelper = {
    getRandomItemByPercentage: (items, percentages) => {
        const total = percentages.reduce((sum, value) => sum + value, 0);
        const randomValue = Math.random() * total;

        let runningSum = 0;
        for (let i = 0; i < items.length; i++) {
            runningSum += percentages[i];
            if (randomValue <= runningSum) {
                return i;
            }
        }

        return items.length - 1;
    }
}