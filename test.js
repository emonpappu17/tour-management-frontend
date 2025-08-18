
let savedResolve, savedReject;

const myPromise = new Promise((resolve, reject) => {
    // reject("i am reject")
    resolve("i am resolved 1")
    resolve("i am resolved 2")
    resolve("i am resolved 3")
})
    .then((value) => console.log("resolved", value))
    .catch((err) => console.log("rejected", err));

// const myPromise = new Promise((resolve, reject) => {
//     savedResolve = resolve;
//     savedReject = reject
// })

// savedResolve("Ami Resolve hoye gesi-1")
// savedResolve("Ami Resolve hoye gesi-2")
// savedResolve("Ami Resolve hoye gesi-3")
// savedResolve("Ami Resolve hoye gesi-4")
// savedResolve("Ami Resolve hoye gesi-5")

// myPromise
//     .then((Value) => console.log('Promise Resolved:', Value))
//     .catch((err) => console.log('Promise Rejected:', err))

// savedReject("kono ekta error hoye gese");

// setTimeout(() => {
//     savedResolve("He he etai bastob")
// }, 3000);
