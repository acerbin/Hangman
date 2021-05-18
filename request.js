// const getPuzzle = (callback) => {
//     const request = new XMLHttpRequest();
//
//     request.addEventListener('readystatechange',(e) => {
//       if(e.target.readyState === 4 && e.target.status === 200) {
//         const data = JSON.parse(e.target.responseText);
//         callback(undefined, data.puzzle);
//       } else if (e.target.readyState === 4)(
//         callback(e.target.status , undefined)
//       )
//     });
//
//
//     request.open('GET','http://puzzle.mead.io/puzzle');
//     request.send();
// }

const getPuzzle = (wordCount = 2) => new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange',(e) => {
    if(e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      resolve(data.puzzle)
    } else if (e.target.readyState === 4) {
      reject(e.target.status)
    }
  });


  request.open('GET',`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
  request.send();
})


const getPuzzleWithFetch = (wordCount = 2) => {
  return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then((response) => {
    if(response.status === 200){
      return response.json();
    } else {
      throw new Error('Something went wrong');
    }
  }).then((responseBody) => {
    return responseBody.puzzle;
  }).catch((err) => console.log(err));
}


const getPuzzleWithAsync = async (wordCount = 2) => {
  const response =  await fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
  if(response.status === 200){
    const data = await response.json();
    return data.puzzle;
  } else {
    throw new Error('Unable to fetch puzzle')
  }
}
