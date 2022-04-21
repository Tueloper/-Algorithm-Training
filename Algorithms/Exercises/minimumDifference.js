const absoluteDifference = 1;

const closetNumber = (arr) => {
    let closest = [];

    const leastDiffArr = [];
    for (let i = 1; i < arr.length; i++) {
        const currentDifference = Math.abs(arr[i] - arr[i - 1]);

        currentDifference !== null ? leastDiffArr.push(currentDifference) : null;        
    }

    leastDiff = Math.min(...leastDiffArr);

    for (let i = 0; i < arr.length; i++) {
        if (Math.abs(arr[i] - arr[i + 1]) === leastDiff) {
            closest.push([arr[i], arr[i + 1]]);
        }
    }
    return closest;
}

console.log(closetNumber([4, 4, 2, 1, 3]));