const addLike = (btn) => {
    const projectId= btn.parentNode.parentNode.parentNode.querySelector("[name=projectId]").value
    fetch('/add-like/' + projectId, {
        method: 'POST'
    })
    .then(result => {
        return result.json() 
    })
    .then(data  => {
        console.log(data)
        
    })
    .catch(err => {
        console.log(err)
    })
}

const addRating = (input) => {
    console.log(input)
    const rating = input.value
    const projId = input.parentNode.parentNode.parentNode.querySelector('[name=projectId]').value
    fetch("/add-rating/" + projId + ':' + rating, {
        method: "POST",
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch()
}
